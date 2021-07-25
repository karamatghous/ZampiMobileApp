import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

export async function fetchAndUpdateFCMToken(cb) {
    messaging().hasPermission().then(enabled => {
        if (enabled) {
            messaging().getToken().then(token => {
                cb && cb(token);
            });
        } else {
            messaging().requestPermission().then(() => {
                messaging().getToken().then(token => {
                    cb && cb(token);
                });
            }).catch(error => {
                cb && cb();
            });
        }
    });
}

export default { fetchAndUpdateFCMToken };