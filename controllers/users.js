const User = require("../models/user");
const Player = require("../models/player");
const request = require("request");
// const { request } = require("../server");

const rootURL = 'https://www.balldontlie.io/api/v1'


function index(req, res) {
    console.log(req.user.favoritePlayer);
    
    // I want to display the user's favorite players


    res.render('users/index', { title: `favorite players` });
}

function addToFavorites(req, res) {
    // console.log(req.params.id);
    let found;
    
    Player.find( {id: req.params.id} , async function(err, player) {
        console.log(`line18 Player: ${player}`)
        let playerData = {};
        if(err){
            console.log('not found');
        } else if (player.length === 0 ) {
            // steps for this if statement:
            // 1. create player in DB
            // 2. add player to favorites

            // this 'request' searches for the player
            await request(
                `${rootURL}/players/${req.params.id}`, async function(err, response, body) {
                    let playerProfile = JSON.parse(body);
                    playerData = {
                        firstName: playerProfile.first_name,
                        lastName: playerProfile.last_name,
                        id: playerProfile.id
                    }    
                // player.create creates the player in DB
                    await Player.create(playerData, function(err, createdPlayer) {
                        // console.log(`player data: ${playerData}`,);
                        // console.log(`createdPlayer: ${createdPlayer}`)
                        User.findById(req.user._id, function(err, theUser) {
                            // console.log(`user data: ${theUser}`)
                            theUser.favoritePlayer.push(createdPlayer._id);
                            theUser.save(function(err) {
                                console.log("saved");
                            })
                        })
                    })
            })

        } else { 
            // looks for player in DB, if found, skip
            for(let i = 0; i < req.user.favoritePlayer.length; i++) {
                if (parseInt(req.user.favoritePlayer[i]) == parseInt(player[0]._id)) {
                    found = true;
                    console.log('player already added');
                }
            }
            
            if (found != true) {
                console.log('not found');
                User.findById(req.user._id, function(err, theUser) {
                    let play = player.find(play => play.id == req.params.id);
                    theUser.favoritePlayer.push(play._id);
                    theUser.save(function(err) {
                        console.log("saved");
                    })
                })
            }
        } 
    })
}


module.exports = {
    index,
    addToFavorites
};