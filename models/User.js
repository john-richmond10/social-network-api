const { model, Schema } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: false,
            unique: true,
            match: [/.+@.+\..+/],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectID,
                ref: 'thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectID,
                ref: 'user',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id:false,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;