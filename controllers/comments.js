const Player = require('../models/player');
const request = require("request");
const rootURL = 'https://www.balldontlie.io/api/v1'

function create(req, res) {
    // Player.find({id: req.params.id}, function(err, player) {
        // console.log(req.body.content)
        let found;
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

                        Player.create({
                            firstName: playerProfile.first_name,
                            lastName: playerProfile.last_name,
                            id: playerProfile.id,
                            team: playerProfile.team.name,
                            city: playerProfile.team.city,
                            position: playerProfile.position,
                            comments: req.body   })
            })
    
            } else { 
                // looks for player in DB, if user is already added to player.userFavorites, skip
                await Player.find({ id: req.params.id}, function(err, foundPlayer) {
                    //  console.log(foundPlayer[0].usersFavorited);
                     for(let i = 0; i < foundPlayer[0].usersFavorited.length; i++) {
                         if(parseInt(req.user._id) == parseInt(foundPlayer[0].usersFavorited[i])){
                             found = true;
                             foundPlayer[0].comments.push(req.body);
                             foundPlayer[0].save(function(err) {
                                 res.redirect(`/players/${req.params.id}`)
                             })
                         }
                     }
                });
    
                if (found != true) {
                    // console.log('not found');
                    Player.find({ id: req.params.id}, function(err, foundPlayer) {
                        foundPlayer[0].usersFavorited.push(req.user._id);
                        // foundPlayer[0].save();  
                        foundPlayer[0].comments.push(req.body);
                             foundPlayer[0].save(function(err) {
                                 res.redirect(`/players/${req.params.id}`)
                             })
                    })
                    
                }
            } 
        })


}

module.exports = {
    create
};