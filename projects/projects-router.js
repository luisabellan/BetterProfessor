const express = require('express');

const Ingredients = require('./ingredient-model.js');

const router = express.Router();

// /api/ingredients/:id/recipes
router.get('/:id/recipes', (req, res) => {
  const { id } = req.params;

  Ingredients.getRecipesWithIngredient(id)
  .then(recipes => {
    if (recipes.length) {
     // console.log(recipe)
      
      res.status(200).json(recipes);
    } else {
      res.status(404).json({ message: 'Could not find recipe for given ingredient' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get recipes' });
  });
});