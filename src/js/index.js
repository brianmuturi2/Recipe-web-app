import Search from './models/Search';
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

const ctrlSearch = async () => {
    // 1. Get query from view
    //TODO: 
    const query = searchView.getInput();
    console.log(query);

    if (query){
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for results
        searchView.clearResults();
        searchView.clearInput();
        renderLoader(elements.searchRes);

        // 4. Search for recipe
        await state.search.getResults();

        // 5. Render results on UI
        clearLoader();
        searchView.renderResults(state.search.recipeReceived);

    }
}

elements.searchForm.addEventListener('submit', e=>{
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

