const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createNewThought,
    editThought,
    deleteThought
} = require('../../controllers/thoughtController');

// endpoint /api/thoughts

// get all thoughts and post to create a new thought
router.route('/').get(getThoughts).post(createNewThought);

// get a single thought by id 
// put to update a thought by id
// delete to remove a thought by id
router.route(':thoughtId').get(getSingleThought).put(editThought).delete(deleteThought)

// endpoint api/thoughts/:thoughtId/reactions

// post to create a reaction stored in a single thought's reactions array

// delete to pull and remove a reaction by the reactionId value
module.exports = router;