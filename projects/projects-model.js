
const db = require('../data/db-config.js');

// returns  all recipes in the system that utilize a single ingredient 
// TODO: Not working right now
function getRecipesWithIngredient(ingredient_id) {
    const recipes =  db('i.name as ingredient_name', 'r.name  as recipe_name')
    .join('ingredient as i')
    .select('i.name as ingredient_name','r.name as recipe_name')
    
    
    return recipes.where({ingredient_id})
}


  module.exports = {
    getRecipesWithIngredient
}

