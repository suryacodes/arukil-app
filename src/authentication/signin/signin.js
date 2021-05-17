import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Dimensions,
  StatusBar,
} from 'react-native';
import Logo from '../../assets/image/logoArukilfinal.png';
import flag from '../../assets/image/flag.png';
import CustomText from '../../component/customtext';
import TextInput from '../../component/textInput';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import Divider from '../../component/signinDivider';
import TermsAndConditions from '../../component/termsandconditions';
import Button from '../../component/button';
import OverlayLoader from '../../component/overlayLoader';

const Signin = ({
  phonenumber,
  setPhonenumber = () => {},
  sentOtpHandler = () => {},
  loading,
  googleSignin = () => {},
}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#e91e63'} />
      <Image source={Logo} resizeMode={'contain'} style={styles.logo} />
      <View style={styles.innerContainer}>
        <View style={styles.phonenumber}>
          <Image
            source={flag}
            resizeMode={'contain'}
            style={{width: 25, height: 25}}
          />
          <CustomText children={'+91'} customStyle={styles.countryCodeText} />
          <TextInput
            customStyle={styles.textInput}
            keyboardType={'number-pad'}
            maxLength={10}
            placeholder={'Phone Number'}
            onChangeText={setPhonenumber}
            value={phonenumber}
          />
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => setPhonenumber('')}>
            {phonenumber ? (
              <Icon name={'close'} style={styles.innerSideCloseIcon} />
            ) : null}
          </TouchableOpacity>
        </View>
        <Button
          buttonstyle={styles.sentOtpButton}
          onPress={sentOtpHandler}
          text={'Send OTP'}
          disabled={loading}
          textStyle={styles.sentOtpButtonText}
        />
        <Divider />
        <GoogleSigninButton
          style={styles.googleButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={googleSignin}
        />
      </View>
      <TermsAndConditions />
      <OverlayLoader visible={loading} />
    </View>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    backgroundColor: '#e91e63',
  },
  logo: {
    width: 110,
    height: 110,
    marginTop: 20,
    opacity: 0.9,
  },
  innerContainer: {
    marginTop: '35%',
    paddingHorizontal: 20,
    width: '95%',
  },
  phonenumber: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    borderRadius: 6,
    paddingHorizontal: 8,
  },
  textInput: {
    width: '62%',
    color: '#222222',
    fontSize: 16,
  },
  countryCodeText: {
    fontSize: 16,
    marginRight: 14,
    color: '#2d2d2d',
    opacity: 0.9,
    fontFamily: 'Nunito-Light',
  },
  sentOtpButton: {
    padding: 14,
    backgroundColor: '#222222',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  sentOtpButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Nunito-Light',
  },
  closeIcon: {
    width: '10%',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
  },
  innerSideCloseIcon: {
    padding: 2,
    borderRadius: 20,
    backgroundColor: '#ddd',
    color: '#fff',
  },
  googleButton: {
    width: '100%',
    height: 55,
    borderRadius: 100,
    justifyContent: 'center',
    marginTop: 15,
  },
});
