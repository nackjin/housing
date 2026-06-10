import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const PostContext = createContext();

export const usePosts = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [apiError, setApiError] = useState(false);

    // Initial fetch from Firestore
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const q = query(collection(db, 'posts'), orderBy('date', 'desc'));
                const querySnapshot = await getDocs(q);
                const postsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
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
                const storageRef = ref(storage, `posts/${Date.now()}_${file.name}`);
                await uploadBytes(storageRef, file);
                const url = await getDownloadURL(storageRef);
                imageUrls.push(url);
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
        finalData.views = finalData.category === 'video' && !finalData.views ? getRandomViews() : (parseInt(finalData.views) || 0);
        
        try {
            const docRef = await addDoc(collection(db, 'posts'), finalData);
            const newPost = { id: docRef.id, ...finalData };
            setPosts(prev => [newPost, ...prev]);
        } catch (error) {
            console.error("Error adding document: ", error);
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
                const storageRef = ref(storage, `posts/${Date.now()}_${file.name}`);
                await uploadBytes(storageRef, file);
                const url = await getDownloadURL(storageRef);
                imageUrls.push(url);
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
        }
    };

    const deletePost = async (id) => {
        try {
            await deleteDoc(doc(db, 'posts', id.toString()));
            setPosts(prev => prev.filter(p => p.id.toString() !== id.toString()));
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    const resetData = () => {
        // no-op for firebase
    };

    return (
        <PostContext.Provider value={{ posts, addPost, deletePost, editPost, resetData, apiError }}>
            {children}
        </PostContext.Provider>
    );
};
