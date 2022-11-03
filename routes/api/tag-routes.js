const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
// be sure to include its associated Product data
router.get('/', (req, res) => {
    Tag.findAll({
      include:[Product]
    })
    .then((allTags) => {
        res.json(allTags);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', (req, res) => {
    Tag.findByPk(req.params.id,{
        include:[Product]
    })
    .then((oneTag) => {
        if(!oneTag){
            return res.status(404).json({msg:"No tag found under this id."})
        }
        res.json(oneTag);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});


// create a new tag
router.post('/', (req, res) => {
  console.log(req.body);
  Tag.create({
      tag_name:req.body.tag_name,
  })
  .then((data) => {
      res.json(data);
  })
  .catch((err) => {
      console.log(err);
      res.status(500).json(err);        
  });
});


// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
    Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    )
      .then((updatedTag) => {
        res.json(updatedTag);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)        ;
      });
});


router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
    Tag.destroy({
        where: {
            id:req.params.id,
        },
    })
    .then((delTag) => {
        if (delTag === 0) {
            return res.status(404).json({msg: "No tag found under this id."});
        }
        res.json(delTag);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);       
    })
});

module.exports = router;
