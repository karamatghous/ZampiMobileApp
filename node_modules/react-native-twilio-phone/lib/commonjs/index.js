"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "RNTwilioPhone", {
  enumerable: true,
  get: function () {
    return _RNTwilioPhone.RNTwilioPhone;
  }
});
exports.EventType = exports.twilioPhoneEmitter = exports.TwilioPhone = exports.PermissionStatus = exports.PermissionName = void 0;

var _reactNative = require("react-native");

var _RNTwilioPhone = require("./RNTwilioPhone");

let PermissionName;
exports.PermissionName = PermissionName;

(function (PermissionName) {
  PermissionName["Record"] = "RECORD";
  PermissionName["RecordAudio"] = "RECORD_AUDIO";
  PermissionName["CallPhone"] = "CALL_PHONE";
})(PermissionName || (exports.PermissionName = PermissionName = {}));

let PermissionStatus;
exports.PermissionStatus = PermissionStatus;

(function (PermissionStatus) {
  PermissionStatus["Granted"] = "GRANTED";
  PermissionStatus["Denied"] = "DENIED";
  PermissionStatus["Undetermined"] = "UNDETERMINED";
  PermissionStatus["Unknown"] = "UNKNOWN";
})(PermissionStatus || (exports.PermissionStatus = PermissionStatus = {}));

const TwilioPhone = _reactNative.NativeModules.TwilioPhone;
exports.TwilioPhone = TwilioPhone;
const twilioPhoneEmitter = new _reactNative.NativeEventEmitter(_reactNative.NativeModules.TwilioPhone);
exports.twilioPhoneEmitter = twilioPhoneEmitter;
let EventType;
exports.EventType = EventType;

(function (EventType) {
  EventType["CallInvite"] = "CallInvite";
  EventType["CancelledCallInvite"] = "CancelledCallInvite";
  EventType["CallRinging"] = "CallRinging";
  EventType["CallConnectFailure"] = "CallConnectFailure";
  EventType["CallConnected"] = "CallConnected";
  EventType["CallReconnecting"] = "CallReconnecting";
  EventType["CallReconnected"] = "CallReconnected";
  EventType["CallDisconnected"] = "CallDisconnected";
  EventType["CallDisconnectedError"] = "CallDisconnectedError";
  EventType["RegistrationSuccess"] = "RegistrationSuccess";
  EventType["RegistrationFailure"] = "RegistrationFailure";
  EventType["UnregistrationSuccess"] = "UnregistrationSuccess";
  EventType["UnregistrationFailure"] = "UnregistrationFailure";
})(EventType || (exports.EventType = EventType = {}));
//# sourceMappingURL=index.js.map