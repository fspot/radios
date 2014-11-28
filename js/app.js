var app = angular.module('radios', ['ngRoute', 'LocalStorageModule']);

app.value("defaultRadios", [
	{url: "http://mp3.live.tv-radio.com/franceculture/all/franceculturehautdebit.mp3", name: "France Culture", isPlaying: false},
	{url: "http://mp3.live.tv-radio.com/franceinfo/all/franceinfo.mp3", name: "France Info", isPlaying: false},
	{url: "http://mp3.live.tv-radio.com/franceinter/all/franceinterhautdebit.mp3", name: "France Inter", isPlaying: false},
	{url: "http://mp3.live.tv-radio.com/lemouv/all/lemouvhautdebit.mp3", name: "Le Mouv'", isPlaying: false},
	{url: "http://mp3.live.tv-radio.com/fbcreuse/all/fbcreuse.mp3", name: "France Bleu Creuse", isPlaying: false},
	{url: "http://streaming.radio.rtl.fr/rtl2-1-44-64.mp3", name: "RTL2", isPlaying: false},
	{url: "http://mp3.live.tv-radio.com/francemusique/all/francemusiquehautdebit.mp3", name: "France Musique", isPlaying: false},
	{url: "http://adwzg3.tdf-cdn.com/8470/nrj_165631.mp3", name: "NRJ", isPlaying: false},
	{url: "http://95.81.146.2/collinesfm/all/collines.mp3", name: "Collines", isPlaying: false},
	{url: "http://diffusion.lafrap.fr/alternantes.mp3", name: "Alternantes", isPlaying: false},
	{url: "http://vipicecast.yacast.net/virginradio_192", name: "Virgin Radio", isPlaying: false},
	{url: "http://live.francra.org:8000/radiocanut", name: "Radio Canut", isPlaying: false},
	{url: "http://ecoutez.radio-libertaire.org:8080/radiolib", name: "Radio Libertaire", isPlaying: false},
	{url: "http://radio.toile-libre.org:8000/fpp.mp3", name: "FPP", isPlaying: false},
	{url: "http://swingfm.ice.infomaniak.ch:80/swingfm-128", name: "Swing FM", isPlaying: false},
	{url: "http://broadcast.infomaniak.net/radionova-high.mp3", name: "Nova", isPlaying: false},
	{url: "http://radio.rim952.fr:8000/stream.mp3", name: "Ici et Maintenant", isPlaying: false}
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
