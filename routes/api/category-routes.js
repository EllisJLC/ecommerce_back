const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const ids = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(ids);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const ids = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if (!ids) {
      res.status(404).json({message: 'No category of that id.'});
      return
    }
    res.status(200).json(ids);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  if (req && req.body) {
    Category.create({
      category_name: req.body.category_name
    });
    res.status(200).json("New category added.");
  } 
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  if (req && req.body) {
    const oldEntry = await Category.findByPk(req.params.id);
    if (!oldEntry) {
      res.status(404).json("No category found with that id.");
    } else {
      oldEntry.update({
        category_name: req.body.category_name
      });
      res.status(200).json("Category has been updated.");
    }
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  if (req && req.body) {
    const toDelete = await Category.findByPk(req.params.id);
    if (!toDelete) {
      res.status(404).json("That id is not assigned.");
    } else {
      await toDelete.destroy();
      res.status(200).json("Category successfully deleted.");
    }
  }
});

module.exports = router;
