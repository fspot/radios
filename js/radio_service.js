app.service('Radio', function($sce, localStorageService, defaultRadios) {
	this.backupNow = function() {
		localStorageService.set('allradios', this.allRadios);
	};

	this.addRadio = function(radioName, radioUrl) {
		this.allRadios.push({url: radioUrl, name: radioName, isPlaying: false});
		this.backupNow();
	};

	this.findByUrl = function(url) {
		for (var idx=0 ; idx < this.allRadios.length ; idx++) {
			var value = this.allRadios[idx];
			if (value.url === url) return value;
		}
	};

	this.deleteRadio = function(radio) {
		if (radio === this.selected) {
			this.pause();
			this.selected = null;
		}
		var idx = this.allRadios.indexOf(radio);
		this.allRadios.splice(idx, 1);
		this.backupNow();
	};

	this.launchRadio = function(radio) {
		if (this.selected && this.selected.isPlaying) this.pause();
		this.selected = radio;
		this.selected.isPlaying = true;
		this.audioElement.setAttribute("src", $sce.trustAsResourceUrl(radio.url));
		this.audioElement.beginTime = +(new Date()) / 1000;
		this.audioElement.load();
		this.audioElement.play();
	};

	this.pause = function() {
		this.selected.isPlaying = false;
		this.audioElement.pause();
	};

	this.play = function() {
		this.selected.isPlaying = true;
		this.audioElement.play();
	};

	this.setVolume = function(volume) {
		if (volume.off) this.audioElement.volume = 0;
		else if (volume.down) this.audioElement.volume = 0.4;
		else this.audioElement.volume = 1;
	};

	this.notifyAlarm = function() {
		this.notification = true;
	};

	this.delNotifyAlarm = function() {
		this.notification = false;
	};

	this.notificationStillDisplayed = function() {
		return this.notification;
	};

	this.realCurrentTime = function() {
		return (+(new Date())) / 1000 - this.audioElement.beginTime;
	};

	this.decreaseCurrentTime = function() {
		this.audioElement.currentTime = Math.max(0, this.audioElement.currentTime - 10);
	};

	this.increaseCurrentTime = function() {
		this.audioElement.currentTime = Math.min(
			this.realCurrentTime() - 5,
			this.audioElement.currentTime + 10
		);
	};

	this.allRadios = [];
	var radiosBackup = localStorageService.get('allradios');
	if (radiosBackup) {
		localStorageService.set('allradios', []);
		var that = this;
		angular.forEach(radiosBackup, function (radio, idx) {
			that.addRadio(radio.name, radio.url);
		});
	} else {
		this.allRadios = defaultRadios;
	}
	this.audioElement = document.createElement("audio");
	this.audioElement.preload = 'none';

	window.audioelem = this.audioElement;

	this.selected = null;
	this.search = "";
	this.volume = {off: false, down: false, up: true};
	this.notification = null;
});
