// const Julia=new Map([
//     ['dog1',{ name:'charli',age:5,color:'black'}],
//     ['dog2',{ name:'tango',age:2,color:'black'}],
//     ['dog3',{ name:'lusy',age:6,color:'white'}],
//     ['dog4',{ name:'leza',age:1,color:'brown'}],
//     ['dog5',{ name:'kela',age:9,color:'dark brown'}],

// ]);
// const Kate=new Map([
//     ['dog6',{ name:'mango',age:7,color:'brown'}],
//     ['dog7',{ name:'lango',age:4,color:'pink'}],
//     ['dog8',{ name:'Django',age:2,color:'white'}],
//     ['dog9',{ name:'ruma',age:1,color:'brown'}],
//     ['dog10',{ name:'kela',age:12,color:'dark brown'}],

// ]);


// function checkDogs(id){
//      const dog=Julia.get(id);
//     const result= (dog.age>=3) ?`${dog.name} is adult`:`${dog.name} is a pupy`;
//     return result;
// }

// console.log(checkDogs('dog3'));

const Julia=[3,5,2,12,7];
const Kate=[4,1,15,8,3];

// let res;
// for(const age of Julia){
//     res = age>=3 ? 'dog is adult':'dog is not adult';
//     console.log(res);
// }


Julia.forEach(function(ele, ind){
    ele>=3? console.log('dog is adult'):console.log('dog is not adult');
})


const checkDogs=function(dogsJulia,dogsKate){
    const dogsJuliaCorrected=dogsJulia.slice();
    dogsJuliaCorrected.splice(0,1);
}



