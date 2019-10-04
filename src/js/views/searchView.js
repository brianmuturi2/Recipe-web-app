import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => elements.searchResList.innerHTML = '';

/**
 * Pasta with tomato and spinach
 * acc:0  / acc + cur.length(Pasta) = 5 / newTitle = ['Pasta']
 * acc:5  / acc + cur.length(with) = 9 / newTitle = ['with']
 * acc:9  / acc + cur.length(with) = 15 / newTitle = ['tomato']
 * acc:15  / acc + cur.length(and) = 18 / newTitle = ['and'] (not pushed to new array)
 * acc:18  / acc + cur.length(and) = 24 / newTitle = ['tomato'] (not pushed to new array) 
 */

const limitRecipeTitle = (title, limit = 17)=>{
    // Adding propeties to an array & object isn't mutating the variable
    const newTitle = [];
    if(title.length > limit){
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit){
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        // return the result
        return `${newTitle.join(' ')}...`;
    }
    return title;
}

const renderRecipe = recipe => {
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
};
