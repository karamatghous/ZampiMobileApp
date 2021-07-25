import { create, TIMEOUT_ERROR, CONNECTION_ERROR, NETWORK_ERROR } from 'apisauce'
import { BASE_API_URL } from './config';
import firebase from '@react-native-firebase/app';
import * as RNLocalize from "react-native-localize";
import DeviceInfo from 'react-native-device-info';

export const api = create({
  baseURL: BASE_API_URL,
  timeout: 60000
});

api.addAsyncRequestTransform(request => async () => {
  var myDate = new Date().getTime();
  request.params ? request.params['randomNumber'] = myDate : null;
  if (firebase.auth() && firebase.auth().currentUser) {
    var token = await firebase.auth().currentUser.getIdToken(false);
    request.headers['Authorization'] = `Bearer ${token}`;
  }
})

api.addResponseTransform(response => {
  // if (response.problem == TIMEOUT_ERROR || response.problem == NETWORK_ERROR)
  // NavigatorService.navigate('ErrorScreen', { timeout: true });
});

var refreshToken = async function () {
  await firebase.auth().currentUser.getIdToken(true);
}

export const customApi = {
  get: async function (url) {
    var self = this;
    if (url.includes('?'))
      url = url + '&channel=app' + '&timezone=' + RNLocalize.getTimeZone() + '&uniqueId=' + DeviceInfo.getUniqueId() + '&offset=' + new Date().getTimezoneOffset() + '&randomNumber=' + new Date().getTime();
    else
      url = url + '?timezone=' + RNLocalize.getTimeZone() + '&channel=app' + '&uniqueId=' + DeviceInfo.getUniqueId() + '&offset=' + new Date().getTimezoneOffset() + '&randomNumber=' + new Date().getTime();
    return new Promise(async (resolve, reject) => {
      var resp = await api.get(url);
      if (resp.status != 401)
        return resolve(resp);
      await refreshToken();
      var result = await self.get(url);
      resolve(result);
      return;
    });
  },
  put: function (url, data, options) {
    var self = this;
    if (url.includes('?'))
      url = url + '&channel=app' + '&timezone=' + RNLocalize.getTimeZone() + '&uniqueId=' + DeviceInfo.getUniqueId() + '&offset=' + new Date().getTimezoneOffset() + '&randomNumber=' + new Date().getTime();
    else
      url = url + '?timezone=' + RNLocalize.getTimeZone() + '&channel=app' + '&uniqueId=' + DeviceInfo.getUniqueId() + '&offset=' + new Date().getTimezoneOffset() + '&randomNumber=' + new Date().getTime();
    return new Promise(async (resolve, reject) => {
      var resp = await api.put(url, data, options);
      if (resp.status != 401)
        return resolve(resp);
      await refreshToken();
      var result = await self.put(url, data, options);
      resolve(result);
      return;
    });
  },
  post: function (url, data, options) {
    var self = this;
    if (url.includes('?'))
      url = url + '&channel=app' + '&timezone=' + RNLocalize.getTimeZone() + '&uniqueId=' + DeviceInfo.getUniqueId() + '&offset=' + new Date().getTimezoneOffset() + '&randomNumber=' + new Date().getTime();
    else
      url = url + '?timezone=' + RNLocalize.getTimeZone() + '&channel=app' + '&uniqueId=' + DeviceInfo.getUniqueId() + '&offset=' + new Date().getTimezoneOffset() + '&randomNumber=' + new Date().getTime();
    return new Promise(async (resolve, reject) => {
      var resp = await api.post(url, data, options);
      if (resp.status != 401)
        return resolve(resp);
      await refreshToken();
      var result = await self.post(url, data, options);
      resolve(result);
      return;
    });
  },
  delete: function (url) {
    var self = this;
    if (url.includes('?'))
      url = url + '&timezone=' + RNLocalize.getTimeZone() + '&channel=app' + '&uniqueId=' + DeviceInfo.getUniqueId() + '&offset=' + new Date().getTimezoneOffset() + '&randomNumber=' + new Date().getTime();
    else
      url = url + '?timezone=' + RNLocalize.getTimeZone() + '&channel=app' + '&uniqueId=' + DeviceInfo.getUniqueId() + '&offset=' + new Date().getTimezoneOffset() + '&randomNumber=' + new Date().getTime();
    return new Promise(async (resolve, reject) => {
      var resp = await api.delete(url);
      if (resp.status != 401)
        return resolve(resp);
      await refreshToken();
      var result = await self.delete(url);
      resolve(result);
      return;
    });
  }
}
