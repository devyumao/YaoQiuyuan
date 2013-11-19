$.support.cors = true;
$.mobile.allowCrossDomainPages = true;

/*function onDeviceReady() {
	
	if (parseFloat(window.device.version) === 7.0) {
		document.body.style.marginTop = '20px';
	}
	
	var db = window.openDatabase('yaoqiuyuan', '1.0', 'YaoQiuyuan', 1000000);
}

document.addEventListener('deviceready', onDeviceReady, false);*/

var posClass = {
	LW: 'F', ST: 'F', RW: 'F', LF: 'F', CF: 'F', RF: 'F',
	CAM: 'M', LM: 'M', CM: 'M', RM: 'M', CDM: 'M',
	LWB: 'D', LB: 'D', CB: 'D', RB: 'D', RWB: 'D', SW: 'D',
	GK: 'G'
};

function getColorFromValue(value) {
	if (value < 50) {
		return 'red';
	} else if (value < 65){
		return 'orange';
	} else if (value < 80) {
		return 'yellow';
	} else if (value < 90) {
		return 'green';
	} else {
		return 'darkgreen';
	}
}

function getColorFromPos(pos) {
	switch (posClass[pos]) {
	case 'F':
		return 'blue';
	case 'M':
		return 'green';
	case 'D':
		return 'yellow';
	case 'G':
		return 'red';
	default:
		break;
	}
}

$('#player-info').on('pageshow', function() {

	function fillInPage(player) {
		$('.player-sname').text(player.sname);
		$('.c-logo').attr('src', player.club.logo);
		$('.c-name').text(' ' +　player.club.name);

		$('.player-avatar').attr('src', player.avatar);
		$('.n-flag').attr('class', 'n-flag n-' + player.nation.id);
		$('.n-name').text(' ' +　player.nation.name);
		$('.player-birthday').text(player.birthday);
		$('.player-height').text(player.height + 'cm');
		$('.player-weight').text(player.weight + 'kg');

		$('.player-overall').text(player.overall).attr('class', 'player-overall value '+ getColorFromValue(player.overall) +'-bg');
		$('.player-potential').text(player.potential).attr('class', 'player-potential value '+ getColorFromValue(player.potential) +'-bg');

		var $playerPosition = $('.player-position');
		for (var i = 0, len = player.position.length; i < len; ++i) {
			(function() {
				var pos = player.position[i];
				console.log(pos);
				$playerPosition.append('<span class="badge ' + getColorFromPos(pos) + '-bg">' + pos + '</span> ');
			})();
		}

		
	}

	var player = JSON.parse('{"avatar":"http://cdn.content.easports.com/fifa/fltOnlineAssets/C74DDF38-0B11-49b0-B199-2E2A11D1CC13/2014/fut/items/images/players/web/20801.png","sname":"Cristiano Ronaldo","fname":"C. Ronaldo dos Santos Aveiro","nation":{"id":"38","name":"葡萄牙"},"birthday":"05 February 1985","height":185,"weight":80,"overall":92,"potential":95,"position":["LW","LM"],"foot":"右","id":20801,"reputation":5,"weakfoot":4,"skillmoves":4,"awr":"高","dwr":"低","club":{"name":"皇家马德里","logo":"http://cache.images.globalsportsmedia.com/soccer/teams/150x150/2016.png"},"attacking":{"crossing":83,"finishing":92,"heading":86,"spassing":82,"volleys":85},"skill":{"dribbling":90,"curve":88,"freekick":79,"lpassing":72,"control":95},"movement":{"acceleration":91,"speed":94,"agility":93,"reactions":90,"balance":75},"power":{"shotpower":94,"jumping":94,"stamina":89,"strength":79,"longshots":93},"mentality":{"aggressing":63,"interceptions":24,"positioning":89,"vision":81,"penalties":85},"defending":{"marking":22,"standing":31,"sliding":23},"gk":{"diving":7,"handling":11,"kicking":15,"gkposition":14,"reflexes":11},"traits":["大力任意球","被侵犯易倒地(假摔)","天才","百步穿杨","善于盘带"],"specialities":["Speedster","Dribbler","Distance Shooter","Acrobat","Clinical Finisher","Complete Forward"]}');
	console.log(player);
	fillInPage(player);
});

	