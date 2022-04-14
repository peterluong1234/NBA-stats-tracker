const User = require("../models/user");
const Player = require("../models/player")
const request = require("request");
const player = require("../models/player");
const { find } = require("../models/user");
const rootURL = 'https://www.balldontlie.io/api/v1'

function search(req, res) {
    res.render('players/search', { title: "Search" });

}

function searchPlayer(req, res) {
    let playerProfile = [];
    let playerData;
    // change 
    request(
        `${rootURL}/players?search=${req.body.name}&per_page=100`, function(err, response, body) {
            // console.log(body);
            // const playerProfile = Object.assign({}, body);
            playerProfile = JSON.parse(body);
            playerData = playerProfile.data;
            // console.log(playerProfile.data);
            // console.log(playerData[0].first_name);
            res.render('players/searchResults', { title: "Search Results", /*playerName: playerData[0].firstName , */ playerData: playerData  });
        }
    )
}


// function index(req, res) {
//     res.render('players/index');
// }

// show currently only displays players who played during 2022 seasons
// consider changing second request to show "latest season played"
// look into getting multiple seasons into an array and searching by year
function show (req, res) {
    let playerProfile = {};
    let playerAvg;
    let playerData;

    request(
        `${rootURL}/players/${req.params.id}`, function(err, response, body) {
            playerProfile = JSON.parse(body);
            // console.log(playerProfile);
            
            request(
                `${rootURL}/season_averages?season2021&player_ids[]=${req.params.id}`, function(err, response, body) {
                    playerAvg = JSON.parse(body);
                    playerData = playerAvg.data[0];
                    // console.log(playerAvg.data);
                    console.log(playerData);
                    res.render(`players/player`, { title: `${playerProfile.first_name} ${playerProfile.last_name}`, stats: playerData, profile: playerProfile });
                }
            )
        }
    )
}

function addToFavorites(req, res) {
    console.log(req.params.id);
    let found;
    let playerId = parseInt(req.params.id);
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
                        userFavorites: [],
                        firstName: playerProfile.first_name,
                        lastName: playerProfile.last_name,
                        id: playerProfile.id                        
                    }    
                // player.create creates the player in DB
                    await Player.create(playerData, function(err, createdPlayer) {
                        // console.log(`player data: ${playerData}`,);
                        console.log(`createdPlayer: ${createdPlayer}`)
                        })
                    
                    await Player.find({ id: req.params.id }, function(err, foundPlayer) {
                        console.log(`foundPlayer: ${foundPlayer}`)
                    foundPlayer.usersFavorited.push(req.user._id);
                        foundPlayer.save(function(err) {
                            console.log("saved");
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
    search,
    // index,
    show,
    searchPlayer,
    addToFavorites
}