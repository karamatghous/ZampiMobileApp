import Config from "react-native-config";

export const getBundleIdentifier = function () {
    return 'com.development.skys.app'//Config.APP_ID;
}

export const getDynamicLink = function () {
    return 'zampi.page.link'//Config.FIREBASE_DYNAMIC_LINK_DOMAIN;
}

export const getFcmSenderId = function () {
    return Config.FCM_SENDER_ID;
}

export const appName = 'Zampi';
export const BASE_API_URL = 'https://beta.zampi.io';
export const CONTACT_US_URL = BASE_API_URL + '/v1/contact-us?randomNumber=' + new Date().getTime();
export const WEBSITE = 'https://zampi.io';
export const FAQ_URL = WEBSITE + '/faq?header=false';