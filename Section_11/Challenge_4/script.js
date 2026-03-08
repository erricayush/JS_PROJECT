/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:
*/


const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
]




// 1st-------------------------------------------------------
let huskyWeight;

for(const traverse of breeds){
    if(traverse.breed=='Husky'){
       huskyWeight=traverse.averageWeight;
    }
}

console.log(huskyWeight);


// let hsv;
// breeds.forEach((trav)=>{
//     if(trav.breed=='Husky'){
//          hsv=trav.averageWeight;
//     }
// })
// console.log(hsv);



// 2nd-------------------------------------------------------
let dog=[]
for(const dogBothActivities of breeds){
    if(dogBothActivities.activities.includes('running') && dogBothActivities.activities.includes('fetch')){
        dog.push(dogBothActivities.breed);
    }
}
console.log("dog which have both activites: 'running' and 'fetch'")
console.log(...dog)


// 3rd-------------------------------------------------------



 const allActivites=[];


for(const allAct of breeds){
    // allAct.activities.push(allActivites);
    
    allActivites.push(...allAct.activities)
}
console.log("all activites of dogs")
console.log(allActivites);


// 4th-------------------------------------------------------


const uniqueActivities=[];
breeds.forEach((unique)=>{
    uniqueActivities.push(...unique.activities);
})
console.log('unique activities of dog')
console.log(new Set(uniqueActivities))



// 5th-------------------------------------------------------
// Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".

const swimmingAdjacent=[];

for(const otherThanSwimming of breeds){
    if(otherThanSwimming.activities.includes('swimming')){
        swimmingAdjacent.push(...otherThanSwimming.activities);
    }
}

console.log(swimmingAdjacent);


// 6th-------------------------------------------------------
  
  console.log(breeds.every(breed => breed.averageWeight>10))


// 7th-------------------------------------------------------

// breeds.forEach((active)=>{
//     if(active.activities && active.activities.length>=3){
//         console.log("true");
        
        
//     }else{
//         console.log("false");
//     }
// })


const hasActive=breeds.some((active)=>{
   active.activities.length >=3;
});

console.log(hasActive);

// BONUS-------------------------------------------------------


// const averageWeightOfHaviestBreed;

const fetchWeight=breeds
.filter(breed=>breed.activities.includes('fetch'))
.map(breed=>breed.averageWeight);
const heaviestFetchBreed=Math.max(...fetchWeight);

console.log(fetchWeight)
console.log(heaviestFetchBreed)




const arr=[200,450,-400,3000,-650,-130,70,1300]
console.log(arr);
arr.sort((a,b)=>a-b);  //ascending order
const des=arr.sort((a,b)=>b-a);  //descending order


console.log(arr);
console.log(des)
