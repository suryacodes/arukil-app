import React, {useState} from 'react';
import {BackHandler} from 'react-native';
import GoogleSignin from '../../component/googleSignin';
import PersonalDetails from './personDetails';

const Index = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [visibleBtn, setVisibleBtn] = useState(false);

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => true);
    };
  }, []);

  React.useEffect(() => {
    if (name.length > 2 && email.length) {
      setVisibleBtn(true);
    } else {
      setVisibleBtn(false);
    }
  });

  const userGoogleCreds = async (callback) => {
    const userInfo = await GoogleSignin();
    callback();
    if (Object.keys(userInfo).length) {
      return setEmail(userInfo.user.email);
    }
  };

  const saveDetailsHandler = () => {
    setLoading(true);
  };

  return (
    <PersonalDetails
      name={name}
      email={email}
      userGoogleCreds={userGoogleCreds}
      setEmail={setEmail}
      setName={setName}
      saveDetailsHandler={saveDetailsHandler}
      loading={loading}
      visibleBtn={visibleBtn}
    />
  );
};

export default Index;
