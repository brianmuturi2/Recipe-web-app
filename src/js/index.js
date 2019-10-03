// https://www.food2fork.com/api/search

//  API Key: 4d66164e4dbd8f0388ed1b57d333a238

import Search from './models/Search';

const search = new Search(`pizza`);
console.log(search);
search.getResults();