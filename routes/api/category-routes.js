const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get("/", (req, res) => {
  Category.findAll({
    include: [Product],
  })
    .then((allCategorys) => {
      res.json(allCategorys);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id,{
      include:[Product]
  })
  .then((oneCategory) => {
      if(!oneCategory){
          return res.status(404).json({msg:"No category found under this id."})
      }
      res.json(oneCategory);
  })
  .catch((err) => {
      console.log(err);
      res.status(500).json(err);
  });
});

// create a new category
router.post('/', (req, res) => {
  console.log(req.body);
  Category.create({
      category_name:req.body.category_name,
  })
  .then((data) => {
      res.json(data);
  })
  .catch((err) => {
      console.log(err);
      res.status(500).json(err);        
  });
});


// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name:req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err)        ;
    });
});

// delete a category by its `id` value
router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((delCategory) => {
      if (delCategory === 0) {
        return res.status(404).json({ msg: "No category found under this id." });
      }
      res.json(delCategory);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
