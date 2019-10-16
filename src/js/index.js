import Search from './models/Search';
import Recipe from "./models/Recipe";
import List from "./models/List";
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import Likes from "./models/Likes";
import { elements, renderLoader, clearLoader } from './views/base';
/**
 * Global app state
 * Search object (query & results)
 * Current recipe object
 * Shopping list object
 * Liked recipes
 */

let state = {};
window.state = state;

/**
 * SEARCH CONTROLLER
 */

const ctrlSearch = async () => {
    // 1. Get query from view
    //TODO: 
    const query = searchView.getInput();
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
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        if (state.search){searchView.highlightSelected(id)};

        // Create new recipe object
        state.recipe = new Recipe(id);

        try{
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();   

            // Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        }catch(error){
            alert(`Error processing recipe`);
        }
    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

/**
 * LIST CONTROLLER
 */
const controlList = () => {
    // Create a new list IF there is none yet
    if(!state.list) state.list = new List();

    // Add each ingredient to the list and ui
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
}

// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    console.log(id);

    // Handle the delete event
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from state
        state.list.deleteItem(id);

        // Delete from UI
        listView.deleteItem(id);

        // Handle count update
    } else if (e.target.matches('.shopping__count-value')){
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});

/**
 * LIKES CONTROLLER
 */
const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;

    // User has NOT yet liked current recipe
    if (!state.likes.isLiked(currentID)){
        // Add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );

        // Toggle the LIKE button

        // Add like to UI list
        console.log(state.likes);
        
        // User HAS yet liked current recipe
    } else {
        // Remove like to the state
        state.likes.deleteLike(currentID);
        // Toggle the LIKE button
        
        // Remove like to UI list
        console.log(state.likes);
    }
};


// Handling recipe btn clicks
elements.recipe.addEventListener('click', e=> {
    if (e.target.matches('.btn-decrease, .btn-decrease *')){
        // Decrease button is clicked
        if (state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')){
        // Increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        // Add ingredients to shopping list
        controlList();
    } else if (e.target.matches('.recipe__love, recipe__love *')){
        // Like controller
        controlLike();
    }
});

window.l = new List();




