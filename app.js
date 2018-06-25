const RIOT_ENDPOINT = 'https://na1.api.riotgames.com';
const apiKey = 'RGAPI-22d88278-de54-4e65-a3f7-9a215a01c640';
const iconURL = RIOT_ENDPOINT + `/lol/static-data/v3/profile-icons?en_US&api_key=${apiKey}`;
let iconList;
//make the icon obj
const iconObj = $.ajax({
	url: iconURL,
	type: 'GET',
	dataType: 'jsonp',
	success: function (i) {
		console.log(i);
		iconList = i;
	}
});
console.log(iconObj);
console.log(iconList);

//search though the LoL api and return stats about your player on which ever system you told the search

//handle the submit button 
function handleSubmit () {
	$('main').on('submit', function(e) {
		e.preventDefault();
		const name = $('input').val();
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
	const playerId = name.id;
	console.log(`Account ID: ${playerId}`);
	const playerName = name.name;
	console.log(`Player name: ${playerName}`);
	const summonerLevel = name.summonerLevel;
	console.log(`Player Level: ${summonerLevel}`);
	const profileIcon = name.profileIconId;
	console.log(`Icon number: ${profileIcon}`);
	//const iconURL = iconObj.responseJSON.data[profileIcon]
	renderName(playerName, summonerLevel, profileIcon);
	//getStats(playerID);
}


//ajax for stats
function getStats (argument) {
	// for each object in matches we want to figure out your main role in 'lane'
	// also we want the champion id to see what champ you have been playing most
	// accountID to match get the gamesID from match list then each gameid call match to know if they won
}

//render name level and icon to screen
function renderName (name, level, icon) {
	const result = 
	`<div class="player-stats">
			<div class="container">
				<h1><img src=${icon} alt='Player Icon' class='icon'>${name} Level: ${level}</h1>`;
	$('div.player-stats').html(result);
}

//render stats to screen
function renderScreen () {
	//Render Stats
}

//If we received an error
function forFailure (name) {
	console.log(name);
}

function onLoad () {
	handleSubmit();
}

onLoad();