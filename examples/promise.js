'use strict';

/**
 * Users endpoint controller
 */
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var User = require('./user.model.js');

// public
module.exports = {
  updateUser,
};

/// definitions

/**
 * Update user
 * PUT '/users/:userId'
 */
function updateUser(req, res, next) {
  User
    .patchUpdate(
      { _id: ObjectId(req.params.userId) },
      req.body,
      ['contact.street'],
      ''
    )
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      next(err);
    });
}
