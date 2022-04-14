const User = require("../models/user");
const Player = require("../models/player");
const request = require("request");
// const { request } = require("../server");

const rootURL = 'https://www.balldontlie.io/api/v1'


function index(req, res) {
    // I want to display the user's favorite players
    // copy favorite player into an arr
    // let favoritesArr = [...req.user.favoritePlayer]
    // console.log(favoritesArr)
    
    // Player.findById(req.user.favoritePlayer)
    // .populate('')

    // console.log(favoritesArr);
    let favoritesArr2 = [];
    // loop through array for each element
    // pull player objectID and place player ID into second array

    // in second array, find player stats using express and push into an object array

    //     const promise = new Promise((resolve, reject) => {
    //         favoritesArr.forEach(element => {
    //             Player.findById(element, function(err, playerInfo) {
    //                 favoritesArr2.push(playerInfo.id);
    //              })
    //          })
    //          resolve();
    //     })
    

    // promise
    // .then(console.log(favoritesArr2));

    
    // await favoritesArr2.forEach(element => {
    //     request(
    //     `${rootURL}/season_averages?season2021&player_ids[]=${element}`, function(err, response, body) {
    //         let playerAvg = JSON.parse(body);
    //         playerData.push(playerAvg.data[0]);
    //         // console.log(playerAvg.data);
    //         console.log(playerData);
    //         // res.render(`players/player`, { Name: `${playerProfile.first_name} ${playerProfile.last_name}`, stats: playerData, profile: playerProfile });
    //         }
    //     )
    // })


    res.render('users/index', { title: `favorite players` });
}

// function addToFavorites(req, res) {
//     // console.log(req.params.id);
//     let found;
    
//     Player.find( {id: req.params.id} , async function(err, player) {
//         console.log(`line18 Player: ${player}`)
//         let playerData = {};
//         if(err){
//             console.log('not found');
//         } else if (player.length === 0 ) {
//             // steps for this if statement:
//             // 1. create player in DB
//             // 2. add player to favorites

//             // this 'request' searches for the player
//             await request(
//                 `${rootURL}/players/${req.params.id}`, async function(err, response, body) {
//                     let playerProfile = JSON.parse(body);
//                     playerData = {
//                         firstName: playerProfile.first_name,
//                         lastName: playerProfile.last_name,
//                         id: playerProfile.id                        
//                     }    
//                 // player.create creates the player in DB
//                     await Player.create(playerData, function(err, createdPlayer) {
//                         // console.log(`player data: ${playerData}`,);
//                         // console.log(`createdPlayer: ${createdPlayer}`)
//                         createdPlayer.push(req.user._id);
//                         createdPlayer.save(function(err) {
//                             console.log("saved");
//                         });
//                     })
//             })

//         } else { 
//             // looks for player in DB, if found, skip
//             for(let i = 0; i < req.user.favoritePlayer.length; i++) {
//                 if (parseInt(req.user.favoritePlayer[i]) == parseInt(player[0]._id)) {
//                     found = true;
//                     console.log('player already added');
//                 }
//             }
            
//             if (found != true) {
//                 console.log('not found');
//                 User.findById(req.user._id, function(err, theUser) {
//                     let play = player.find(play => play.id == req.params.id);
//                     theUser.favoritePlayer.push(play._id);
//                     theUser.save(function(err) {
//                         console.log("saved");
//                     })
//                 })
//             }
//         } 
//     })
// }


module.exports = {
    index,
    // addToFavorites
};