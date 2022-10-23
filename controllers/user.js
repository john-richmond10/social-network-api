const { Thought, User } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
            .populate(['thoughts', 'friends'])
            .then((users) => res.json(users))
            .catch((err) => res.status(400).json(err));
    },

    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId})
        .populate(['thoughts', 'friends'])
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json({message: 'No user found with this id!'}));
    },

    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(400).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new: tru}
        )
        .then((user) => {
            !user
            ? res.status(404).json({message: 'No user found with this id!'})
            : res.json(user)
        })
        .catch((err) => res.status(400).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndRemove({_id: req.params.userId})
        .then((user) => 
            !user
            ? res.status(404).json({message: 'No user found with this id!'})
            : res.json(user)
        )
        .catch((err) => res.status(400).json(err));
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId}},
            {runValidators: true, new: true}
        )
        .then((user) =>
            !user
            ? res.status(404).json({message: 'No user found with this id!'})
            : res.json(user)
        )
        .catch((err) => res.status(400).json(err));
    },

    deleteFriend(req, res) {
        User.findOneAndUpdate (
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {runValidators: true, new: true}
        )
        .then((user) =>
            !user
            ? res.status(404).json({message: 'No user found with this id!'})
            : res.json(user)
        )
        .catch((err) => res.status(400).json(err));
    }
};