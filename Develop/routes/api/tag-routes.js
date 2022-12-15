const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
  const getAll = await Tag.findAll({
    include: [{model: Product}]
  })
  .then((getAll) => res.send(getAll))
  .catch((err) => res.status(500).json(err))
}) 


router.get('/:id', async(req, res) => {
const getByID = await Tag.findByPk(req.params.id, {
  include: [{model: Product}]
})
.then((getByID) => res.send(getByID))
.catch((err) => res.status(500).json(err))
});

router.post('/:name', async (req, res) => {
  const create = await Tag.create({
    tagName: req.params.name
  })
  .then((create) => res.send('{Tag has been added.}'))
  .catch((err) => res.status(500).json(err));
});

router.put('/:id/:name', async (req, res) => {
  const update = await Tag.update({tagName: req.params.name}, {
    where: {id: req.params.id}
  }, 
  )
  .then((update) => res.send('{Category name updated.}'))
  .catch((err) => res.status(500).json)
});

router.delete('/:name', async (req, res) => {
  const deleteCategory = await Tag.destroy({
    where: {
      id: req.params.name
    }
  })
  .then((deleteCategory) => res.send('{Tag has been deleted.}'))
  .catch((err) => res.status(500).json(err));
});


module.exports = router;
