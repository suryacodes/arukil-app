import React from 'react';
import {TouchableOpacity, ActivityIndicator} from 'react-native';
import CustomText from './customtext';

export default function Button({
  buttonstyle = {},
  onPress = () => {},
  loading = false,
  text = '',
  textStyle = {},
  loaderColor = '#ffffff',
  loaderSize = 'small',
  disabled = false,
}) {
  return (
    <TouchableOpacity
      style={buttonstyle}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}>
      {loading ? (
        <ActivityIndicator size={loaderSize} color={loaderColor} />
      ) : (
        <CustomText children={text} customStyle={textStyle} />
      )}
    </TouchableOpacity>
  );
}
