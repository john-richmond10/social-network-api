const { Thought, User } = require('../models');
const { update } = require('../models/User');

module.exports = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .populate([
                'username',
                {
                    path: 'reactions',
                    populate: ['username'],
                }
            ])
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(400).json(err));
    },

    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
            .populate([
                'username',
                {
                    path: 'reactions',
                    populate: ['username'],
                }
            ])
            .then((thought) => res.json(thought))
            .catch((err) => res.status(400).json({message: 'No thought found with this id!'}));
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                {new: true}
            );
            !user
                ? res.status(404).json({message: 'No user found with this id!'})
                : res.json(thought);
        }
        catch {
            (err) => res.status(400).json(err);
        }
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) => {
            !thought
                ? res.status(404).json({message: 'No thought found with this id!'})
                : res.json(thought);
        })
        .catch((err) => res.status(400).json(err));
    },
    async deleteThought(req, res) {
        try {
            let user;
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
            if (thought) {
                user = await user.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                )
            } else {
                res.status(404).json({message: 'No thought found with this id!'});
            }
            if (user) {
                res.json({message: 'Thought deleted!'});
            } else {
                res.status(404).json({message: 'Thought sucesffuly delte, but no user found with this id!'});
            }
        }
        catch {
            (err) => res.status(400).json(err);
        }
    },
    // add reaction
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((thought) => {
            !thought
                ? res.status(404).json({message: 'No thought found with this id!'})
                : res.json(thought);
        })
        .catch((err) => res.status(400).json(err));
    }
};

