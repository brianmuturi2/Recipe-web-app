// https://www.food2fork.com/api/search

//  API Key: 4d66164e4dbd8f0388ed1b57d333a238

import axios from 'axios';

async function getResults(query){

    const myApi = `https://www.food2fork.com/api/search`;
    const key =`4d66164e4dbd8f0388ed1b57d333a238`;
    try {

        const res = await axios(`${myApi}?key=${key}&q=${query}`);
        const recipes = res.data.recipes;
        console.log(recipes);
    } catch(error) {
        alert(error);
    }
}
getResults(`pizza`);