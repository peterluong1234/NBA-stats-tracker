var router = require('express').Router();
const passport = require('passport');
const request = require("request");
const rootURL = 'https://www.balldontlie.io/api/v1'
const fetch = require("node-fetch");

// import fetch from 'node-fetch';
// The root route renders our only view
router.get('/', function(req, res) {
  // Where do you want to go for the root route
  // in the student demo this was res.redirect('/students'), what do you want?
  // This could be a landing page, or just redirect to your main resource page which you'll have an a tag that makes 
  // a request to `/auth/google` route below

  
  request(
    `${rootURL}/season_averages?season=2021&player_ids[]=145&player_ids[]=15&player_ids[]=132&player_ids[]=490&player_ids[]=125&player_ids[]=246&player_ids[]=434&player_ids[]=57&player_ids[]=322&player_ids[]=115`, 
    async function(err, response, body) {
      const topPlayers = [
        'Joel Embiid',
        'Giannis Antetokounmpo',
        'Luka Doncic',
        'Trae Young',
        'DeMar DeRozan',
        'Jayson Tatum',
        'Nikola Jokic',
        'Devin Booker',
        'Donovan Mitchell',
        'Stephen Curry'
      ]
      let playerData = JSON.parse(body);
      // console.log(playerData.data);
      let playerDataSorted = playerData.data.sort((a,b) => b.pts - a.pts);
      // res.render('index', {playerData: playerDataSorted, topPlayer: topPlayers});
      
      // request (`${rootURL}/teams/`, async function(err, response, body) {
      //           let teams = JSON.parse(body);
      //           // console.log(teams, '<---- team data')
      //   request(`${rootURL}/games?seasons[]=2021`, function(err,response, body){
      //       let gameData = JSON.parse(body);
      //       let games = gameData.data;
            
      //       const sortedGames = games.sort((a, b) => b.id - a.id)
            
      //       // console.log(sortedGames);
      //       res.render('teams/show', {team: teams, games: sortedGames});
      //   })
        let gameDataBody = []
        let sortedGames
        await fetch(`${rootURL}/games?seasons[]=2021&postseason=true`)
        .then(response => response.json())
        .then(data => { gameDataBody = data.data;
          sortedGames = gameDataBody.sort((a, b) => b.id - a.id)
          // console.log(sortedGames)
          // sortedGames.forEach(game => {
          //   let date = game.date;
          //   date = new Date();
          //   game.date = date.toISOString().split('T')[0]
          // })
          res.render('index', {playerData: playerDataSorted, topPlayer: topPlayers, games: sortedGames})
        })


    // })
    }
  )

  
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/', // where do you want the client to go after you login 
    failureRedirect : '/' // where do you want the client to go if login fails
  }
));

router.get('/oauth2callback', passport.authenticate(
  'google', { failureredirect : '/users/login'}),
  function(req, res) {
    if(req.user.createdAt === req.user.updatedAt){
      res.redirect(`/users/register/${req.user._id}`)
    }
    else{
      res.redirect('/posts')
    }
  }
)


// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
