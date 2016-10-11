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
