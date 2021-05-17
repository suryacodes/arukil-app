import React from 'react';
import {Text} from 'react-native';

const CustomText = ({children, customStyle, numberofline = 1}) => (
  <Text
    numberOfLines={numberofline}
    style={{
      fontFamily: 'Roboto-Regular',
      ...customStyle,
    }}>
    {children}
  </Text>
);

export default CustomText;
