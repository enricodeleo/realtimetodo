/**
 * Todo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    value: {
      'type': 'text'
    }
  },
  afterCreate: function(entry, cb) {
    sails.log.info(entry);
    sails.sockets.broadcast('todo', 'new_entry', entry);
    cb();
  },
  afterDestroy: function(entry, cb) {
    sails.log.info(entry);
    sails.sockets.broadcast('todo', 'remove_entry', entry);
    cb();
  }
};

