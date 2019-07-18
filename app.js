/* eslint-disable import/no-dynamic-require */
// import modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// init body-parser
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Connecto MongoDB server and create/connect database
mongoose.connect('mongodb://localhost:27017/todolistDB', {
  useNewUrlParser: true,
});

// Item Schema

const ItemSchema = {
  name: String,
};

// MODEL
const Item = mongoose.model('Item', ItemSchema);

const item1 = new Item({
  name: 'Go to Work',
});
const item2 = new Item({
  name: 'Study',
});
const item3 = new Item({
  name: 'Do Homework',
});

//* *******************//
//                    //
//  APP Starts Here  //
//                  //
//* ***************//

const defaultItems = [item1, item2, item3];
const workItems = [];

app.get('/', (req, res) => {
  Item.find({}, (err, foundItems) => {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, err => {
        if (err) {
          console.log(err);
        } else {
          console.log('Successfully saved default items to DB.');
        }
      });
      res.redirect('/');
    } else {
      res.render('list', {
        listTitle: 'Today',
        newListItems: foundItems,
      });
    }
  });
});

app.post('/', (req, res) => {
  const itemName = req.body.newItem;
  const item = new Item({
    name: itemName,
  });

  item.save();
  res.redirect('/');
});

app.post('/delete', (req, res) => {
  const deletedItemId = req.body.deletedItem;

  Item.findByIdAndRemove(deletedItemId, err => {
    if (!err) {
      console.log('Item successfully deleted!');
      res.redirect('/');
    }
  });
});

app.get('/work', (req, res) => {
  res.render('list', { listTitle: 'Work List', newListItems: workItems });
});

app.post('/work', (req, res) => {
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect('/work');
});
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
