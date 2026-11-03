import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, doc, query, orderBy, increment } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const PostContext = createContext();

// Turn Firebase error codes into a short Korean reason for the admin.
const describeFirebaseError = (error) => {
    const code = error?.code || '';
    const reasons = {
        'storage/unauthorized': '파일 업로드 권한이 없습니다',
        'storage/quota-exceeded': '저장 공간 한도를 초과했습니다',
        'storage/retry-limit-exceeded': '네트워크가 불안정해 업로드가 중단되었습니다',
        'storage/canceled': '업로드가 취소되었습니다',
        'permission-denied': '저장 권한이 없습니다',
        'unavailable': '서버에 연결할 수 없습니다. 네트워크를 확인해주세요',
    };
    return reasons[code] || code || error?.message || '알 수 없는 오류';
};

export const usePosts = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [apiError, setApiError] = useState(false);

    // Initial fetch from Firestore
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Fetch all posts without orderBy to avoid index issues with missing createdAt fields
                const querySnapshot = await getDocs(collection(db, 'posts'));
                const postsData = querySnapshot.docs
                    .map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    // Firestore write rules don't allow real deletes (to block mass
                    // vandalism), so "deleting" a post just flags it and we hide it here.
                    .filter(p => !p.deleted);

                // Sort by date descending, then by createdAt descending
                postsData.sort((a, b) => {
                    if (a.date !== b.date) {
                        return new Date(b.date) - new Date(a.date);
                    }
                    const timeA = a.createdAt || 0;
                    const timeB = b.createdAt || 0;
                    return timeB - timeA;
                });
                
                setPosts(postsData);
                setApiError(false);
            } catch (error) {
                console.error("Error fetching posts from Firebase: ", error);
                setApiError(true);
            }
        };
        fetchPosts();
    }, []);

    const getRandomViews = () => Math.floor(Math.random() * 101) + 200;

    // addPost/editPost throw on failure (upload or Firestore write) so the
    // caller can tell the admin instead of falsely reporting success.
    const uploadPostFile = async (file) => {
        try {
            const storageRef = ref(storage, `posts/${Date.now()}_${file.name}`);
            await uploadBytes(storageRef, file);
            return await getDownloadURL(storageRef);
        } catch (error) {
            console.error("Error uploading file: ", file.name, error);
            throw new Error(`파일 "${file.name}" 업로드에 실패했습니다. (${describeFirebaseError(error)})`);
        }
    };

    const addPost = async (postData) => {
        const isFormData = postData instanceof FormData;
        
        let finalData = {};
        
        if (isFormData) {
            // Convert FormData back to an object for Firestore
            for (let [key, value] of postData.entries()) {
                if (key !== 'images' && key !== 'existingImages') {
                    finalData[key] = value;
                }
            }
            
            // Handle images upload
            const imageFiles = postData.getAll('images');
            const imageUrls = [];
            
            for (const file of imageFiles) {
                imageUrls.push(await uploadPostFile(file));
            }
            
            const existingImagesStr = postData.get('existingImages');
            if (existingImagesStr) {
                 const existingImages = JSON.parse(existingImagesStr);
                 finalData.images = [...existingImages, ...imageUrls];
            } else {
                 finalData.images = imageUrls;
            }
            
            finalData.image = finalData.images.length > 0 ? finalData.images[0] : '';
        } else {
            finalData = { ...postData };
        }

        // Default fields
        finalData.date = new Date().toISOString().split('T')[0];
        finalData.createdAt = Date.now();
        finalData.views = finalData.category === 'video' && !finalData.views ? getRandomViews() : (parseInt(finalData.views) || 0);
        
        try {
            const docRef = await addDoc(collection(db, 'posts'), finalData);
            const newPost = { id: docRef.id, ...finalData };
            setPosts(prev => [newPost, ...prev]);
        } catch (error) {
            console.error("Error adding document: ", error);
            throw new Error(`게시물 저장에 실패했습니다. (${describeFirebaseError(error)})`);
        }
    };

    const editPost = async (id, updatedPost) => {
        const isFormData = updatedPost instanceof FormData;
        let finalData = {};
        
        if (isFormData) {
            for (let [key, value] of updatedPost.entries()) {
                if (key !== 'images' && key !== 'existingImages') {
                    finalData[key] = value;
                }
            }
            
            const imageFiles = updatedPost.getAll('images');
            const imageUrls = [];
            
            for (const file of imageFiles) {
                imageUrls.push(await uploadPostFile(file));
            }
            
            const existingImagesStr = updatedPost.get('existingImages');
            if (existingImagesStr) {
                 const parsed = JSON.parse(existingImagesStr);
                 finalData.images = [...parsed, ...imageUrls];
            } else {
                 finalData.images = imageUrls;
            }
            
            finalData.image = finalData.images.length > 0 ? finalData.images[0] : '';
        } else {
            finalData = { ...updatedPost };
        }
        
        // Ensure numeric views
        if (finalData.views) {
            finalData.views = parseInt(finalData.views);
        }

        try {
            const docRef = doc(db, 'posts', id.toString());
            await updateDoc(docRef, finalData);
            setPosts(prev => prev.map(p => p.id.toString() === id.toString() ? { ...p, ...finalData } : p));
        } catch (error) {
            console.error("Error updating document: ", error);
            throw new Error(`게시물 수정 저장에 실패했습니다. (${describeFirebaseError(error)})`);
        }
    };

    const incrementView = async (id) => {
        try {
            const docRef = doc(db, 'posts', id.toString());
            await updateDoc(docRef, { views: increment(1) });
            setPosts(prev => prev.map(p => p.id.toString() === id.toString() ? { ...p, views: (p.views || 0) + 1 } : p));
        } catch (error) {
            console.error("Error incrementing views: ", error);
        }
    };

    const deletePost = async (id) => {
        try {
            // Firestore write rules block real document deletes (to stop mass
            // vandalism from an open ruleset), so mark the post deleted instead;
            // fetchPosts filters these out.
            await updateDoc(doc(db, 'posts', id.toString()), { deleted: true });
            setPosts(prev => prev.filter(p => p.id.toString() !== id.toString()));
            return true;
        } catch (error) {
            console.error("Error deleting document: ", error);
            return false;
        }
    };

    const resetData = () => {
        // no-op for firebase
    };

    return (
        <PostContext.Provider value={{ posts, addPost, deletePost, editPost, incrementView, resetData, apiError }}>
            {children}
        </PostContext.Provider>
    );
};
