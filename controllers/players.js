const User = require("../models/user");
const Player = require("../models/player")
const request = require("request");
const player = require("../models/player");
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
    // console.log(playerData[0].first_name);
    // console.log(req.body);
    
    // res.render('players/searchResults', { title: "Search Results", /*playerName: playerData[0].firstName , playerData: playerData*/  });
    // create function to break down req.body

    // res.render('players/searchplayer', { title: "Search" });
}

function searchDataById(input, arr) {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i].id === id) {
            return arr[i];
        }
    }
}
// function index(req, res) {
//     res.render('players/index');
// }

// function show(req, res) {
    
// }

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
                    res.render(`players/player`, { title: `${playerProfile.first_name} ${playerProfile.last_name}`, stats: playerData });
                }
            )
        }
    )
}

// returns season average of 2021-2022 seasons
function returnStats(id) {

    let playerData;

    request(
        `${rootURL}/season_averages?season2021&player_ids[]=${id}`, function(err, response, body) {
            playerArr = JSON.parse(body);
            console.log(playerArr.data);
            return playerArr.data;
        }
    )
}

module.exports = {
    search,
    // index,
    show,
    searchPlayer
}