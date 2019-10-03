import axios from 'axios';

export default class Search {
    constructor(query){
        this.query = query;
    }

    async getResults(){

        const myApi = `https://www.food2fork.com/api/search`;
        const key =`4d66164e4dbd8f0388ed1b57d333a238`;
        try {
    
            const res = await axios(`${myApi}?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            // console.log(this.result);
        } catch(error) {
            alert(error);
        }
    }

}