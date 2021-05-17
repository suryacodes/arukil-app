import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import * as Animation from 'react-native-animatable';
export default function Signin(props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/image/Splash.jpg')}
          resizeMode={'contain'}
          style={{width: '35%', height: '25%'}}
        />
      </View>
      <Animation.View style={styles.footer} animation={'fadeInUpBig'}>
        <Text style={styles.heading}>Order Groceries at your fingertips</Text>
        <TouchableOpacity
          style={styles.phonenumberContainer}
          onPress={() => props.navigation.navigate('Phonenumber')}
          activeOpacity={0.7}>
          <Image
            source={require('../../assets/image/flag.png')}
            style={{width: 30, height: 25, borderRadius: 6}}
          />
          <Text style={{fontSize: 20, color: '#292929'}}>+91</Text>
          <Text style={{fontSize: 20, color: '#999'}}>
            Enter your mobile number
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={{color: '#999', fontSize: 12, textAlign: 'center'}}>
            Before moving , please read our
            <Text style={{textDecorationLine: 'underline'}}>
              {' '}
              Terms{' & '}Conditions
            </Text>
          </Text>
        </TouchableOpacity>
      </Animation.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e91e63',
  },
  header: {
    flex: 3,
    backgroundColor: '#e91e63',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 22,
    color: '#4f4f4f',
  },
  phonenumberContainer: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
});
