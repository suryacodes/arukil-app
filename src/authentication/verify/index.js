import React, {useState, useEffect} from 'react';
import VerifyOtp from './verify';

const Index = ({navigation, route: {params}}) => {
  var resendOtpTimerInterval;
  const [code, setCode] = useState(0);
  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(15);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (code) => {
    if (isNaN(code) || code.length != 4) {
      // Alert.alert('Enter valid otp');
    } else {
      //setLoading(true);
      navigation.navigate('PersonalDetail');
      try {
      } catch (error) {
        console.error(error);
      }
    }
  };

  const startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
      if (resendButtonDisabledTime <= 0) {
        clearInterval(resendOtpTimerInterval);
      } else {
        setResendButtonDisabledTime(resendButtonDisabledTime - 1);
      }
    }, 1000);
  };

  useEffect(() => {
    startResendOtpTimer();
    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
      }
    };
  }, [resendButtonDisabledTime]);

  return (
    <VerifyOtp
      resendButtonDisabledTime={resendButtonDisabledTime}
      phonenumber={params?.phonenumber}
      setCode={setCode}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
};

export default Index;
