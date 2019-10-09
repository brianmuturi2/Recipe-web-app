import Search from './models/Search';
import Recipe from "./models/Recipe";
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';
/**
 * Global app state
 * Search object (query & results)
 * Current recipe object
 * Shopping list object
 * Liked recipes
 */

let state = {};

/**
 * SEARCH CONTROLLER
 */

const ctrlSearch = async () => {
    // 1. Get query from view
    //TODO: 
    // const query = searchView.getInput();
    const query = 'pizza';
    // console.log(query);

    if (query){
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4. Search for recipe
            await state.search.getResults();

            // 5. Render results on UI
            clearLoader();
            searchView.renderResults(state.search.recipeReceived);
        } catch (err) {
            alert(`Something went wrong with the search...`);
            clearLoader();
        }
    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    ctrlSearch();
});

/**
 * Testing purposes
 */
window.addEventListener('load', e => {
    e.preventDefault();
    ctrlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.recipeReceived, goToPage);
    };
});

/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    // console.log(id);

    if (id) {
        // Prepare UI for changes

        // Create new recipe object
        state.recipe = new Recipe(id);

        /**
         * Testing
         */
        window.ru = state.recipe;
        try{
            // Get recipe data
            await state.recipe.getRecipe();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();   

            // Render recipe
            console.log(state.recipe);                     
        }catch(error){
            alert(`Error processing recipe`);
        }
    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));