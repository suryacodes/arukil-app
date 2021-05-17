import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from './authContext';
import {useDispatch, useSelector} from 'react-redux';
import SigninRoutes from './authentication/routes';
import HomeRoutes from './home/index';

function AuthRoutes() {
  const state = useSelector((state) => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        await AsyncStorage.setItem('token', data).then((token) => {
          dispatch({type: 'SIGN_IN', token: token});
        });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('token').then(() => {
            dispatch({type: 'SIGN_OUT'});
          });
        } catch (error) {
          console.log(error);
        }
      },
    }),
    [],
  );

  return !state.loading ? null : (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <SigninRoutes />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default AuthRoutes;
