const { Thought, User } = require('../models');

const thoughtController = {
    getThoughts(req,res) {
        Thought.find({})
        .select('-_v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        });
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.ThoughtId })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'Head Empty, No Thoughts! '})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        });
    },

    createNewThought(req, res) {
        Thought.create(req.body)
        .then((Thought) => res.json(Thought))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err)
        });
    },

    editThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.ThoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No Thoughts!!!'})
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(400).json(err))
    },

    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.ThoughtId })
        .then((deletedThought) => {
            if (!deletedThought) {
                
            }
        })
    }
}

module.exports = thoughtController;