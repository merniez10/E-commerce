const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      {
        model: Product
      }
    ]
  }).then(rows => {
    res.json(rows)
  })

  console.log("hi")
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const category = await Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product
      }
    ]
  })
  res.json(category)

});

router.post('/', async (req, res) => {
  // create a new category
  // await so not necessary to use then
  const status = await Category.create(req.body)

  res.json(status)

});


router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const status = await Category.update(
    req.body,
    {
      where: { 
        id: req.params.id
      }
    }
  ) 
  res.json(status)
});

// DELETE api/categories/8
router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  const status = await Category.destroy({
    where: { id: req.params.id }
  }).catch(err => {
    return res.status(500).json({"error": err})
  })

  res.json(status)
});

module.exports = router;
