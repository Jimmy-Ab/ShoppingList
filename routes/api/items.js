// const express = require('express'); const router = express.Router(); item
// model
var fs = require('fs');
const Item = require('../../models/Item');

module.exports = function (app) {

  app.get('/api/items', (req, res) => {

    if (!req.user) {
      res.status(403);
      res.end();
      return
    }
    Item
      .find({owner: req.user._id})
      .sort({name: 1})
      .then(items => res.json(items));

  });

  app.get('/api/items/list', (req, res) => {

    Item
      .find()
      .sort({name: 1})
      .then(items => res.json(items));

  });

  app.get('/api/items/details/:id', (req, res) => {
    Item
      .findById(req.params.id)
      .then(item => res.json(item))
  });

  app.post('/api/items/my-list', (req, res) => {
    
    var pic;
    console.log(req.body.image);
    // pic = fs.readFileSync(req.body.image);

    const newItem = new Item({
      name: req.body.name, 
      description: req.body.description, 
      price: req.body.price, 
      // image: pic,
      owner: req.user._id});

    newItem
      .save()
      .then(items => res.json(items));
  });

  app.delete('/api/items/:id', (req, res) => {
    Item
      .findById(req.params.id)
      .then(item => item.remove().then(() => res.json({success: true})))
      .catch(err => res.status(404).json({success: false}));
  });

}