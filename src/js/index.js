import Search from './models/Search';
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
    const query = `pizza`;

    if (query){
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for results

        // 4. Search for recipe
        await state.search.getResults();

        // 5. Render results on UI
        console.log(state.search.result);
    }
}

document.querySelector('.search').addEventListener('submit', e=>{
    e.preventDefault();
    ctrlSearch();
});

