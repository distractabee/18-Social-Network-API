const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// endpoint /api/users
// get all users and post a new user
router.route('/').get(getUsers).post(createUser);

// get a single user by id, update a user by id or delete to remove a user by id
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

// add or remove friends

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
