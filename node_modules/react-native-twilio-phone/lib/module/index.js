import { NativeEventEmitter, NativeModules } from 'react-native';
import { RNTwilioPhone } from './RNTwilioPhone';
export let PermissionName;

(function (PermissionName) {
  PermissionName["Record"] = "RECORD";
  PermissionName["RecordAudio"] = "RECORD_AUDIO";
  PermissionName["CallPhone"] = "CALL_PHONE";
})(PermissionName || (PermissionName = {}));

export let PermissionStatus;

(function (PermissionStatus) {
  PermissionStatus["Granted"] = "GRANTED";
  PermissionStatus["Denied"] = "DENIED";
  PermissionStatus["Undetermined"] = "UNDETERMINED";
  PermissionStatus["Unknown"] = "UNKNOWN";
})(PermissionStatus || (PermissionStatus = {}));

const TwilioPhone = NativeModules.TwilioPhone;
const twilioPhoneEmitter = new NativeEventEmitter(NativeModules.TwilioPhone);
export { RNTwilioPhone, TwilioPhone, twilioPhoneEmitter };
export let EventType;

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
})(EventType || (EventType = {}));
//# sourceMappingURL=index.js.map