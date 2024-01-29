const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const port = 3010;

const db = new sqlite3.Database('invoice_management.db');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, businessName TEXT, gstNo TEXT, businessAddress TEXT, metamaskAddress TEXT, userId TEXT, password TEXT)");
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

function getUserByUsername(username) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE userId = ?';
    db.get(query, [username], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
} 
app.post('/login', async (req, res) => {
  try {
    const { userId, password } = req.body;

    const user = await getUserByUsername(userId);

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const userInfo = {
      metamaskAddress: user.metamaskAddress,
    };

    res.json(userInfo);
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Endpoint to handle user registration
app.post('/signup', async (req, res) => {
  try {
    const { businessName, gstNo, businessAddress, metamaskAddress, userId, password } = req.body;

    // Validate MetaMask address
    if (!isValidMetaMaskAddress(metamaskAddress)) {
      return res.status(400).json({ message: 'Invalid MetaMask address' });
    }

    // Check if the provided username is already registered
    const existingUser = await getUserByUsername(userId);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already registered' });
    }

    // Check if the provided password meets your criteria (e.g., length requirements)
    if (!isValidPassword(password)) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user data into the database
    const insertUser = db.prepare("INSERT INTO users (businessName, gstNo, businessAddress, metamaskAddress, userId, password) VALUES (?, ?, ?, ?, ?, ?)");
    insertUser.run(businessName, gstNo, businessAddress, metamaskAddress, userId, hashedPassword);
    insertUser.finalize();

    res.json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ... (Other routes or middleware can go here)


app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Handle errors
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
}); 

function isValidMetaMaskAddress(address) {
  const addressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
  return addressRegex.test(address);
}

function isValidPassword(password) {
  // Implement your password validation criteria (e.g., minimum length)
  return password.length >= 8;
}


