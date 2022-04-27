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
                        let commentBody = req.body;
                        commentBody.user = req.user._id;
                        // if(req.user) {
                        //     console.log(typeof(req.user._id))
                        // }
                        await Player.create({
                            firstName: playerProfile.first_name,
                            lastName: playerProfile.last_name,
                            id: playerProfile.id,
                            team: playerProfile.team.name,
                            city: playerProfile.team.city,
                            position: playerProfile.position,
                            comments: commentBody   })
                        await res.redirect(`/players/${req.params.id}`)                            
            })
   
    
            } else { 
                await Player.find({ id: req.params.id}, function(err, foundPlayer) {
                    //  console.log(foundPlayer[0].usersFavorited);
                    let commentBody = req.body;
                             commentBody.user = req.user._id;
                             foundPlayer[0].comments.push(commentBody);
                             foundPlayer[0].save(function(err) {
                                 res.redirect(`/players/${req.params.id}`)
                             })
                });
            } 
        })


}

module.exports = {
    create
};