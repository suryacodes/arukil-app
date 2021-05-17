import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Overlay} from 'react-native-elements';

const phonenumberSignin = (props) => {
  const [phonenumber, setPhonenumber] = useState(0);
  const [visible, setVisible] = useState(false);

  const onSubmit = async () => {
    if (isNaN(phonenumber) || phonenumber.length != 10 || phonenumber[0] <= 5) {
      return Alert.alert('please enter valid number');
    } else {
      try {
        setVisible(true);
        const data = {
          url: 'http://192.168.43.194:4000/api/users/phonenumber/signin',
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
          },
          data: {phonenumber: phonenumber},
        };
        let response = await axios(data);
        let res = response.data;
        if (res.message) {
          setVisible(false);
          return props.navigation.navigate('Verify', {
            phonenumber: phonenumber,
          });
        } else {
          setVisible(false);
          return Alert.alert('please enter valid number');
        }
      } catch (error) {
        Alert.alert('something went wrong,try again later');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.Title}>Please enter your mobile number</Text>
        <TouchableOpacity
          style={styles.phonenumberContainer}
          onPress={() => props.navigation.navigate('Phonenumber')}
          activeOpacity={0.7}>
          <Image
            source={require('../../assets/image/flag.png')}
            style={{width: 35, height: 25, borderRadius: 4}}
          />
          <Text style={{fontSize: 20, color: '#4f4f4f'}}>+91</Text>
          <TextInput
            style={styles.input}
            onChangeText={(number) => setPhonenumber(number)}
            placeholder={'9876543210'}
            keyboardType={'phone-pad'}
            autoFocus
          />
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text}>
          We'll text a code to verify your phone number
        </Text>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.button}
          onPress={() => onSubmit()}>
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

export default phonenumberSignin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
    paddingHorizontal: 18,
    justifyContent: 'space-between',
  },

  header: {
    height: 100,
    justifyContent: 'space-between',
  },
  Title: {
    color: '#4f4f4f',
    fontSize: 20,
  },
  phonenumberContainer: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    width: '72%',
    fontSize: 18,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: '#ddd',
  },
  footer: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: '#999',
    width: '60%',
  },
  button: {
    padding: 16,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});
