Radios
======

Pure HTML5 (no Flash) web app for listening to radio, and triggering alarms. This web app is only client-side : data (alarms and radio list) is kept in `localStorage`.

ProTip : if you configured your browser to clear all cookies at exit, you must add an exception for `https://fspot.github.io/`, or it will clear `localStorage`.

![Screenshot of the main view](http://i.imgur.com/11BmqNJ.png)


Features
--------

- Add / Remove radios from the list
- Filter radio list
- Pause / Resume
- Go backward / forward (time traveling tends to bug so it is disabled by default, but it works quite well for mp3 feeds in Firefox)
- Mute / Low / High volume.
- Add / Remove alarms

Uses
----

- [Angular.js](https://angularjs.org/) as Javascript framework
- [Purecss](http://purecss.io/) for appearance

Add .m3u, .pls or .asx feed
---------------------------

### .M3U

This web app only handles `.mp3` or `.ogg` feeds, but you might want to use `.m3u` feeds.

By chance, `.m3u` is just a container for `.mp3` or `.ogg` feeds.

For example :

```bash
$ curl http://live.francra.org:8000/radiocanut.m3u
http://live.francra.org:8000/radiocanut

$ curl -i  http://live.francra.org:8000/radiocanut            
HTTP/1.0 200 OK
Content-Type: audio/mpeg
icy-br:128
icy-description:Radio Canut La plus rebelle des radios
icy-genre:Radio
icy-name:Radio Canut
icy-pub:1
icy-url:http://www.radiocanut.org
Server: Icecast 2.3.3
Cache-Control: no-cache

[... garbage binary data]
```

In this case, the `.m3u` file contains only one line which is the URL of the `.mp3` feed. `.m3u` files can contains multiple lines (lines starting with `#` are comments).

### .PLS

Same thing.

Example :

```bash
$ curl http://www.sing-sing.org/confort2.pls
[playlist]
NumberOfEntries=1
File1=http://stream.sing-sing.org:8000/singsing128
Title1=Sing-Sing

$ curl -i http://stream.sing-sing.org:8000/singsing128
HTTP/1.0 200 OK
Server: Icecast 2.3.99.3
Date: Thu, 29-May-2014 15:41:38 GMT
Content-Type: audio/mpeg
Cache-Control: no-cache
Expires: Mon, 26 Jul 1997 05:00:00 GMT
Pragma: no-cache
icy-br:128
ice-audio-info: bitrate=128;samplerate=44100;channels=2
icy-description:Un nouveau souffle pour vos oreilles
icy-genre:eclectic
icy-name:Radio Sing Sing 128 Kb/s
icy-pub:1
icy-url:http://www.sing-sing.org

[... garbage binary data]
```

### .ASX

Same thing.

Example :

```bash
$ curl http://www.oxyradio.net/listen/hd-mp3.asx

...Okay, you understand.
```
