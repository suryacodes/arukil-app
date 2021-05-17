import React from 'react';
import {View, Text} from 'react-native';

const SigninDivider = () => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
      <View
        style={{flex: 1, height: 1, backgroundColor: 'gold', opacity: 0.3}}
      />
      <View>
        <Text style={{width: 50, textAlign: 'center', color: '#fff'}}>or</Text>
      </View>
      <View
        style={{
          flex: 1,
          height: 1,
          backgroundColor: 'gold',
          opacity: 0.3,
        }}
      />
    </View>
  );
};

export default SigninDivider;
