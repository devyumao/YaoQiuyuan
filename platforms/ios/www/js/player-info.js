$.support.cors = true;
$.mobile.allowCrossDomainPages = true;

$('#player-info').on('pageshow', function() {

	function playerParser(aHTMLString) {
		var parser = new DOMParser();
		var doc = parser.parseFromString(aHTMLString, "text/html");
		var $article = $(doc).find('article');
		
		var player = {};
		player['avatar'] = $article.find('h1 img').attr('data-frz-src');
		player['sname'] = $.trim($article.find('h1').text());
		player['nation'] = $article.find('.n-flag').attr('class').split(' ')[1].substr(2);

		var $lis = $article.find('ul').eq(0).find('li');
		player['fname'] = $.trim($lis.eq(0).text());
		player['birthday'] = $lis.eq(2).text().match(/\([^\)]+\)/)[0].slice(1, -1);
		player['height'] = $lis.eq(3).text().substr(0, 4) - 0;
		player['weight'] = $lis.eq(3).text().split(' ')[1].substr(0, 2) - 0;
		player['overall'] = $lis.eq(4).find('.prop').text() - 0;
		player['potential'] = $lis.eq(5).find('.prop').text() - 0;
		player['position'] = [];
		$lis.eq(6).find('.pos').each(function() {
			player['position'].push($(this).text());
		});
		player['foot'] = $lis.eq(7).text().split('\n')[2];
		player['reputation'] = $lis.eq(8).find('img').attr('title') - 0;
		player['weakfoot'] = $lis.eq(9).find('img').attr('title') - 0;
		player['skillmoves'] = $lis.eq(10).find('img').attr('title') - 0;
		player['awr'] = $lis.eq(11).find('span').text();
		player['dwr'] = $lis.eq(12).find('span').text();
		player['id'] = $lis.eq(13).text().split('\n')[2] - 0;

		var $club = $article.find('.player-team').eq(0);
		player['club'] = {
			name: $club.find('h6').text(),
			logo: $club.find('.logo').attr('src')
		};

		var $attr = $article.find('.total_percent').parent().parent();
		$lis = $attr.eq(0).find('li');
		player['attacking'] = {
			crossing: $lis.eq(0).find('.prop').text() - 0,
			finishing: $lis.eq(1).find('.prop').text() - 0,
			heading: $lis.eq(2).find('.prop').text() - 0,
			spassing: $lis.eq(3).find('.prop').text() - 0,
			volleys: $lis.eq(4).find('.prop').text() - 0
		};
		$lis = $attr.eq(1).find('li');
		player['power'] = {
			shotpower: $lis.eq(0).find('.prop').text() - 0,
			jumping: $lis.eq(1).find('.prop').text() - 0,
			stamina: $lis.eq(2).find('.prop').text() - 0,
			strength: $lis.eq(3).find('.prop').text() - 0,
			longshots: $lis.eq(4).find('.prop').text() - 0
		};
		$lis = $attr.eq(2).find('li');
		player['defending'] = {
			marking: $lis.eq(0).find('.prop').text() - 0,
			standing: $lis.eq(1).find('.prop').text() - 0,
			sliding: $lis.eq(2).find('.prop').text() - 0
		};
		$lis = $attr.eq(3).find('li');
		player['mentality'] = {
			aggressing: $lis.eq(0).find('.prop').text() - 0,
			interceptions: $lis.eq(1).find('.prop').text() - 0,
			positioning: $lis.eq(2).find('.prop').text() - 0,
			vision: $lis.eq(3).find('.prop').text() - 0,
			penalties: $lis.eq(4).find('.prop').text() - 0
		};
		$lis = $attr.eq(4).find('li');
		player['skill'] = {
			dribbling: $lis.eq(0).find('.prop').text() - 0,
			curve: $lis.eq(1).find('.prop').text() - 0,
			freekick: $lis.eq(2).find('.prop').text() - 0,
			lpassing: $lis.eq(3).find('.prop').text() - 0,
			control: $lis.eq(4).find('.prop').text() - 0
		};
		$lis = $attr.eq(5).find('li');
		player['movement'] = {
			acceleration: $lis.eq(0).find('.prop').text() - 0,
			speed: $lis.eq(1).find('.prop').text() - 0,
			agility: $lis.eq(2).find('.prop').text() - 0,
			reactions: $lis.eq(3).find('.prop').text() - 0,
			balance: $lis.eq(4).find('.prop').text() - 0
		};
		var $uls = $attr.eq(6).find('ul');
		$lis = $uls.eq(0).find('li');
		player['gk'] = {
			diving: $lis.eq(0).find('.prop').text() - 0,
			handling: $lis.eq(1).find('.prop').text() - 0,
			kicking: $lis.eq(2).find('.prop').text() - 0,
			gkposition: $lis.eq(3).find('.prop').text() - 0,
			reflexes: $lis.eq(4).find('.prop').text() - 0
		};

		$lis = $uls.eq(1).find('li');
		player['traits'] = [];
		$lis.each(function() {
			player['traits'].push($(this).text());
		});

		$lis = $uls.eq(2).find('li');
		player['specialities'] = [];
		$lis.each(function() {
			player['specialities'].push($.trim($(this).text()));
		});

		return player;
	}

	function fillInPage(player) {
		
	}

	$.get('http://sofifa.com/cn/14w/p/148290-mesut-ozil', function(data) {
		console.log('got it !');
		var player = playerParser(data);
		console.log(player);
		fillInPage(player);
	});
});

	