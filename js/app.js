var app = angular.module('radios', ['ngRoute', 'LocalStorageModule']);

app.value("defaultRadios", [
	{url: "http://audio.scdn.arkena.com/11010/franceculture-midfi128.mp3", name: "France Culture", isPlaying: false},
	{url: "http://audio.scdn.arkena.com/11006/franceinfo-midfi128.mp3", name: "France Info", isPlaying: false},
	{url: "http://audio.scdn.arkena.com/11008/franceinter-midfi128.mp3", name: "France Inter", isPlaying: false},
	{url: "http://audio.scdn.arkena.com/11014/mouv-midfi128.mp3", name: "Le Mouv'", isPlaying: false},
	{url: "http://audio.scdn.arkena.com/11373/fbcreuse-midfi128.mp3", name: "France Bleu Creuse", isPlaying: false},
	{url: "http://audio.scdn.arkena.com/11012/francemusique-midfi128.mp3", name: "France Musique", isPlaying: false},
	{url: "http://audio.scdn.arkena.com/11016/fip-midfi128.mp3", name: "FIP", isPlaying: false},
	{url: "http://streaming.radio.rtl.fr/rtl2-1-44-64.mp3", name: "RTL2", isPlaying: false},
	{url: "http://adwzg3.tdf-cdn.com/8470/nrj_165631.mp3", name: "NRJ", isPlaying: false},
	{url: "http://mp3lg4.tdf-cdn.com/9243/lag_164753.mp3", name: "Virgin", isPlaying: false},
	{url: "http://diffusion.lafrap.fr/alternantes.mp3", name: "Alternantes", isPlaying: false},
	{url: "http://ledjamradio.ice.infomaniak.ch/ledjamradio.mp3", name: "Ledjam Radio", isPlaying: false},
	{url: "http://213.186.61.62:8400/;stream.nsv", name: "Radio Béton", isPlaying: false},
	{url: "http://www.hosting-serv.com:9160/;", name: "Radio Dio", isPlaying: false},
	{url: "http://stream.franclr.fr:8000/radioescapades", name: "Radio Escapades", isPlaying: false},
	{url: "http://canalsud.scdn.arkena.com/canalsud.mp3", name: "Canal Sud", isPlaying: false},
	{url: "http://live.francra.org:8000/radiocanut", name: "Radio Canut", isPlaying: false},
	{url: "http://ecoutez.radio-libertaire.org:8080/radiolib", name: "Radio Libertaire", isPlaying: false},
	{url: "http://radio.toile-libre.org:8000/fpp.mp3", name: "FPP", isPlaying: false},
	{url: "http://swingfm.ice.infomaniak.ch:80/swingfm-128", name: "Swing FM", isPlaying: false},
	{url: "http://live140.impek.com:9962/;flash.mp3", name: "RTF", isPlaying: false},
	{url: "http://91.121.65.189:8000/3", name: "Radio Zinzine", isPlaying: false},
	{url: "http://broadcast.infomaniak.net/radionova-high.mp3", name: "Nova", isPlaying: false},
	{url: "http://www.radiogalere.org:8080/galere.mp3", name: "Radio Galère", isPlaying: false},
	{url: "http://s8.voscast.com:7742/;stream1427453898011/1", name: "Vosstanie", isPlaying: false}
]);

app.config(function($routeProvider) {
	$routeProvider
	.when('/alarm', {
		controller:'AlarmCtrl',
		templateUrl:'html/alarms.html'
	})
	.when('/', {
		controller:'RadioCtrl',
		templateUrl:'html/radios.html'
	})
	.when('/addradio', {
		controller:'AddRadioCtrl',
		templateUrl:'html/addradio.html'
	})
	.otherwise({
		redirectTo:'/'
	});
});
