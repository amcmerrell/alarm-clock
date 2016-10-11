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
