import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Signin from './signin';
import Verify from './verify';
import PersonalDetail from './personalDetail';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Signin"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Verify"
        component={Verify}
        options={{
          title: 'Enter Verification Code',
          headerShown: true,
          headerTitleStyle: {
            fontFamily: 'Nunito-Light',
            fontWeight: '200',
          },
          headerStyle: {
            elevation: 0,
          },
        }}
      />
      <Stack.Screen
        name="PersonalDetail"
        component={PersonalDetail}
        options={{
          title: 'Personal Details',
          headerShown: true,
          headerTitleStyle: {
            fontFamily: 'Nunito-Light',
            fontWeight: '200',
            alignSelf: 'center',
          },
          headerStyle: {
            elevation: 0,
          },
          headerLeft: () => {},
        }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;
