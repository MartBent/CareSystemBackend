/*
    Author: Mart Bent
    Date: 2-6-2021
    Ver: 1.0
*/

var mqtt = require('mqtt');
var mosca = require('mosca');
var settings = {port: 1883};
var broker = new mosca.Server(settings);

var watchTopic = 'Care system watches';
var robotTopic = 'Care system robots';

var client = mqtt.connect('mqtt://localhost:1883');

module.exports = {
    notifyWatches: function (alertID,roomNumber, message, done) {
        client.publish(watchTopic, alertID + " " + roomNumber + " " + done + " " + message);
    },
    notifyTimes: function (patientID) {
        client.publish(robotTopic,patientID+" TIME");
    },
    notifyRobot: function (roomNumber, message) {
        client.publish(robotTopic, roomNumber + " " + message);
    }
}