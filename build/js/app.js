(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// function Clock() {
//   this.alarm;
// }
//
// Clock.prototype.checkAlarm = function() {
//   if (moment() >= this.alarm) {
//     return true;
//   } else {
//     return false;
//   }
// };

function Clock() {
  this.alarms = [];
}

Clock.prototype.addAlarm = function(alarm) {
  this.alarms.push(alarm);
};

function Alarm(time) {
  this.time = moment(time);
}

Alarm.prototype.checkAlarm = function() {
  if (moment() >= this.time) {
    return true;
  } else {
    return false;
  }
};

exports.clockModule = Clock;
exports.alarmModule = Alarm;

},{}],2:[function(require,module,exports){
var Clock = require('./../js/clock.js').clockModule;
var Alarm = require('./../js/clock.js').alarmModule;

$(document).ready(function() {
  var newClock = new Clock();

  setInterval(function(){
    for(var i = 0; i < newClock.alarms.length; i++){
      var alarmId = "#alarm" + i;
      if(!(newClock.alarms[i].checkAlarm())){
        $(alarmId).css('color', 'black');
      } else {
        $(alarmId).css('color', 'red');
      }
    }
  }, 10000);

  setInterval(function(){
    $('#currentTime').text(moment().format('LT'));
  }, 1000);

  $('#setAlarm').submit(function(event) {
    event.preventDefault();
    var alarmTime = $('#alarmTime').val();
    var newAlarm = new Alarm(alarmTime);
    console.log(newAlarm);
    newClock.addAlarm(newAlarm);
    var alarmIndex = (newClock.alarms.length - 1);
    $('#alarms').append("<p id='alarm"+ alarmIndex + "'>" + newAlarm.time.format('LT') + "</p>");
    $('#alarms').append("<button type='button' class='btn btn-danger' id='snooze" + alarmIndex + "'>Snooze</button>");
    var alarmId = "#alarm" + alarmIndex;
    var snoozeId = "#snooze" + alarmIndex;
    $(snoozeId).click(function() {
      newClock.alarms[alarmIndex].time = moment(newClock.alarms[alarmIndex].time).add(15, 'm');
      $(alarmId).text(newClock.alarms[alarmIndex].time.format('LT'));
    });
  });

  // for(var i = 0; i < newClock.alarms.length; i++){
  //   var alarmId = "#alarm" + i;
  //     $(alarmId).click(function() {
  //       //var snoozeTime = parseInt($('#snoozeTime').val());
  //       newClock.alarm = moment(newClock.alarm).add(15, 'm');
  //       $('#alarmDisplay').text(newClock.alarm.format('LT'));
  //     });
  //   }

});

},{"./../js/clock.js":1}]},{},[2]);
