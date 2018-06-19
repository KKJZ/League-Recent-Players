const FORTNITE_ENDPOINT = 'https://api.fortnitetracker.com/v1/profile/{platform}/{epic-nickname}'
const apiKey = '54456bf0-d031-45f1-b056-cf9105de92c5'

//search though the fortnite api and return stats about your player on which ever system you told the search

//make results list change actice 
function handleButtonList () {
	$('div.list-group').on('click', function(e) {
		e.preventDefault();
		console.log(this);
		$(this).css(active);
	});
}

function onLoad () {
	handleButtonList();
}

onLoad();