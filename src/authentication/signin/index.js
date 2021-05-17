import React, {useState} from 'react';
import Signin from './signin';
import Toast from 'react-native-simple-toast';
import GoogleSignin from '../../component/googleSignin';

const Index = (props) => {
  const [phonenumber, setPhonenumber] = useState('');
  const [loading, setLoading] = useState(false);

  const sentOTPHandler = () => {
    if (isNaN(phonenumber) || phonenumber.length != 10 || phonenumber[0] <= 5) {
      return Toast.show('Invaild Number', Toast.LONG, Toast.BOTTOM);
    } else {
      // setLoading(true);
      props.navigation.navigate('Verify', {phonenumber});
    }
  };

  const userGoogleCreds = async () => {
    const userInfo = await GoogleSignin();
    console.log(userInfo);
  };

  return (
    <Signin
      phonenumber={phonenumber}
      setPhonenumber={setPhonenumber}
      sentOtpHandler={sentOTPHandler}
      loading={loading}
      googleSignin={userGoogleCreds}
    />
  );
};

export default Index;
