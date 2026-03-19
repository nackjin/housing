import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { MenuProvider } from './context/MenuContext'
import { PostProvider } from './context/PostContext'
import { AuthProvider } from './context/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ErrorBoundary>
            <MenuProvider>
                <AuthProvider>
                    <PostProvider>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </PostProvider>
                </AuthProvider>
            </MenuProvider>
        </ErrorBoundary>
    </React.StrictMode>,
)
