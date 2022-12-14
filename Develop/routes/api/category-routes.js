const router = require('express').Router();
const { Category, Product } = require('../../models');
const { update } = require('../../models/Product');

  router.get('/', async (req, res) => {
    const getAll = await Category.findAll({
      include: [{model: Product}]
    })
    .then((getAll) => res.send(getAll))
    .catch((err) => res.status(500).json(err))
  }) 


router.get('/:id', async (req, res) => {
  const getByID = await Category.findByPk(req.params.id, {
    include: [{model: Product}]
  })
  .then((getByID) => res.send(getByID))
  .catch((err) => res.status(500).json(err))
});


router.post('/:name', async (req, res) => {
  const create = await Category.create({
    category_name: req.params.name
  })
  .then((create) => res.send('{Category has been added.}'))
  .catch((err) => res.status(500).json(err));
});

router.put('/:id/:name', async (req, res) => {
  const update = await Category.update({category_name: req.params.name}, {
    where: {id: req.params.id}
  }, 
  )
  .then((update) => res.send('{Category name updated.}'))
  .catch((err) => res.status(500).json)
});

router.delete('/:id', async (req, res) => {
  const deleteCategory = await Product.destroy({
    where: {
      id: req.params.id,
    },
    include: [{model: Product}]
  })
  .then((deleteCategory) => res.send("{Category's products has been deleted.}"))
  .catch((err) => res.status(500).json(err));
});

module.exports = router;
