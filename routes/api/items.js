// const express = require('express');
// const router = express.Router();

//item model

const Item = require('../../models/Item');

module.exports = function(app) {

  app.get('/api/items', (req, res) => {

    Item.find()
        .sort({name: 1})
        .then(items => res.json(items));

  });

  app.post('/api/items', (req, res) => {

    const newItem = new Item({
      name: req.body.name,
      description: req.body.description ,
      price: req.body.price
    });
  
    newItem
    .save()
    .then(items => res.json(items));
  });

  app.delete('/api/items/:id', (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
  });

}