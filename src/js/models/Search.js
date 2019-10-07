import axios from 'axios';
import {myApiSearch, key} from '../config';

export default class Search {
    constructor(query){
        this.query = query;
    }

    async getResults(){


        try {
    
            const res = await axios(`${myApiSearch}?key=${key}&q=${this.query}`);
            this.recipeReceived = res.data.recipes;
            // console.log(this.result);
        } catch(error) {
            alert(error);
        }
    }

}