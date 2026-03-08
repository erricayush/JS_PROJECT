const arr = [5, 2, 4, 1, 15, 8, 3];
// const arr=[16,6,10,5,6,1,4];



const calcAverageHumanAge = function (ages) {
    const res = ages.map(function (age) {
        if (age <= 2) {
            return humanAge = 2 * age;
        } else {
            return humanAge = 16 + (age * 4);
        }

    })
    console.log(res);

    //---------------dog adult---------------------

    const adult = res.filter((num) => {
        return num >= 18
    })
    console.log(adult)

    //-----------------------avg age----------------

    const avg = adult.reduce((acc, cur) => {
        return acc + cur / adult.length;
    },0)
    console.log(avg);




}


calcAverageHumanAge(arr);


// const dogAdult=[];
// const dogEighteennYesr=function( res){
//     // for(const adult of res ){
//     //      dogAdult.push(adult);
//     // }

//     res.forEach((ele)=>{
//         if(ele>18){
//             dogAdult.push(ele);
//         }
//     })
// }

// dogEighteennYesr(res);
// console.log(dogAdult);



// -----------------------------average-----------------------

