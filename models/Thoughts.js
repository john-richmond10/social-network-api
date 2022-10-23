const { model, Schema } = require('mongoose');
const { format_date, format_time } = require('../utils/helpers');
const Reactions =  require('./ReactionSchema');

// Create a schema for the Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            min: [1, 'Thought must be no less than 1 character long!'],
            max: [300, 'Though must be no longer thant 300 characters!'],
            unique: true,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: format_time,
            required: true,
        },
        username: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        reactions: [Reactions],
    },
    {
        toJSON: {
            virtuals: true,
    },
        id: false,
    }
);

// Create a virtual for the total count of reactions on retrieval
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

//initialize the Thought model using the thoughtSchema
const Thought = model('thought', thoughtSchema);

module.exports = Thought;