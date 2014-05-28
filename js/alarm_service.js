app.service('Alarm', function($timeout, Radio, localStorageService) {
	this.backupNow = function() {
		localStorageService.set('allalarms', this.alarms.filter(function(alarm) {
			return alarm.ringing === false;
		}));
	};

	this.ring = function(alarm) {
		Radio.launchRadio(alarm.radio);
		alarm.radio.isPlaying = true;
		alarm.ringing = true;
		var that = this;
		alarm.timeout = $timeout(function() { that.endRing(alarm); }, alarm.duration * 1000 * 60);
		Radio.notifyAlarm();
		this.backupNow();
	};

	this.endRing = function(alarm) {
		if (Radio.notificationStillDisplayed()) {
			Radio.pause();
			Radio.selected = null;
			alarm.timeout = null;
		}
		this.cancelAlarm(alarm);
	};

	var parseDate = function(when) {
		when = when.split(':');
		return 3600 * (+when[0]) + 60 * (+when[1]);
	};

	var whenInSeconds = function(when) {
		var now = new Date();
		var nowInSeconds = 3600 * now.getHours() + 60 * now.getMinutes() + now.getSeconds();
		var whenInSeconds = parseDate(when);
		var diff = whenInSeconds - nowInSeconds;
		var oneDayInSeconds = 1000 * 24 * 3600;
		if (diff < 0 && diff > -5 * 60) return 0;
		else if (diff < 0) return (oneDayInSeconds - nowInSeconds) + whenInSeconds;
		else return diff;
	};

	this.addAlarm = function(when, duration, radio) {
		var whenString = when;
		when = whenInSeconds(when);
		var alarm = {when: whenString, order: when, duration: +duration, radio: radio, ringing: false};
		var that = this;
		alarm.timeout = $timeout((function() { that.ring(alarm); }), when * 1000);
		this.alarms.push(alarm);
		this.backupNow();
	};

	this.cancelAlarm = function(alarm) {
		if (alarm.timeout !== null) $timeout.cancel(alarm.timeout);
		var idx = this.alarms.indexOf(alarm);
		this.alarms.splice(idx, 1);
		Radio.delNotifyAlarm();
		this.backupNow();
	};

	this.alarms = [];
	var alarmsBackup = localStorageService.get('allalarms');
	if (alarmsBackup) {
		localStorageService.set('allalarms', []);
		var that = this;
		angular.forEach(alarmsBackup, function (alarm, idx) {
			var radio = Radio.findByUrl(alarm.radio.url);
			if (radio) that.addAlarm(alarm.when, alarm.duration, radio);
		});
		this.backupNow();
	}
});
