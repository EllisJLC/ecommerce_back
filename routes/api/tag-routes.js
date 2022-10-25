const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(tags);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id,
      {
      include: [{model: Product}]
    });
    res.status(200).json(tag);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  if (req && req.body) {
    Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(200).json("New tag added.");
  } 
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  if (req && req.body) {
    const oldEntry = await Tag.findByPk(req.params.id);
    if (!oldEntry) {
      res.status(404).json("No tag found with that id.");
    } else {
      oldEntry.update({
        tag_name: req.body.tag_name
      });
      res.status(200).json("Tag has been updated.");
    }
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  if (req && req.body) {
    const toDelete = await Tag.findByPk(req.params.id);
    if (!toDelete) {
      res.status(404).json("That tag is not assigned.");
    } else {
      await toDelete.destroy();
      res.status(200).json("Tag successfully deleted.");
    }
  }
});

module.exports = router;
