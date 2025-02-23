const { User } = require('../models');

exports.createUser = async (req, res) => {
  console.log('Request Body:', req.body); // Log the request body
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error('Validation error details:', error); // Log the full error object for debugging
    if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.map(err => err.message);
      res.status(400).json({ error: 'Validation error', details: validationErrors });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// const { User } = require('../models');

// exports.createUser = async (req, res) => {
//   console.log('Request Body:', req.body); // Log the request body
//   try {
//     const user = await User.create(req.body);
//     res.status(201).json(user);
//   } catch (error) {
//     console.error('Validation error details:', error); // Log the full error object for debugging
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.getUsers = async (req, res) => {
//   try {
//     const users = await User.findAll();
//     res.json(users);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.getUser = async (req, res) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.updateUser = async (req, res) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     await user.update(req.body);
//     res.json(user);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.deleteUser = async (req, res) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     await user.destroy();
//     res.status(204).send();
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };












// const { User } = require('../models');

// exports.createUser = async (req, res) => {
//   try {
//     const user = await User.create(req.body);
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.getUsers = async (req, res) => {
//   try {
//     const users = await User.findAll();
//     res.json(users);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.getUser = async (req, res) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.updateUser = async (req, res) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     await user.update(req.body);
//     res.json(user);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.deleteUser = async (req, res) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     await user.destroy();
//     res.status(204).send();
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };