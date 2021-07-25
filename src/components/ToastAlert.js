import setLoader from '../reducers/loader/actions';
import Toast from 'react-native-simple-toast';

export function showAlert(msg, duration, position) {
  Toast.showWithGravity(msg, duration == 'long' ? Toast.LONG : Toast.SHORT, position == 'bottom' ? Toast.BOTTOM : position == 'top' ? Toast.TOP : Toast.CENTER)
  setLoader(null);
}