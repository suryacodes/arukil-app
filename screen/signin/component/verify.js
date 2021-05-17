import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Overlay} from 'react-native-elements';
import axios from 'axios';
import {AuthContext} from '../../../src/AuthContext';

const Verify = (props) => {
  const [code, setCode] = useState(0);
  const [visible, setVisible] = useState(false);
  const {signIn} = React.useContext(AuthContext);
  const [resender, setResender] = React.useState(true);

  const onSubmit = async (code) => {
    if (isNaN(code) || code.length != 4) {
      Alert.alert('Enter valid otp');
    } else {
      setVisible(true);
      try {
        const data = {
          url: 'http://192.168.43.194:4000/api/users/phonenumber/verify',
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
          },
          data: {
            phonenumber: props.route.params.phonenumber,
            code: code,
          },
        };
        let response = await axios(data);
        let res = response.data;
        if (res.status) {
          setVisible(false);
          signIn(res.token);
        } else {
          setVisible(false);
          return Alert.alert('Otp is invaild ');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  React.useEffect(() => {
    setTimeout((t) => {
      setResender(false);
    }, 10000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Please enter the 4-digit code sent to you{' '}
        </Text>
        <OTPInputView
          style={{width: '70%', height: 40}}
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

      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={resender}
          onPress={() => console.log('jsd')}>
          <Text style={[styles.resend, {color: resender ? '#999' : '#2e69d9'}]}>
            I didn't receive a code ?
            <Text style={{textDecorationLine: 'underline'}}> resend </Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onSubmit(code)}
          style={styles.button}>
          <MaterialCommunityIcons
            name={'arrow-right'}
            size={25}
            color={'#fff'}
          />
        </TouchableOpacity>
      </View>
      <Overlay isVisible={visible}>
        <ActivityIndicator size={'large'} color="#999" />
      </Overlay>
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
  header: {
    height: 120,
    justifyContent: 'space-between',
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
    borderWidth: 0,
    borderBottomWidth: 2,
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
});
