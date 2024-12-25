// Import required modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Create an instance of Express
const app = express();

// Middleware to serve static files
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/js', express.static(path.join(__dirname, 'js')));

// Middleware to parse URL-encoded data and JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// In-memory storage for user data (replace with a database in production)
const users = [];

// Route to serve the login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/Login.html'));
});

// Route to handle login validation
app.post('/validate', (req, res) => {
    const { email, password } = req.body;

    // Basic validation logic
    if (!email || !password) {
        return res.status(400).send('Email and Password are required!');
    }

   // Check if user exists in the in-memory storage
   const user = users.find(u => u.email === email && u.password === password);
   if (user) {
       // Redirect to the home page on successful login
       console.log('Login successful for:', email); // Debugging line
       return res.redirect('/home');
   } else {
       console.log('Invalid credentials for:', email); // Debugging line
       return res.status(401).send('Invalid credentials!');
   }
});

// Route to handle user registration (sign-in)
app.post('/register', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and Password are required to register!');
    }

    // Add the user to the in-memory storage
    users.push({ email, password });
    res.send('Registration successful!');
});

// Route to serve the home page
app.get('/home', (req, res) => {
    console.log('Home page requested'); // Debugging line
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
