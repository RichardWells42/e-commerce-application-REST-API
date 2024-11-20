const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { Op } = require('sequelize');

exports.register = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }]
      }
    });
    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await User.create({ username, password: hashedPassword, email });
    res.status(201).json(user);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user.id }, 'secretKey');
  res.json({ token });
};

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { User, sequelize } = require('../models');
// const { Op } = require('sequelize');

// exports.register = async (req, res) => {
//   const { username, password, email } = req.body;
//   try {
//     // Check if the username or email already exists
//     const existingUser = await User.findOne({
//       where: {
//         [Op.or]: [{ username }, { email }]
//       }
//     });
//     if (existingUser) {
//       if (existingUser.username === username) {
//         return res.status(400).json({ message: 'Username already exists' });
//       }
//       if (existingUser.email === email) {
//         return res.status(400).json({ message: 'Email already exists' });
//       }
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create the new user
//     const user = await User.create({ username, password: hashedPassword, email });
//     res.status(201).json(user);
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.login = async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ where: { username } });
//   if (!user || !await bcrypt.compare(password, user.password)) {
//     return res.status(401).json({ message: 'Invalid credentials' });
//   }
//   const token = jwt.sign({ userId: user.id }, 'secretKey');
//   res.json({ token });
// };

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { User } = require('../models');


// exports.register = async (req, res) => {
//   const { username, password, email } = req.body;
//   try {
//     // Check if the username or email already exists
//     const existingUser = await User.findOne({
//       where: {
//         [sequelize.Op.or]: [{ username }, { email }]
//       }
//     });
//     if (existingUser) {
//       if (existingUser.username === username) {
//         return res.status(400).json({ message: 'Username already exists' });
//       }
//       if (existingUser.email === email) {
//         return res.status(400).json({ message: 'Email already exists' });
//       }
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create the new user
//     const user = await User.create({ username, password: hashedPassword, email });
//     res.status(201).json(user);
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.login = async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ where: { username } });
//   if (!user || !await bcrypt.compare(password, user.password)) {
//     return res.status(401).json({ message: 'Invalid credentials' });
//   }
//   const token = jwt.sign({ userId: user.id }, 'secretKey');
//   res.json({ token });
// };

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { User } = require('../models');

// exports.register = async (req, res) => {
//   const { username, password, email } = req.body;
//   try {
//     // Check if the username or email already exists
//     const existingUser = await User.findOne({ where: { username } });
//     const existingEmail = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Username already exists' });
//     }
//     if (existingEmail) {
//       return res.status(400).json({ message: 'Email already exists' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create the new user
//     const user = await User.create({ username, password: hashedPassword, email });
//     res.status(201).json(user);
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.login = async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ where: { username } });
//   if (!user || !await bcrypt.compare(password, user.password)) {
//     return res.status(401).json({ message: 'Invalid credentials' });
//   }
//   const token = jwt.sign({ userId: user.id }, 'secretKey');
//   res.json({ token });
// };

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { User } = require('../models');

// exports.register = async (req, res) => {
//   const { username, password, email } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   try {
//     const user = await User.create({ username, password: hashedPassword, email });
//     res.status(201).json(user);
//   } catch (error) {
//     console.error('Validation error details:', error); // Log the full error object for debugging
//     res.status(400).json({ error: error });
//   }
// };

// exports.login = async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ where: { username } });
//   if (!user || !await bcrypt.compare(password, user.password)) {
//     return res.status(401).json({ message: 'Invalid credentials' });
//   }
//   const token = jwt.sign({ userId: user.id }, 'secretKey');
//   res.json({ token });
// };