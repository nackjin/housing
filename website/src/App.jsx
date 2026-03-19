import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import MyPage from './pages/MyPage'
import NewsPage from './pages/NewsPage'
import AdminPost from './pages/AdminPost'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import SocialContributionPage from './pages/SocialContributionPage'
import BestPractices from './pages/BestPractices'
import ProjectsPage from './pages/ProjectsPage'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="about/*" element={<AboutPage />} />
                <Route path="best-practices" element={<BestPractices />} />
                <Route path="projects/*" element={<ProjectsPage />} />
                <Route path="social-partners" element={<SocialContributionPage />} />

                {/* News Routes */}
                <Route path="news" element={<NewsPage />} />
                <Route path="news/:category" element={<NewsPage />} />
                <Route path="news/:category/:id" element={<NewsPage />} />

                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route path="mypage" element={<MyPage />} />

                {/* Admin Routes */}
                <Route path="admin/write" element={<AdminPost />} />
                <Route path="admin/*" element={<AboutPage />} />
            </Route>
        </Routes>
    )
}

export default App
