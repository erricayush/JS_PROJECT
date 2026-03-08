const game = {
    team1: "bayers munchiii",
    team2: "corlonia fuddi",
    players: [
        [
            "bayers1",
            "bayers2",
            "bayers3",
            "bayers4",
            "bayers5",
            "bayers6",
            "bayers7",
            "bayers8",
            "bayers9",
            "bayers10",
            "bayers11",
        ],
        [
            "corlonia1",
            "corlonia2",
            "corlonia3",
            "corlonia4",
            "corlonia5",
            "corlonia6",
            "corlonia7",
            "corlonia8",
            "corlonia9",
            "corlonia10",
            "corlonia11",
        ]
    ],
    score: "4.0",
    scored: ['leana', 'meena', 'tinaa', 'nagina'],
    date: "14 of feb 2026",
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    }


};
// FIRST
const player1 = [...game.players[0]];
const player2 = [...game.players[1]];

console.log(player1);
console.log(player2);

//FOURTH------------------------------------
const player1Final=[...game.players[0],'Thiago','Coutinho','Perisic'];
console.log(player1Final);

//SECOND-----------------------------------------


const[gk, ...fieldPlayers]=player1;
console.log( gk, fieldPlayers);
//    gk = "bayers1";
// let fieldPlayers = [
//     "bayers2",
//     "bayers3",
//     "bayers4",
//     "bayers5",
//     "bayers6",
//     "bayers7",
//     "bayers8",
//     "bayers9",
//     "bayers10",
//     "bayers11",
// ]


//THIRD-------------------------------------------------
const allPlayers=[...game.players[0] , ...game.players[1]];
console.log(allPlayers);


const [
    p1,
    p2,
    p3,
    p4,
    p5,
    p6,
    p7,
    p8,
    p9,
    p10,
    p11


] = game.players[0];

console.log(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11)

//FIFTH--------------------------------------------------

// console.log(game.odds);

const {
    odds:{team1,x:draw,team2},
}=game;
console.log(team1,draw,team2);



//SIXTH------------------------------------------------------
function printGoals(...players){
    console.log(players)
    console.log(`${players.length} goals were scored`);
}

printGoals("Davies",'Muller','Lewandowski','Kimmich');
printGoals("Davies",'Muller');
printGoals(...game.scored);


//7---------------------------------------------------------------
team1<team2 && console.log('team 1 is more likely to win ');



//----------------------------------CHALENGE-#2--------------------------------------------------------

game.scored.forEach((element, index) => {
    console.log(`Goal ${index+1 } : ${element}`);
});


// (game.odds).reduce((res,cur)=>{
//     let avg=(res+cur);
//     console.log(avg);
// })


let avg=0;
const odds=Object.values(game.odds)
for(const odd of odds) avg+=odd;
    console.log(avg);
    
    avg /=odds.length;

    console.log(avg);

//----------------------------------some practice -------------------------------------------------

    let s="ayush";
    console.log(...s);



    const airLine="tap air portugal";

    console.log(airLine.slice(-1));

    console.log(airLine.slice(2));

    console.log(new String('what are you doing'))


    const passenger='jOnAsaarwerjALKJFfnlkfAajfajFJALKJjffjF';

    const pass=passenger[0].toUpperCase()+passenger.slice(1).toLowerCase();
    console.log(pass);




    //-------------------------CHALLENGE-4----------------------------------------------


    //SET---------------------------------
    const orderSet=new Set(['hello','hello','hi', 'hello','how are you' ]);
    console.log(orderSet);
    console.log(orderSet.size);

    orderSet.delete("hello");
    console.log(orderSet);