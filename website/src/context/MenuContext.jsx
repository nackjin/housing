import React, { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
    const initialMenuItems = [
        {
            id: 1,
            title: '운동본부',
            path: '/about',
            subItems: [
                { id: 11, name: '소개', path: '/about/intro' },
                { id: 12, name: '연혁', path: '/about/history' },
                { id: 14, name: '인사말', path: '/about/greetings' },
                { id: 15, name: '협약기관', path: '/about/partners' },
            ]
        },
        {
            id: 2,
            title: '주거복지우수사례',
            path: '/best-practices',
        },
        {
            id: 3,
            title: '주요사업',
            path: '/projects',
            subItems: [
                { id: 31, name: '주거복지문화대상', path: '/projects/awards' },
                { id: 32, name: '장애인인식개선', path: '/projects/disability-awareness' },
            ]
        },
        {
            id: 4,
            title: '소식',
            path: '/news',
            subItems: [
                { id: 41, name: '공지/뉴스', path: '/news/notice' },
                { id: 42, name: '파트너 소식', path: '/news/support' },
                { id: 43, name: '보도자료', path: '/news/press' },
                { id: 44, name: '영상', path: '/news/video' },
                { id: 45, name: '갤러리', path: '/news/gallery' },
            ]
        },

    ];

    const [menuItems, setMenuItems] = useState(initialMenuItems);

    const updateMenu = (newMenu) => {
        setMenuItems(newMenu);
    };

    return (
        <MenuContext.Provider value={{ menuItems, updateMenu }}>
            {children}
        </MenuContext.Provider>
    );
};
