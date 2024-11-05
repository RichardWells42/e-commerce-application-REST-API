const express = require('express');
const { createUser, getUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

console.log('createUser:', createUser);
console.log('getUsers:', getUsers);
console.log('getUser:', getUser);
console.log('updateUser:', updateUser);
console.log('deleteUser:', deleteUser);

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;