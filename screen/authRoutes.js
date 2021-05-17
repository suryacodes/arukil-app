import React from 'react';
import {
  View,
  PermissionsAndroid,
  BackHandler,
  StyleSheet,
  Image,
  Linking,
} from 'react-native';
import HomeRoutes from './home/routes/stackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Signin from './signin/routes';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../src/AuthContext';
import jwt_decode from 'jwt-decode';
import {connect} from 'react-redux';
import Geocoder from 'react-native-geocoding';
import {GoogleApiKey} from './config';
// import Geolocation from 'react-native-geolocation-service';
import SplashScreen from 'react-native-splash-screen';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';

const Stack = createStackNavigator();

function AuthRoutes(props) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SIGN_IN':
          return {
            isUser: true,
            isLoading: false,
          };
        case 'SIGN_OUT':
          return {
            isUser: false,
            isLoading: false,
          };
      }
    },
    {
      isLoading: true,
      isUser: false,
    },
  );

  function isTokenExpired(token) {
    if (token !== null) {
      let decoded = jwt_decode(token);
      decoded = decoded.exp - 7200;
      return decoded <= Date.now() / 1000 ? null : token;
    } else {
      return null;
    }
  }

  const geocoder = async (latitude, longitude) => {
    await Geocoder.init(GoogleApiKey);
    await Geocoder.from(latitude, longitude)
      .then((json) => {
        var addressComponent = json.results[0];
        props.GET_LOCATION(addressComponent);
        return;
      })
      .catch((error) => console.log(error));
  };

  React.useEffect(() => {
    // const _checkValidations = async () => {
    //   const checkLocationPermission = await PermissionsAndroid.check(
    //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //   );
    //   if (checkLocationPermission) {
    //     try {
    //       let token = await AsyncStorage.getItem('token');
    //       let checkTokenValidity = await isTokenExpired(token);

    //       await Geolocation.getCurrentPosition(
    //         (pos) => {
    //           return geocoder(pos.coords.latitude, pos.coords.longitude);
    //         },
    //         (err) => {
    //           alert(
    //             'Fetching the Position failed, please check location is enable!',
    //           );
    //         },
    //         {enableHighAccuracy: true, timeout: 15000, maximumAge: 1000},
    //       );

    //       if (token !== null && checkTokenValidity !== null) {
    //         return dispatch({type: 'SIGN_IN'});
    //       } else {
    //         return dispatch({type: 'SIGN_OUT'});
    //       }
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   } else {
    //     const granted = await PermissionsAndroid.request(
    //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //     );
    //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //       return _checkValidations();
    //     } else {
    //       BackHandler.exitApp();
    //     }
    //   }
    // };
    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 50,
      distanceFilter: 0,
      debug: false,
      startOnBoot: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: 1000,
      fastestInterval: 5000,
      activitiesInterval: 1000,
      stopOnStillActivity: false,
    });

    setTimeout(() => {
      // _checkValidations();
      dispatch({type: 'SIGN_OUT'});
      SplashScreen.hide();
      foo();
    }, 1000);
  }, []);

  const foo = () => {
    Linking.openURL(
      'https://www.google.com/maps/dir/?api=1&destination=9.9252,78.1198',
    );

    BackgroundGeolocation.on('location', (location) => {
      console.log(location.longitude);
    });

    BackgroundGeolocation.checkStatus((status) => {
      if (!status.isRunning) {
        BackgroundGeolocation.start(); //triggers start on start event
      }
    });
  };

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

  return !state.isLoading ? (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {!state.isUser ? (
            <Stack.Screen name="Signin" component={Signin} />
          ) : (
            <Stack.Screen name="HomeRoutes" component={HomeRoutes} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  ) : null;
}

const mapStateToProps = (state) => {
  return {
    location: state.locationReducer.location,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GET_LOCATION: (data) => {
      dispatch({type: 'GET_LOCATION', data});
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoutes);

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    backgroundColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '35%',
    height: '25%',
  },
});
