const User = require("../models/user");
const Player = require("../models/player");
const request = require("request");
// const { request } = require("../server");

const rootURL = 'https://www.balldontlie.io/api/v1'


function index(req, res) {
    console.log(req.user.favoritePlayer);
    res.render('users/index', { title: `favorite players` });
}

function addToFavorites(req, res) {
    // console.log(req.params.id);
    
    
    Player.find( {id: req.params.id} , function(err, player) {
        if(err){
            console.log('not found');
        } else if (player.length === 0 ) {
            // steps for this if statement:
            // 1. create player in DB
            // 2. add player to favorites
            let created = false;
            // this 'request' searches for the player
            
            request(
                `${rootURL}/players/${req.params.id}`, function(err, response, body) {
                    let playerProfile = JSON.parse(body);
                    let playerData = {
                        firstName: playerProfile.first_name,
                        lastName: playerProfile.last_name,
                        id: playerProfile.id
                    }    
                // player.create creates the player in DB
                Player.create(playerData, function(err) {
                console.log("1");
                })
                created = true;
                console.log('2')
            })
            console.log('3');
        
            // this if statement adds player to user favorites
            // NOTE: This runs first!
        if (created == true) {
            User.findById(req.user._id, function(err, theUser) {
                // console.log(player)
                let play = player.find(play => play.id == req.params.id);
                    console.log(play)
                    // need to access play._id
                theUser.favoritePlayer.push(play._id);
                theUser.save(function(err) {
                    console.log("saved");
                })
            })
        }
        } else {
            let found;
    
            for(let i = 0; i < req.user.favoritePlayer.length; i++) {
                if (parseInt(req.user.favoritePlayer[i]) == parseInt(player[0]._id)) {
                    found = true;
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


    // request(
    //     `${rootURL}/players/${req.params.id}`, function(err, response, body) {
    //         let playerProfile = JSON.parse(body);
    //         console.log(playerProfile);


    //         // console.log(req.user);
    //         // let playerData = {
    //         //     firstName: playerProfile.first_name,
    //         //     lastName: playerProfile.last_name,
    //         //     id: playerProfile.id
    //         // }
    //         // Player.create(playerData, function(err, player) {
    //         //     console.log("created");
    //         // })
    //         // Player.findById(playerProfile.id, function())
    //         // User.findById(req.user._id, function(err, theUser) {
    //         //     theUser.favoritePlayer.push(playerData);
    //         //     theUser.save(function(err) {
    //         //         console.log("saved");
    //         //     })
    //         // })
    //     }
    // )
}



module.exports = {
    index,
    addToFavorites
};