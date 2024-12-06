const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');

const app = express();

connectDB();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

app.use('/api/signup', signupRoute);
app.use('/api/login', loginRoute);
app.use('/api/finance', require('./routes/finance'));

app.get('/api/user', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user.id;
    User.findById(userId)
      .select('-password')
      .then(user => {
        if (user) {
          res.json({ user });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      })
      .catch(err => {
        console.error('Error fetching user data:', err);
        res.status(500).json({ message: 'Server error' });
      });
  } catch (err) {
    console.error('Error verifying token:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
