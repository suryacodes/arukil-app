import React from 'react';
import {View, Text} from 'react-native';

const Termsandconditions = () => {
  return (
    <Text
      activeOpacity={0.7}
      style={{bottom: 29, fontFamily: 'Nunito-Light', position: 'absolute'}}>
      <Text
        style={{
          color: '#999',
          fontSize: 13,
          textAlign: 'center',
          color: '#fff',
        }}>
        Before moving , please read our
        <Text style={{textDecorationLine: 'underline'}}>
          {' '}
          Terms{' & '}Conditions
        </Text>
      </Text>
    </Text>
  );
};

export default Termsandconditions;
