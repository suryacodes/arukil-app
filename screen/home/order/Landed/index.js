import React from 'react'
import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style';
import { connect } from 'react-redux'
import Grocery from '../grocery/component/index';
import { Header } from 'react-native-elements'
import Cart from '../helper/cart';
import AsyncStorage from '@react-native-community/async-storage';
const Index = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header
                containerStyle={{
                    backgroundColor: '#ffffff',
                    justifyContent: 'space-between',
                    borderBottomWidth: 1,
                }}
                leftComponent={
                    <View activeOpacity={0.7} style={styles.location}>
                        <MaterialCommunityIcons name='map-marker' color={'#e91e63'} size={30} />
                        <View style={styles.locationTextContainer}>
                            {
                                Object.keys(props.location).length > 0 ?
                                    <>
                                        <Text style={styles.primaryLocationText} numberOfLines={1}>{props.location.address_components[0].short_name}</Text>
                                        <Text style={styles.SecondaryLocationText} numberOfLines={1}>{props.location.formatted_address}</Text>
                                    </>
                                    : <Text style={{ fontSize: 18, color: '#4f4f4f' }}>Loading...</Text>
                            }
                        </View>
                    </View>
                }
                rightComponent={
                    <TouchableOpacity activeOpacity={1} style={styles.changeLocation} onPress={() => props.navigation.navigate('GetLocation')}>
                        <Text style={{ color: '#e91e63', fontSize: 15, textDecorationLine: 'underline', }}>Change</Text>
                    </TouchableOpacity>}
            />

            <View style={styles.body}>
                <Grocery navigation={props.navigation} />
            </View>
            <Cart navigation={props.navigation} />
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => {
    return {
        location: state.locationReducer.location,
    }
}


export default connect(mapStateToProps, null)(Index);


















// import React from 'react'
// import { Text, View, TouchableOpacity, SafeAreaView, PermissionsAndroid, ScrollView } from 'react-native'
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { GoogleApiKey } from '../../../config';
// import Geolocation from 'react-native-geolocation-service';
// import Geocoder from 'react-native-geocoding';
// import styles from './style';
// import { connect } from 'react-redux'
// import Grocery from '../grocery/component/index';
// import { Header } from 'react-native-elements'
// import Cart from '../helper/cart';


// const Index = (props) => {

//     React.useEffect(() => {
//         Object.keys(props.location).length > 0 && Object.keys(props.userLocation).length === 0 ?
//             props.USER_CURRENT_LOCATION(props.location) : null;
//     }, [props.location]);


//     const geocoder = async (latitude, longitude) => {
//         await Geocoder.init(GoogleApiKey)
//         await Geocoder.from(latitude, longitude)
//             .then(json => {
//                 var addressComponent = json.results[0];
//                 props.GET_LOCATION(addressComponent)
//                 return;
//             })
//             .catch(error => console.log(error));
//     }

//     React.useEffect(() => {

//         const _getLocation = async () => {

//             const chckLocationPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
//             if (chckLocationPermission) {
//                 await Geolocation.getCurrentPosition(pos => { return geocoder(pos.coords.latitude, pos.coords.longitude) },
//                     err => { alert("Fetching the Position failed, please check location is enable!"); },
//                     { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 }
//                 );
//             }
//             else {
//                 const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
//                 if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//                     return getLocation();
//                 } else {
//                     alert("You don't have access for the location");
//                 }
//             }
//         }
//         _getLocation();

//     }, []);


//     return (
//         <SafeAreaView style={styles.container}>
//             <Header
//                 containerStyle={{
//                     backgroundColor: '#ffffff',
//                     justifyContent: 'space-between',
//                     borderBottomWidth: 1,
//                 }}

//                 leftComponent={
//                     <View activeOpacity={0.7} style={styles.location}>
//                         <MaterialCommunityIcons name='map-marker' color={'#e91e63'} size={30} />
//                         <View style={styles.locationTextContainer}>
//                             {
//                                 Object.keys(props.location).length > 0 ?
//                                     <>
//                                         <Text style={styles.primaryLocationText} numberOfLines={1}>{props.location.address_components[0].short_name}</Text>
//                                         <Text style={styles.SecondaryLocationText} numberOfLines={1}>{props.location.formatted_address}</Text>
//                                     </>
//                                     : <Text style={{ fontSize: 18, color: '#4f4f4f' }}>Loading...</Text>
//                             }
//                         </View>
//                     </View>
//                 }
//                 rightComponent={
//                     <TouchableOpacity activeOpacity={1} style={styles.changeLocation} onPress={() => props.navigation.navigate('GetLocation')}>
//                         <Text style={{ color: '#e91e63', fontSize: 15, textDecorationLine: 'underline', }}>Change</Text>
//                     </TouchableOpacity>}
//             />

//             <View style={styles.body}>
//                 <Grocery navigation={props.navigation} />
//             </View>
//             <Cart navigation={props.navigation} />
//         </SafeAreaView>
//     )
// }

// const mapStateToProps = (state) => {
//     return {
//         location: state.locationReducer.location,
//         userLocation: state.userLocationReducer.userLocation
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         GET_LOCATION: (data) => {
//             dispatch({ type: 'GET_LOCATION', data })
//         },
//         USER_CURRENT_LOCATION: (data) => {
//             dispatch({ type: 'USER_CURRENT_LOCATION', data })
//         }
//     };
// }


// export default connect(mapStateToProps, mapDispatchToProps)(Index);





