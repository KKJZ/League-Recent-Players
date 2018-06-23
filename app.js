const RIOT_ENDPOINT = 'https://na1.api.riotgames.com';
const apiKey = 'RGAPI-46060c3b-046e-4fbf-9fd1-b5ead5a9d24a';

//search though the LoL api and return stats about your player on which ever system you told the search

//handle the submit button 
function handleSubmit () {
	$('div.list-group').on('submit', function(e) {
		e.preventDefault();
		console.log(this);
		$(this).css(active);
	});
}

//first make a call to the endpoint with what the user entered
function getName (name, callback) {
	const nameURL = RIOT_ENDPOINT + `/lol/summoner/v3/summoners/by-name/${name}?api_key=${apiKey}`;
	console.log(nameURL);
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
function getStats (name) {
	const playerId = name.id;
	const playerName = name.name;
	const summonerLevel = name.summonerLevel;
	const profileIcon = name.profileIconId;
	renderName(playerName, summonerLevel, profileIcon);
}

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

function renderName (name, level, icon) {
	getIcon(icon, test);
}

//If we received an error
function forFailure (name) {
	console.log(name);
}

//handle the submit button 
function handleSubmit () {
	$('div.list-group').on('submit', function(e) {
		e.preventDefault();
		console.log(this);
		$(this).css(active);
	});
}

function onLoad () {
	handleSubmit();
	getName("Kyle226", getStats);
}

function test (test) {
	const ugh = test.data[0];
	console.log(ugh);
}
onLoad();

