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

	var fixWhenString = function(when) {
		if (when.indexOf(':') > -1)       when = when.split(':');
		else if (when.indexOf('h') > -1)  when = when.split('h');
		else                              when = [when, '0'];
		return when[0] + ':' + ('00' + when[1]).slice(-2);
	};

	var parseDate = function(when) {
		when = when.split(':');
		return 3600 * (+when[0]) + 60 * (+when[1]);
	};

	this.whenInSeconds = function(when) {
		var now = new Date();
		var nowInSeconds = 3600 * now.getHours() + 60 * now.getMinutes() + now.getSeconds();
		var whenInSecs = parseDate(when);
		var diff = whenInSecs - nowInSeconds;
		var oneDayInSeconds = 24 * 3600;
		if (diff < 0 && diff > -5 * 60) return 0;
		else if (diff < 0) return (oneDayInSeconds - nowInSeconds) + whenInSecs;
		else return diff;
	};

	this.addAlarm = function(when, duration, radio) {
		var when = fixWhenString(when);
		var whenInSecs = this.whenInSeconds(when);
		var alarm = {when: when, order: whenInSecs, duration: +duration, radio: radio, ringing: false};
		var that = this;
		alarm.timeout = $timeout((function() { that.ring(alarm); }), whenInSecs * 1000);
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
