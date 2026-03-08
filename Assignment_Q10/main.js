// main.js
// 4. Import the data and the utility function
import { userData } from './data.js';
import { saveToLocalStorage } from './utilities.js';

// utility function for storingg the imported data
saveToLocalStorage('userProfiles', userData);


const savedData = JSON.parse(localStorage.getItem('userProfiles'));
console.log("Retrieved from LocalStorage:", savedData);