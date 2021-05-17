import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import Signin from './component/signin';
import Phonenumber from './component/phonenumber';
import Verify from './component/verify';
const Stack = createStackNavigator();

function StackNavigator() {
    return (

            <Stack.Navigator screenOptions={{
                headerShown: true,
    
            }}>

                <Stack.Screen name='Signin' component={Signin} options={{
                    title: false,
                    headerShown: false
                }}
                />

                <Stack.Screen name='Phonenumber' component={Phonenumber} options={{
                    title: false,
                    headerShown: true,
                    headerStyle:{
                        borderWidth:0,
                        elevation:0,
                        backgroundColor:'#fcfcfc'
                    }
                    
                }}
                />
                 <Stack.Screen name='Verify' component={Verify} options={{
                    title: false,
                    headerShown: true,
                    headerStyle:{
                        borderWidth:0,
                        elevation:0
                    }
                    
                }}
                />


            </Stack.Navigator>
    )
};



export default StackNavigator;






