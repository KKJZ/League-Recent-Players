const RIOT_ENDPOINT = 'https://na1.api.riotgames.com';
const apiKey = 'RGAPI-22d88278-de54-4e65-a3f7-9a215a01c640';

//add the id for the icon + .png
const iconURL = `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/`;

//search though the LoL api and return stats about your player on which ever system you told the search

//handle the submit button 
function handleSubmit () {
	$('main').on('submit', function(e) {
		e.preventDefault();
		$('input').addClass('hidden');
		$('button.submit').addClass('hidden');
		$('button.reset').removeClass('hidden');
		const name = $('input').val();
		$('input').val('');
		console.log(`This was the input by user: ${name}`);
		getName(name, getInfo);
	});
}

function handleReset () {
	$('.btn-danger').on('click', function(e){
		e.preventDefault();
		$('input').removeClass('hidden');
		$('button.submit').removeClass('hidden');
		$('button.reset').addClass('hidden');
		$('input').val('');
		$('div.player-stats').html('');
		$('.matches').html('')
		$('.game-1').html('').removeClass('border');
		$('.game-2').html('').removeClass('border');
		$('.game-3').html('').removeClass('border');
	})
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
	renderName(playerName, summonerLevel, profileIcon);
	$('.matches').html(`<h2>${playerName}'s last 3 matches`);
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
	//participantIdentities[number].participantId for thier accountId
	//participantIdentities[number].player.summonerName 
	//participantIdentities[number].player.profileIcon
	//participants[number].chapionId
	//participants[number].teamId  either 100 or 200
	//gamemode
function getMatches (gameArray) {
	let num = 0;
	gameArray.forEach(function (id) {
		$.ajax({
			url: RIOT_ENDPOINT + `/lol/match/v3/matches/${id}?api_key=RGAPI-22d88278-de54-4e65-a3f7-9a215a01c640`,
			type: 'GET',
			dataType: 'json',
			success: function (e) {
				num++
				renderScreen(e, num)
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
function renderScreen (obj, num) {
	console.log(obj, num)
	let player1 = obj.participantIdentities[0].player;
	let player2 = obj.participantIdentities[1].player;
	let player3 = obj.participantIdentities[2].player;
	let player4 = obj.participantIdentities[3].player;
	let player5 = obj.participantIdentities[4].player;
	let player6 = obj.participantIdentities[5].player;
	let player7 = obj.participantIdentities[6].player;
	let player8 = obj.participantIdentities[7].player;
	let player9 = obj.participantIdentities[8].player;
	let player10 = obj.participantIdentities[9].player;
	console.log(player1);
	const results = `
					<h3>Game ${num}</h3>
					<h4>${obj.gameMode}</h4>
					<div class="col-m">
						<div class="list-group">
						<h4>Team 1</h4>
						  <button value="${player1.summonerName}" type="button" class="list-group-item list-group-item-action">${player1.summonerName}() <img src=${iconURL+ player1.profileIcon}.png alt='Player Icon' class='smallicon'></button>
						  <button value="${player2.summonerName}" type="button" class="list-group-item list-group-item-action">${player2.summonerName}() <img src=${iconURL+ player2.profileIcon}.png alt='Player Icon' class='smallicon'></button>
						  <button value="${player3.summonerName}" type="button" class="list-group-item list-group-item-action">${player3.summonerName}() <img src=${iconURL+ player3.profileIcon}.png alt='Player Icon' class='smallicon'></button>
						  <button value="${player4.summonerName}" type="button" class="list-group-item list-group-item-action">${player4.summonerName}() <img src=${iconURL+ player4.profileIcon}.png alt='Player Icon' class='smallicon'></button>
						  <button value="${player5.summonerName}" type="button" class="list-group-item list-group-item-action">${player5.summonerName}() <img src=${iconURL+ player5.profileIcon}.png alt='Player Icon' class='smallicon'></button>
						</div>
					</div>
					<div class="col-m">
						<div class="list-group">
						<h4>Team 2</h4>
						  <button value="${player6.summonerName}" type="button" class="list-group-item list-group-item-action">${player5.summonerName}() <img src=${iconURL+ player5.profileIcon}.png alt='Player Icon' class='smallicon'></button>
						  <button value="${player7.summonerName}" type="button" class="list-group-item list-group-item-action">${player6.summonerName}() <img src=${iconURL+ player6.profileIcon}.png alt='Player Icon' class='smallicon'></button>
						  <button value="${player8.summonerName}" type="button" class="list-group-item list-group-item-action">${player7.summonerName}() <img src=${iconURL+ player7.profileIcon}.png alt='Player Icon' class='smallicon'></button>
						  <button value="${player9.summonerName}" type="button" class="list-group-item list-group-item-action">${player8.summonerName}() <img src=${iconURL+ player8.profileIcon}.png alt='Player Icon' class='smallicon'></button>
						  <button value="${player10.summonerName}" type="button" class="list-group-item list-group-item-action">${player10.summonerName}() <img src=${iconURL+ player10.profileIcon}.png alt='Player Icon' class='smallicon'></button>
						</div>
					</div>	
	`;
	$(`.game-${num}`).html(results).addClass('border');
}

//If we received an error
function forFailure (name) {
	console.log(name);
	$('div.player-stats').html(`<h1 class='border'>The name you entered was not found try and different one or make sure the name was spelled correctly</h1>`);
}

function onLoad () {
	handleSubmit();
	handleReset();
}

onLoad();