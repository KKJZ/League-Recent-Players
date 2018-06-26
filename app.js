const RIOT_ENDPOINT = 'https://na1.api.riotgames.com';
const apiKey = 'RGAPI-22d88278-de54-4e65-a3f7-9a215a01c640';

//add the id for the icon + .png
const iconURL = `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/`;

//search though the LoL api and return stats about your player on which ever system you told the search

//handle the submit button 
function handleSubmit () {
	$('main').on('submit', function(e) {
		e.preventDefault();
		const name = $('input').val();
		$('input').val('')
		console.log(`This was the input by user: ${name}`);
		getName(name, getInfo);
	});
}

//first make a call to the endpoint with what the user entered
function getName (name, callback) {
	const nameURL = RIOT_ENDPOINT + `/lol/summoner/v3/summoners/by-name/${name}?api_key=${apiKey}`;
	const settings = {
		url: nameURL,
		type: 'GET',
		dataType: 'json',
		success: callback,
		error: forFailure
		};
	$.ajax(settings);
}

//render stats to screen
function getInfo (name) {
	console.log(name);
	const playerId = name.accountId;
	console.log(`Account ID: ${playerId}`);
	const playerName = name.name;
	console.log(`Player name: ${playerName}`);
	const summonerLevel = name.summonerLevel;
	console.log(`Player Level: ${summonerLevel}`);
	const profileIcon = name.profileIconId;
	console.log(`Icon number: ${profileIcon}`);
	//const iconURL = iconObj.responseJSON.data[profileIcon]
	renderName(playerName, summonerLevel, profileIcon);
	getRecentMatches(playerId, getMatchList);
}


//ajax for stats
function getRecentMatches (accountId, callback) {
	//show last three games with player names and champion they were playing
	//we need for each player get summoner name and profile icon also participant Id
	//when you click on a name you are taken to thier recent matches page
	//Makes list of last three https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/35368642?beginIndex=0&endIndex=3
	$.ajax({
		url: RIOT_ENDPOINT + `/lol/match/v3/matchlists/by-account/${accountId}?beginIndex=0&endIndex=3&api_key=${apiKey}`, 
		type: 'GET',
		dataType: 'json',
		success: callback
	});
}

function getMatchList (matchList) {
	let game1 = matchList.matches[0].gameId;
	let game2 = matchList.matches[1].gameId;
	let game3 = matchList.matches[2].gameId;
	let games = [game1, game2, game3]
	console.log(`This is the game ID array: ${games}`);
	//next i need to take games array and put each one into the getMatch 
	getMatches(games);
}
	//need this from getMatch
	//participantIdentities.participantId for thier Id
	//participantIdentities.player.summonerName
	//participantIdentities.player.profileIcon
	//gamemode
function getMatches (gameArray) {
	gameArray.forEach(function (id) {
		$.ajax({
			url: RIOT_ENDPOINT + `/lol/match/v3/matches/${id}?api_key=apiKey`,
			type: 'GET',
			dataType: 'json',
			success: function (e) {
				console.log(e);
			}
		})
	})
}

//render name level and icon to screen
function renderName (name, level, icon) {
	const result = 
	`
	<div class="container border">
		<h1><img src=${iconURL+ icon}.png alt='Player Icon' class='icon'> ${name} Level: ${level}</h1>
	</div>
	`;
	$('div.player-stats').html(result);
}

//render stats to screen
function renderScreen () {
	//Render Stats
}

//If we received an error
function forFailure (name) {
	console.log(name);
	$('div.player-stats').html(`<h1 class='border'>The name you entered was not found try and different one or make sure the name was spelled correctly</h1>`);
}

function onLoad () {
	handleSubmit();
}

onLoad();