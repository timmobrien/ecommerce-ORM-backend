const router = require('express').Router();
const { handleError500 } = require('../../utilities/error-handle');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagList = await Tag.findAll({
    include: [{model: Product, as: "product_tags"}]
  })
  res.json(tagList);
  } catch (err) {
    handleError500(res)(err);
    console.log(err)
  }
});


// Get tag by ID
router.get('/:id', async (req, res) => {
  try {
    const tag = await Product.findByPk(req.params.id, {
      include: [{model: Product, as: 'product_tags'}],
    });
    
    if (tag === null){
      res.json({
        error: "Sorry, there are no tags with the given ID"
      })
    } else {
      res.json(tag);
    }
  } catch (err) {
    handleError500(res)(err);
    console.log(err);
  }
});

// Create new tag
router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.json(tag);
  } catch (err) {
    handleError500(res)(err);
    console.log(err);
  }
});

// Update tag
router.put('/:id', async (req, res) => {
  try {
    const update = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: { id: req.params.id },
      }
    );
    // Return the updated tag
    const updatedCategory = await Tag.findByPk(req.params.id);
    res.json(updatedCategory);
  } catch (err) {
    handleError500(res)(err);
    console.log(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleted = await Tag.destroy({ where: { id: req.params.id } });
    res.json(deleted);
  } catch (err) {
    handleError500(res)(err);
  }
});

module.exports = router;
