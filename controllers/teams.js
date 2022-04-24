const User = require("../models/user");
const Team = require("../models/team")
const request = require("request");
const rootURL = 'https://www.balldontlie.io/api/v1'

function show (req, res) {
    console.log(req.params.id);
    request (`${rootURL}/teams/${req.params.id}`, async function(err, response, body) {
                let teams = JSON.parse(body);
                // console.log(teams, '<---- team data')
        request(`${rootURL}/games?seasons[]=2021&team_ids[]=${req.params.id}&per_page=100`, function(err,response, body){
            let gameData = JSON.parse(body);
            let games = gameData.data;
            
            const sortedGames = games.sort((a, b) => b.id - a.id)
            
            // console.log(sortedGames);
            res.render('teams/show', {team: teams, games: sortedGames});
        })
    
    })
}

function index (req, res) {
    res.render('teams')
}

async function addToFavorites(req, res) {
    console.log(req.params.id);
    // let found;
    let teamId = parseInt(req.params.id);
    let found;

    Team.find( {id: req.params.id} , async function(err, team) {
        // console.log(`line18 Player: ${player}`)
        let teamData = {};
        if(err){
            console.log('not found');
        } else if (team.length === 0 ) {
            // steps for this if statement:
            // 1. create team in DB
            // 2. add team to favorites

            // this 'request' searches for the player
            await request(
                `${rootURL}/teams/${req.params.id}`, async function(err, response, body) {
                    let teamProfile = JSON.parse(body);
                    teamData = {  
                        id: teamProfile.id,
                        abbreviation: teamProfile.abbreviation,
                        city: teamProfile.city,
                        name: teamProfile.name,
                        fullName: teamProfile.full_name,
                        conference: teamProfile.conference,
                        division: teamProfile.division
                    }    

                // player.create creates the player in DB
                    await Team.create(teamData, function(err, createdTeam) {
                        // console.log(`player data: ${playerData}`,);
                        // console.log(`createdPlayer: ${createdPlayer.usersFavorited}`)
                        createdTeam.usersFavorited.push(req.user._id);
                        createdTeam.save();
                        })
        })
    
        } else { 
            // looks for player in DB, if user is already added to player.userFavorites, skip
            await Team.find({ id: req.params.id}, function(err, foundTeam) {
                 console.log(foundTeam[0].usersFavorited);
                 for(let i = 0; i < foundTeam[0].usersFavorited.length; i++) {
                     if(parseInt(req.user._id) == parseInt(foundTeam[0].usersFavorited[i])){
                         found = true;
                         console.log('player already added');
                     }
                 }
            });

            if (found != true) {
                console.log('not found');
                Team.find({ id: req.params.id}, function(err, foundTeam) {
                    foundTeam[0].usersFavorited.push(req.user._id);
                    foundTeam[0].save();  
                })
            }
        } 
    })
}

async function deleteTeam(req, res) {
    // find player in database
    // remove user id from player

    await Team.findOneAndUpdate({ id: req.params.id }, {$pull: {usersFavorited: req.user._id}}, (err, data) => {
        if (err) {
            return console.log("There was an error");
        }
    })

    await res.redirect('/users/');

}

module.exports = {
    index,
    show,
    addToFavorites,
    delete: deleteTeam
}