const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Set up static files for uploads
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR);
}
app.use('/uploads', express.static(UPLOADS_DIR));

// Setup multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOADS_DIR);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to original name
    }
});
const upload = multer({ storage: storage });

// Data file path
const DATA_FILE = path.join(__dirname, 'data', 'posts.json');
const USERS_FILE = path.join(__dirname, 'data', 'users.json');
const DONATIONS_FILE = path.join(__dirname, 'data', 'donations.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'));
}

// Ensure posts.json exists with default data if empty
const defaultData = [
    {
        id: 1,
        category: 'notice',
        title: '2026년도 주거복지문화대상 시상식 개최 안내',
        date: '2026-01-05',
        author: '관리자',
        views: 128,
        content: '2026년도 주거복지문화대상 시상식이 오는 2월 15일 개최됩니다. 많은 관심 부탁드립니다.',
    },
    {
        id: 11,
        category: 'notice',
        title: '홈페이지 서버 점검 안내 (1/30)',
        date: '2026-01-20',
        author: '관리자',
        views: 45,
        content: '안정적인 서비스 제공을 위해 서버 점검이 진행될 예정입니다.',
    },
    {
        id: 2,
        category: 'press',
        title: '주거복지문화운동본부, 새로운 비전 선포',
        date: '2025-12-28',
        author: '홍보팀',
        views: 342,
        content: '주거복지문화운동본부가 창립 10주년을 맞아 새로운 비전을 선포했습니다.',
    },
    {
        id: 31,
        category: 'donation',
        title: '1월 후원자 명단입니다.',
        date: '2026-01-31',
        author: '후원팀',
        views: 89,
        content: '1월 한 달간 따뜻한 마음을 나누어주신 후원자님들께 감사드립니다.',
    },
    {
        id: 3,
        category: 'gallery',
        title: '제9회 시상식 현장 스케치',
        date: '2025-12-26',
        author: '관리자',
        views: 550,
        image: 'https://images.unsplash.com/photo-1544161513-0179fe746fd5?q=80&w=2070&auto=format&fit=crop',
        content: '시상식의 생생한 현장을 사진으로 담았습니다.',
    },
    {
        id: 51,
        category: 'video',
        title: '주거복지문화운동본부 홍보영상',
        date: '2026-01-01',
        author: '미디어팀',
        views: 1200,
        videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
        content: '우리가 꿈꾸는 세상, 함께 만들어갑니다.',
    }
];

if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2));
}

if (!fs.existsSync(USERS_FILE)) {
    // Default admin user
    const defaultUsers = [
        {
            id: 1,
            username: 'admin',
            password: 'admin', // In a real app, this should be hashed
            name: '최고관리자',
            email: 'admin@housingwelfare.org',
            phone: '010-0000-0000',
            address: '서울 관악구',
            affiliation: '주거복지문화운동본부',
            role: 'admin',
            createdAt: new Date().toISOString()
        }
    ];
    fs.writeFileSync(USERS_FILE, JSON.stringify(defaultUsers, null, 2));
}

if (!fs.existsSync(DONATIONS_FILE)) {
    fs.writeFileSync(DONATIONS_FILE, JSON.stringify([], null, 2));
}

// Helper to read data
const readData = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading data file:', error);
        return [];
    }
};

const readUsers = () => {
    try {
        const data = fs.readFileSync(USERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Helper to write data
const writeData = (data) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing data file:', error);
        return false;
    }
};

const writeUsers = (data) => {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        return false;
    }
};

const readDonations = () => {
    try {
        const data = fs.readFileSync(DONATIONS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const writeDonations = (data) => {
    try {
        fs.writeFileSync(DONATIONS_FILE, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        return false;
    }
};

// Routes
// 1. Get all posts
app.get('/api/posts', (req, res) => {
    const posts = readData();
    res.json(posts);
});

// 2. Add a new post
app.post('/api/posts', upload.array('images', 10), (req, res) => {
    const newPost = req.body;

    // Validate
    if (!newPost.title || !newPost.content || !newPost.category) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const posts = readData();

    // Determine new ID (max existing ID + 1)
    const nextId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;

    // Setup images if uploaded
    let imageUrls = [];
    if (newPost.images && Array.isArray(newPost.images)) {
        imageUrls = newPost.images; // If manual URLs were somehow sent
    } else if (newPost.image) {
        imageUrls = [newPost.image]; // Fallback if single string was sent
    }

    if (req.files && req.files.length > 0) {
        imageUrls = req.files.map(file => `/uploads/${file.filename}`);
    }

    // Assign ID and default values if not provided
    const postToAdd = {
        ...newPost,
        id: nextId,
        date: newPost.date || new Date().toISOString().split('T')[0],
        views: parseInt(newPost.views) || 0,
        images: imageUrls,
        image: imageUrls.length > 0 ? imageUrls[0] : '' // Retain for backward compatibility/thumbnail
    };

    // Add to beginning of array
    posts.unshift(postToAdd);

    if (writeData(posts)) {
        res.status(201).json(postToAdd);
    } else {
        res.status(500).json({ error: 'Failed to save post' });
    }
});

// 3. Update an existing post
app.put('/api/posts/:id', upload.array('images', 10), (req, res) => {
    const postId = Number(req.params.id);
    const updatedData = req.body;
    const posts = readData();

    const index = posts.findIndex(p => p.id === postId);

    if (index === -1) {
        return res.status(404).json({ error: 'Post not found' });
    }

    let imageUrls = posts[index].images || (posts[index].image ? [posts[index].image] : []);

    if (updatedData.existingImages !== undefined) {
        try {
            const parsed = JSON.parse(updatedData.existingImages);
            imageUrls = Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            imageUrls = [];
        }
    }

    if (req.files && req.files.length > 0) {
        const newUrls = req.files.map(file => `/uploads/${file.filename}`);
        if (updatedData.existingImages !== undefined) {
            imageUrls = [...imageUrls, ...newUrls];
        } else {
            imageUrls = newUrls;
        }
    }

    // Merge updated data (ensuring ID stays the same and numeric)
    posts[index] = {
        ...posts[index],
        ...updatedData,
        id: postId,
        views: parseInt(updatedData.views || posts[index].views),
        images: imageUrls,
        image: imageUrls.length > 0 ? imageUrls[0] : ''
    };

    if (writeData(posts)) {
        res.json(posts[index]);
    } else {
        res.status(500).json({ error: 'Failed to update post' });
    }
});

// 4. Delete a post
app.delete('/api/posts/:id', (req, res) => {
    const postId = Number(req.params.id);
    let posts = readData();

    const initialLength = posts.length;
    posts = posts.filter(p => p.id !== postId);

    if (posts.length === initialLength) {
        return res.status(404).json({ error: 'Post not found' });
    }

    if (writeData(posts)) {
        res.json({ success: true, message: 'Post deleted successfully' });
    } else {
        res.status(500).json({ error: 'Failed to delete post' });
    }
});

// 5. Users API
app.get('/api/users', (req, res) => {
    // Only return non-password fields for security in a simple implementation
    const users = readUsers().map(u => {
        const { password, ...safeUser } = u;
        return safeUser;
    });
    res.json(users);
});

app.post('/api/users/register', (req, res) => {
    const newUser = req.body;

    if (!newUser.username || !newUser.password || !newUser.name) {
        return res.status(400).json({ error: 'Missing required user fields' });
    }

    const users = readUsers();

    // Check for duplicate username
    if (users.find(u => u.username === newUser.username)) {
        return res.status(409).json({ error: 'Username already exists' });
    }

    const nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

    const userToAdd = {
        ...newUser,
        id: nextId,
        role: 'user', // Default role for new signups
        createdAt: new Date().toISOString()
    };

    users.push(userToAdd);

    if (writeUsers(users)) {
        const { password, ...safeUser } = userToAdd;
        res.status(201).json(safeUser);
    } else {
        res.status(500).json({ error: 'Failed to save user' });
    }
});

app.post('/api/users/login', (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();

    // Extremely basic mock auth (no hashing for MVP)
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const { password, ...safeUser } = user;
        res.json(safeUser);
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.put('/api/users/:id', (req, res) => {
    const userId = Number(req.params.id);
    const updatedData = req.body;
    const users = readUsers();

    const index = users.findIndex(u => u.id === userId);

    if (index === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Don't allow changing username or role through this endpoint for simplicity/security
    // Also protect password if not explicitly changing it
    const { username, role, password, ...allowedUpdates } = updatedData;

    users[index] = {
        ...users[index],
        ...allowedUpdates
    };

    // If password is included in update, update it
    if (password) {
        users[index].password = password;
    }

    if (writeUsers(users)) {
        const { password: userPassword, ...safeUser } = users[index];
        res.json(safeUser);
    } else {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

// 6. Donations API
app.get('/api/donations', (req, res) => {
    const donations = readDonations();
    res.json(donations);
});

app.post('/api/donations', (req, res) => {
    const newDonation = req.body;

    if (!newDonation.userId || !newDonation.amount || !newDonation.type) {
        return res.status(400).json({ error: 'Missing required donation fields' });
    }

    const donations = readDonations();
    const nextId = donations.length > 0 ? Math.max(...donations.map(d => d.id)) + 1 : 1;

    const donationToAdd = {
        ...newDonation,
        id: nextId,
        date: new Date().toISOString().split('T')[0],
        status: '결제대기' // Default status
    };

    donations.unshift(donationToAdd);

    if (writeDonations(donations)) {
        res.status(201).json(donationToAdd);
    } else {
        res.status(500).json({ error: 'Failed to save donation' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`Local API Server parsing JSON file is running`);
    console.log(`Access API at: http://localhost:${PORT}/api/posts`);
    console.log(`Data stored at: ${DATA_FILE} and ${USERS_FILE}`);
    console.log(`===============================================`);
});
