const { User, Thought } = require('../models');

const userController = {
    // get all
    async getUsers(req, res) {
        try {
          const users = await User.find()
          .select('-__v')

          res.json(users);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      // Get single user by id
      async getSingleUser(req, res) {
        try {
          const user = await User.findOne({ _id: req.params.id })
          .select('-__v')
          .populate('friends')
          .populate('thoughts');
    
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
          }
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
    },

// create user
        async createUser(req, res) {
            try {
            const newUser = await User.create(req.body);
            res.json(newUser);
            } catch (err) {
            console.log(err);
            return res.status(500).json(err);
            }
        },
// update user
async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'updating account failed' });
      }

      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

// delete user
async deleteUser(req, res) {
    try {
      const deletedUser = await User.findOneAndDelete({ _id: req.params.id });

      if (!deletedUser) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
  } catch (err) {
    res.status(500).json(err)
  }
},

// add friend
async addFriend(req, res) {
    try {
        const newFriend = await User.findOneAndUpdate({ _id: req.params.id}, { $pull: { friends: req.params.id } }, { new: true });

        if (!newFriend) {
            return res.status(404).json({ message: 'No user with this ID!' })
        }

        res.json(newFriend);
    } catch (err) {
        res.status(500).json(err)
    }
},
// remove friend

async removeFriend(req, res) {
    try {
        const deletedFriend = await User.findOneAndUpdate({ _id: req.params.id}, { $pull: { friends: req.params.id } }, { new: true });

        if (!deletedFriend) {
            return res.status(404).json({ message: 'No user with this ID!' })
        }

        res.json(deletedFriend);
    } catch (err) {
        res.status(500).json(err)
    }
    }
}


module.exports = userController;