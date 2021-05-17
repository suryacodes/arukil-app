import React from 'react';
import {StyleSheet, View, BackHandler} from 'react-native';
import TextInput from '../../component/textInput';
import Button from '../../component/button';
import OverlayLoader from '../../component/overlayLoader';

const PersonalDetails = ({
  name,
  email,
  setName = () => {},
  setEmail = () => {},
  userGoogleCreds = () => {},
  saveDetailsHandler = () => {},
  visibleBtn,
  loading,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder={'Name*'}
        customStyle={{
          borderBottomWidth: 1,
          marginTop: 20,
        }}
        autoFocus={true}
        changeStyle={true}
      />
      <TextInput
        isFocus={(callback) => userGoogleCreds(callback)}
        placeholder={'Email'}
        customStyle={{
          borderBottomWidth: 1,
          marginTop: 35,
        }}
        changeStyle={true}
        value={email}
        onChangeText={setEmail}
      />
      <Button
        buttonstyle={[
          styles.button,
          {backgroundColor: visibleBtn ? '#ee5488' : '#f59bba'},
        ]}
        onPress={saveDetailsHandler}
        text={'Continue'}
        disabled={!visibleBtn}
        textStyle={styles.textStyle}
      />
      <OverlayLoader visible={loading} />
    </View>
  );
};

export default PersonalDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 25,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 28,
    width: '100%',
    alignSelf: 'center',
    height: 45,
  },
  textStyle: {
    color: '#ffffff',
    fontFamily: 'Nunito-Light',
    fontSize: 16,
  },
});
