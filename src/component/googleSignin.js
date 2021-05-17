import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Toast from 'react-native-simple-toast';

GoogleSignin.configure({
  androidClientId:
    '201840459003-b1sgknafnjq56r26j01hv3afar8lsj9s.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
});

const googleSignin = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    await GoogleSignin.signOut();
    return userInfo;
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      Toast.show('cancelled', Toast.LONG, Toast.BOTTOM);
    } else if (error.code === statusCodes.IN_PROGRESS) {
      Toast.show('In Progress', Toast.LONG, Toast.BOTTOM);
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      Toast.show(
        'play services not available or outdated',
        Toast.LONG,
        Toast.BOTTOM,
      );
    } else {
      Toast.show('Oops, something went wrong!', Toast.LONG, Toast.BOTTOM);
    }
  }
};

module.exports = googleSignin;
