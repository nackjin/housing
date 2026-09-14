import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const isAdmin = user?.role === 'admin';

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (username, password) => {
        try {
            const response = await fetch('https://housing-fcu7.onrender.com/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const updateUser = async (userId, updateData) => {
        try {
            const response = await fetch(`https://housing-fcu7.onrender.com/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                },
                body: JSON.stringify(updateData)
            });

            if (response.ok) {
                const updatedUser = await response.json();
                // The PUT response doesn't carry a token, so keep the
                // existing session token from login.
                const mergedUser = { ...updatedUser, token: user?.token };
                setUser(mergedUser);
                localStorage.setItem('user', JSON.stringify(mergedUser));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Update user error:', error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, isAdmin, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};
