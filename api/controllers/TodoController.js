/**
 * TodoController
 *
 * @description :: Server-side logic for managing Todoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {
   getTodos: function(req, res) {
    TodoService.getTodos(function(todos) {
      res.json(todos);
    });
  },
  addTodo: function(req, res) {
    var todoVal = (req.body.value) ? req.body.value : undefined
    TodoService.addTodo(todoVal, function(success) {
      res.json(success);
    });
  },
  removeTodo: function(req, res) {
    var todoVal = (req.body.value) ? req.body.value : undefined
    TodoService.removeTodo(todoVal, function(success) {
      res.json(success);
    });
  },
  subscribe: function(req, res) {
    if( ! req.isSocket) {
      return res.badRequest();
    }
    sails.sockets.join(req.socket, 'todo', res.ok);
  }
};

