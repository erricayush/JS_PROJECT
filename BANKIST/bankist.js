const account1={
    owner:'Jonas Schmedtmann',
    movements:[200,450,-400,3000,-650,-130,70,1300],
    interestRate:1.2 ,
    pin:1111,
}
const account2={
    owner:'Jessica Davis',
    movements:[5000,3400,-150,-790,-3210,-1000,8500,-30],
    interestRate:1.5 ,
    pin:2222,
}
const account3={
    owner:'Steven Thomas Williams',
    movements:[200,-200,340,-300,-20,50,400,-460],
    interestRate:0.7 ,
    pin:3333,
}
const account4={
    owner:'Sarah Smith',
    movements:[430,1000,700,50,90,50],
    interestRate:1 ,
    pin:4444,
}

const accounts=[account1,account2,account3,account4];

// console.log(account1)
// console.log(account4 )


const user='Steven Thomas Williams';
const userName=user.toLowerCase().split(' ');
console.log(userName)


console.log(account1.movements);

//----------------------------filter---------------------------------

const widthdrawals=account1.movements.filter(function(mov){
    return mov<0;
})

console.log(widthdrawals);




//--------------------for of------------------------


// let arr=[];
// for(const ele of account1.movements){
//     if(ele<0){
//         arr.push(ele);
//     }
   
// }
// console.log(arr); 


//---------------------Reduce----------------------------------

const max=account1.movements.reduce((acc,mov)=>{
    if(acc>mov){
        return acc;
    }else{
      return  mov;
    }

       
},account1.movements[0])

console.log(max);


// let result;

// for(const acc of accounts){
//        result=  acc.find( act=> act.owner ==='Steven Thomas Williams');

      
        
   
// }

//  console.log(result);