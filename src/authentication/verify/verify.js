import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import OverlayLoader from '../../component/overlayLoader';

const Verify = ({
  onSubmit = () => {},
  setCode = () => {},
  phonenumber,
  resendButtonDisabledTime,
  loading,
}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#f7f7f7'} barStyle="dark-content" />
      <View style={styles.topContainer}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            fontFamily: 'Nunito-Light',
          }}>
          We have sent a Verification code to
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '700',
            fontFamily: 'Nunito-Light',
            marginTop: 4,
          }}>
          {'+91-' + phonenumber}
        </Text>
        <OTPInputView
          style={{height: 40, marginTop: 35}}
          pinCount={4}
          autoFocusOnLoad={true}
          keyboardType="number-pad"
          codeInputFieldStyle={styles.codeInputFieldStyle}
          codeInputHighlightStyle={{
            borderColor: '#000',
            backgroundColor: '#fff',
          }}
          onCodeFilled={(code) => onSubmit(code)}
          onCodeChanged={(code) => setCode(code)}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Nunito-Light',
            fontSize: 19,
          }}>
          {resendButtonDisabledTime < 10
            ? `0.0${resendButtonDisabledTime}`
            : `0.${resendButtonDisabledTime}`}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
              fontFamily: 'Nunito-Regular',
            }}>
            Didn't receive the code ?
          </Text>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {}}
            disabled={resendButtonDisabledTime === 0 ? false : true}>
            <Text
              style={{
                color: resendButtonDisabledTime === 0 ? '#e91e63' : '#999',
                marginLeft: 8,
              }}>
              Resend
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <OverlayLoader visible={loading} />
    </View>
  );
};

export default Verify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  topContainer: {
    width: '70%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: '6%',
  },
  title: {
    color: '#383232',
    fontSize: 20,
  },
  footer: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  codeInputFieldStyle: {
    fontSize: 18,
    width: 40,
    height: 40,
    color: '#000',
    borderRadius: 5,
  },
  resend: {
    color: '#2e69d9',
    fontSize: 16,
    width: '100%',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
    width: '100%',
  },
});
