import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/SearchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable'; 
import 'regenerator-runtime/runtime';

// const recipeContainer = document.querySelector('.recipe');

if(module.hot) {
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2

const controlRecipes = async function(){
  try{

    const id = window.location.hash.slice(1);
    console.log(id);

    if(!id) return;
    recipeView.renderSpinner();

    // 1) Loading Recipe
    await model.loadRecipe(id);
    // const { recipe } = model.state;

    // 2) Rendering Recipe
    recipeView.render(model.state.recipe);
    // const recipeView = new recipeView (model.state.recipe);

    
  } catch(err){
    // console.log(err)
    recipeView.renderError();
  }
};
// controlRecipes();

const controlSearchResults = async function(){
  try{

    resultsView.renderSpinner();
    // 1. Get search query
    const query = searchView.getQuery();
    if(!query) return;

    // 2. Load search results
    await model.loadSearchResults(query);

    // 3. Render results
    // console.log(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(1));
  } catch(err) {
    console.log(err);
  }
}
// controlSearchResults();

const init = function(){
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();

