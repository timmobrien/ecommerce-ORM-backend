const router = require("express").Router();
const { handleError500 } = require("../../../utilities/error-handle");
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [{ model: Product }],
  })
    .then((categories) => {
      res.json(categories);
    })
    .catch(handleError500(res));
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value

  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.json(category);
  } catch (err) {
    handleError500(res)(err);
    console.log(err);
  }
  // be sure to include its associated Products
});

router.post("/", async (req, res) => {
  try {
    const category = await Category.create({
      category_name: req.body.category_name,
    });
    res.json(category);
  } catch (err) {
    handleError500(res)(err);
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const update = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: { id: req.params.id },
      }
    );
    // Return the updated category
    const updatedCategory = await Category.findByPk(req.params.id);
    res.json(updatedCategory);
  } catch (err) {
    handleError500(res)(err);
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleted = await Category.destroy({ where: { id: req.params.id } });
    res.json(deleted);
  } catch (err) {
    handleError500(res)(err);
  }
});

module.exports = router;
