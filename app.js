const RIOT_ENDPOINT = 'https://na1.api.riotgames.com';
const apiKey = 'RGAPI-46060c3b-046e-4fbf-9fd1-b5ead5a9d24a';

//search though the LoL api and return stats about your player on which ever system you told the search

//handle the submit button 
function handleSubmit () {
	$('.js-search-form').on('submit', function(e) {
		e.preventDefault();
		const name = $('input').val();
		getName(name, getInfo);
	});
}

//first make a call to the endpoint with what the user entered
function getName (name, callback) {
	const nameURL = RIOT_ENDPOINT + `/lol/summoner/v3/summoners/by-name/${name}?api_key=${apiKey}`;
	const settings = {
		url: nameURL,
		type: 'GET',
		dataType:'json',
		success: callback,
		error: forFailure
		};
	$.ajax(settings);
}

//render stats to screen
function getInfo (name) {
	const playerId = name.id;
	const playerName = name.name;
	const summonerLevel = name.summonerLevel;
	const profileIcon = name.profileIconId;
	renderName(playerName, summonerLevel, profileIcon);
	//getStats();
}

//get icon from the icon method
function getIcon (icon, callback) {
	const iconURL = RIOT_ENDPOINT + `/lol/static-data/v3/profile-icons?api_key=${apiKey}`
	const settings = {
		url: iconURL,
		type: 'GET',
		dataType: 'json',
		success: callback,
		error: forFailure
	};
	$.ajax(settings);
}

//render name level and icon to screen
function renderName (name, level, icon) {
	console.log(name);
	console.log(level);
	console.log(icon);
}

//render stats to screen
function renderStats (argument) {
	// body...
}
//If we received an error
function forFailure (name) {
	console.log(name);
}

function onLoad () {
	handleSubmit();
	//getName("Kyle226", getStats);
}

function test (test) {
	const ugh = test.data[0];
	console.log(ugh);
}
onLoad();