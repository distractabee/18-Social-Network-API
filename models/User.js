const { Schema, model } = require('mongoose');

// user Schema based on recommended set up in challenge README
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    thoughts: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// a virtual to retrieve the length of a user's friendslist
userSchema.virtual('friendCount')
.get(function() {
    return this.friends.length;
})

const User = model('User', userSchema)

module.exports = User;