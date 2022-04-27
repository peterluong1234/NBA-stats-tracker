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
        `${rootURL}/players/${req.params.id}`, async function(err, response, body) {
            playerProfile = JSON.parse(body);
            // console.log(playerProfile);
            let dbPlayer = await Player.find({id: req.params.id});
            request(
                `${rootURL}/season_averages?season2021&player_ids[]=${req.params.id}`, function(err, response, body) {
                    playerAvg = JSON.parse(body);
                    playerData = playerAvg.data[0];

         
                    if(playerAvg.data.length == 0) {
                        console.log('No data')
                        res.render(`players/oldPlayer`,  { title: `${playerProfile.first_name} ${playerProfile.last_name}`, profile: playerProfile })
                    } else {
                    res.render(`players/player`, { title: `${playerProfile.first_name} ${playerProfile.last_name}`, stats: playerData, profile: playerProfile, db: dbPlayer[0] });

                    }
                }
            )
        }
    )
}

function addToFavorites(req, res) {
    // console.log(req.params.id);
    let found;
    let playerId = parseInt(req.params.id);

    // NOTE: As opposed to adding all players to database, this function finds the player in api database
    // It then adds the player to the players.DB
    // Afterwards, it will add the user._id to the players.usersFavorite arr to list the user as already favorited

    Player.find( {id: req.params.id} , async function(err, player) {
        // console.log(`line18 Player: ${player}`)
        let playerData = {};
        if(err){
            console.log('not found');
        } else if (player.length === 0 ) {
            // steps for this if statement:
            // 1. create player in DB
            // 2. add player to favorites

            // this 'request' searches for the player
            request(
                `${rootURL}/players/${req.params.id}`, async function(err, response, body) {
                    let playerProfile = JSON.parse(body);
                    playerData = {
                        firstName: playerProfile.first_name,
                        lastName: playerProfile.last_name,
                        id: playerProfile.id,
                        team: playerProfile.team.name,
                        city: playerProfile.team.city,
                        position: playerProfile.position                        
                    }    

                // player.create creates the player in DB
                    Player.create(playerData, function(err, createdPlayer) {
                        // console.log(`player data: ${playerData}`,);
                        // console.log(`createdPlayer: ${createdPlayer.usersFavorited}`)
                        createdPlayer.usersFavorited.push(req.user._id);
                        createdPlayer.save();
                        })
        })

        } else { 
            // looks for player in DB, if user is already added to player.userFavorites, skip
            await Player.find({ id: req.params.id}, function(err, foundPlayer) {
                //  console.log(foundPlayer[0].usersFavorited);
                 for(let i = 0; i < foundPlayer[0].usersFavorited.length; i++) {
                     if(parseInt(req.user._id) == parseInt(foundPlayer[0].usersFavorited[i])){
                         found = true;
                        //  console.log('player already added');
                     }
                 }
            });

            if (found != true) {
                // console.log('not found');
                Player.find({ id: req.params.id}, function(err, foundPlayer) {
                    foundPlayer[0].usersFavorited.push(req.user._id);
                    foundPlayer[0].save();  
                })
            }
        } 
    })
}

async function deletePlayer(req, res) {
    // find player in database
    // remove user id from player

    await Player.findOneAndUpdate({ id: req.params.id }, {$pull: {usersFavorited: req.user._id}}, (err, data) => {
        if (err) {
            return console.log("There was an error");
        }
    })

    await res.redirect('/users/');

}

module.exports = {
    search,
    // index,
    show,
    searchPlayer,
    addToFavorites,
    delete: deletePlayer
}
