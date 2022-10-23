const { Schema, Types } = require('mongoose');
const { format_date, format_time } = require('../utils/helpers');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default:  () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        min: [1, 'Reaction must be no less than 1 character long!'],
        max: [300, 'Reaction must be no longer than 300 characters!'],
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: format_time,
        required: true,
    }
});

module.exports = ReactionSchema;