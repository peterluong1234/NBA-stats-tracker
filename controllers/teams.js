const User = require("../models/user");
const Team = require("../models/team")
const request = require("request");
const rootURL = 'https://www.balldontlie.io/api/v1'

function show (req, res) {
    console.log(req.params.id);
    request (`${rootURL}/teams/${req.params.id}`, async function(err, response, body) {
                let teams = JSON.parse(body);
                console.log(teams, '<---- team data')
        //         
    res.render('teams/show', {team: teams});
    })
}

function index (req, res) {
    let teams = {};
    console.log(req.params.id);
    // request(
    //     `${rootURL}/teams`, async function(err, response, body) {
    //         teams = JSON.parse(body);
    //         teamsArr = teams.data;
    //         teamsArr.forEach(element => {
    //             let teamData = {   
    //                 id: element.id,
    //                 abbreviation: element.abbreviation,
    //                 city: element.city,
    //                 name: element.name,
    //                 fullName: element.full_name,
    //                 conference: element.conference,
    //                 division: element.division                  
    //             }    
    //             console.log(`${teamData} <-- Team data`)
    //         // player.create creates the player in DB
    //             Team.create(teamData, function(err, createdTeam) {
    //                 // console.log(`player data: ${playerData}`,);
    //                 // console.log(`createdPlayer: ${createdPlayer.usersFavorited}`)
    //                 createdTeam.usersFavorited.push(req.user._id);
    //                 createdTeam.save();
    //                 })
    //             // console.log(element);
    //         })
            // console.log(teams);
            res.render('teams')
        // })
        // })
}

module.exports = {
    // search,
    index,
    show,
    // searchPlayer,
    // addToFavorites,
    // delete: deletePlayer
}