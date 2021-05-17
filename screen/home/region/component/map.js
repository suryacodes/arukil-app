import React from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, TextInput, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { GoogleApiKey } from '../../../config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from 'react-native-geolocation-service';
import { connect } from 'react-redux';

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / (height / 2);
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


const Map = (props) => {
    let map = null;

    const [initialregion, setInitialRegion] = React.useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    })

    const [address, setAddress] = React.useState({});

    const geocoder = async (latitude, longitude) => {

        await Geocoder.init(GoogleApiKey)
        await Geocoder.from(latitude, longitude)
            .then(json => {
                var addressComponent = json.results[0];
                setAddress(addressComponent)
                return;
            })
            .catch(error => console.log(error));
    }


    const gotToMyLocation = () => {

        Geolocation.getCurrentPosition(pos => {
            if (map) {
                return map.animateToRegion({
                    latitude: pos.coords.latitude, longitude: pos.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA
                })
            }
            else {
                return setInitialRegion({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                })

            }
        },
            err => {
                alert("Fetching the Position failed, please check location is enable!");
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 }
        );

    }

    const _UpdateLocationHandler = () => {
        if (Object.keys(address).length > 0) {
            props.GET_LOCATION(address);
            return props.navigation.navigate('Index');
        }
        else {
            return alert('Please wait for fetching Location')
        }
    }

    React.useEffect(() => {
        props.route.params.location.latitude === 0 ? gotToMyLocation() :
            setInitialRegion({
                latitude: props.route.params.location.latitude,
                longitude: props.route.params.location.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            })
    }, [])

    return (
        initialregion.latitude > 0 && initialregion.longitude > 0 ?
            <View style={styles.container}>
                <View style={{ flex: 0.72 }}>
                    <MapView style={{ flex: 1 }}
                        provider={PROVIDER_GOOGLE}
                        ref={(val) => { map = val; }}
                        initialRegion={initialregion}
                        showsMyLocationButton={false}
                        loadingEnabled={true}
                        showsUserLocation={true}
                        showsCompass={false}
                        onRegionChangeComplete={(marker) => geocoder(marker.latitude, marker.longitude)}
                    >
                    </MapView>

                    <View style={styles.markerFixed}>
                        <Image source={{ uri: 'https://arukil.s3.ap-south-1.amazonaws.com/helper/mapmarker.png' }} style={styles.marker} />
                    </View>

                    <TouchableOpacity style={styles.locationButton} activeOpacity={0.7} onPress={() => gotToMyLocation()}>
                        <MaterialCommunityIcons name='crosshairs-gps' size={20} color={'4f4f4f'} style={styles.locationButtonIcon} />
                    </TouchableOpacity>

                </View>
                <View style={styles.footer}>
                    <Text style={styles.title}>Select delivery loaction</Text>
                    <TouchableOpacity style={styles.address} activeOpacity={0.7} onPress={() => props.navigation.navigate('GetLocation')}>
                        {address.formatted_address ?
                            <Text numberOfLines={1} style={styles.addressContent}>
                                <MaterialCommunityIcons name='checkbox-marked-circle-outline' size={15} color={'#0090D6'} />{'  ' + address.formatted_address} </Text>
                            : <Text numberOfLines={1} style={styles.addressContent}>Loading...</Text>
                        }
                        <Text style={{ color: '#e91e63' }}>CHANGE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={() => _UpdateLocationHandler()}>
                        <Text style={styles.buttonText}>Confirm location{' & '}Proceed</Text>
                    </TouchableOpacity>

                </View>
            </View>
            :
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#e91e63" />
            </View>

    )
}



const mapDispatchToProps = (dispatch) => {
    return {
        GET_LOCATION: (data) => {
            dispatch({ type: 'GET_LOCATION', data })
        },
    };
}

export default connect(null, mapDispatchToProps)(Map)



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fcfcfc'
    },
    loader: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        justifyContent: 'center'
    },
    proceedContainer: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    addressRows: {
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'space-between',
    },
    addressOptions: {
        padding: 8,
        borderWidth: 0.5,
        borderColor: '#999',
        borderRadius: 20,
    },
    addressTextInput: {
        borderBottomWidth: 0.5,
    },
    TextInputArea: {
        height: 80,
        backgroundColor: 'red'
    },
    body: {
        flex: 0.5,
        justifyContent: 'space-between'

    },
    footer: {
        flex: 0.28,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        paddingVertical: 10,
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 18,
        color: '#4f4f4f',
    },
    address: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: '#ddd',
        height: 60,
    },
    addressContent: {
        fontSize: 15,
        color: "#4f4f4f",
        width: '75%',
    },
    locationButton: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: "#fff",
        bottom: '10%',
        right: 20,
        borderRadius: 10,
        elevation: 15,

    },
    locationButtonIcon: {
        padding: 10,
        color: "#4f4f4f"
    },
    button: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#ee5488',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
    },
    markerFixed: {
        left: '50%',
        marginLeft: -20,
        marginTop: -36,
        position: 'absolute',
        top: '50%'
    },
    marker: {
        height: 40,
        width: 40
    },
    backButton: {
        position: 'absolute', top: 5, padding: 10
    }
})
