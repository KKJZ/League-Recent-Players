const RIOT_ENDPOINT = 'https://na1.api.riotgames.com';
const apiKey = 'RGAPI-22d88278-de54-4e65-a3f7-9a215a01c640';
const iconURL = RIOT_ENDPOINT + `/lol/static-data/v3/profile-icons?en_US&api_key=${apiKey}`;
let iconList;
//make the icon obj
// const iconObj = $.ajax({
	// url: iconURL,
	// type: 'GET',
	// dataType: 'jsonp',
	// success: function (i) {
		// console.log(i);
		// iconList = i.data;
	// }
// });
// console.log(iconObj);
// console.log(iconList);

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
	getRecentMatches(playerId, getMatchList);
}


//ajax for stats
function getRecentMatches (accountId, callback) {
	//show last three games with player names and champion they were playing
	//we need for each player get summoner name and profile icon also participant Id
	//when you click on a name you are taken to thier recent matches page
	//Makes list of last three https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/35368642?beginIndex=0&endIndex=3
	$.ajax({
		url: RIOT_ENDPOINT + `/lol/match/v3/matchlists/by-account/${accountId}?beginIndex=0&endIndex=3&api_key=RGAPI-22d88278-de54-4e65-a3f7-9a215a01c640`, 
		type: 'GET',
		dataType: 'json',
		success: callback
	});
}
	//need this from getMatch
	//participantIdentities.participantId for thier Id
	//participantIdentities.player.summonerName
	//participantIdentities.player.profileIcon
	//gamemode
function getMatchList (matchList) {
	console.log(matchList);
}


//render name level and icon to screen
function renderName (name, level, icon) {
	const result = 
	`
	<div class="container">
		<h1><img src=${icon} alt='Player Icon' class='icon'>${name} Level: ${level}</h1>
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