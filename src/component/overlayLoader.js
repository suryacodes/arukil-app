import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Overlay} from 'react-native-elements';

const OverlayLoader = ({visible = false}) => {
  return (
    <Overlay
      visible={visible}
      statusBarTranslucent
      overlayStyle={{backgroundColor: 'transparent', elevation: 0}}>
      <ActivityIndicator color={'#e91e63'} size={'large'} />
    </Overlay>
  );
};

export default OverlayLoader;
