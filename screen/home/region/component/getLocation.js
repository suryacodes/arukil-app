import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GoogleApiKey } from '../../../config';
import Geocoder from 'react-native-geocoding';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux'


function Location(props) {

    const [address, setAddress] = React.useState('');
    const [predictions, setPredictions] = React.useState([]);


    const suggestion = async (address) => {

        const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GoogleApiKey}
        &input=${address}&location=${props.userLocation.geometry.location.lat},${props.userLocation.geometry.location.lng}&radius=5000`;
        try {
            const result = await fetch(apiUrl);
            const json = await result.json();
            setPredictions(json.predictions);
            return;
        }
        catch (err) {
            console.error(err);
        }
    }

    const geocoder = async (params) => {
        console.log(params)
        await Geocoder.init(GoogleApiKey)
        await Geocoder.from(params).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                const latlng = {
                    latitude: lat,
                    longitude: lng
                }
                props.navigation.navigate('Map', { location: latlng })
                return;
            },
            error => { console.error(error); }
        );
    }




    React.useEffect(() => {
        address.length >= 3 ? suggestion(address) : null;
    }, [address])


    const prediction = predictions.map(prediction =>
        <TouchableOpacity activeOpacity={0.7} onPress={() => geocoder(prediction.description)}
            style={styles.suggestions} key={prediction.place_id}>
            <MaterialCommunityIcons name="map-marker" size={20} color="#999" />
            <View style={styles.predictionsContent}>
                <Text style={styles.predictionMainText} numberOfLines={1}>
                    {prediction.structured_formatting.main_text}</Text>
                {prediction.structured_formatting.secondary_text != null ?
                    <Text style={styles.predictionSecondaryText} numberOfLines={1}>
                        {prediction.structured_formatting.secondary_text}</Text>
                    : null}
            </View>
        </TouchableOpacity>
    );

    return (

        <View style={styles.container}>

            <View style={styles.search} activeOpacity={0.7}>
                <MaterialCommunityIcons name='magnify' size={20} style={styles.searchIcon} />
                <TextInput placeholder='search for your loctaion...' style={styles.InputField}
                    onChangeText={(text) => setAddress(text)}
                    value={address}
                    autoFocus
                />
                {address.length > 0 ?
                    <TouchableOpacity activeOpacity={0.7} onPress={() => setAddress('')}>
                        <MaterialCommunityIcons name='close' size={20} style={styles.searchIcon} />
                    </TouchableOpacity>
                    : null}
            </View>
            <View style={styles.body}>
                <TouchableOpacity style={styles.currentLocation} activeOpacity={0.7} onPress={() => props.navigation.navigate('Map', { location: { latitude: 0, longitude: 0 } })}>
                    <MaterialCommunityIcons name='crosshairs-gps' size={20} color='#e91e63' />
                    <Text style={styles.currentLocationText}>use current Location</Text>
                </TouchableOpacity>
                {address.length >= 3 ? prediction :
                    <View style={styles.savedLocation}>

                    </View>
                }
            </View>
        </View>


    )
}


const mapStateToProps = (state) => {
    return {
        userLocation: state.locationReducer.location
    }
}


export default connect(mapStateToProps)(Location);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        paddingHorizontal: 10,
    },
    search: {
        borderWidth: 0.35,
        borderColor: '#999',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 5,
    },
    searchIcon: {
        color: '#999',
    },
    InputField: {
        width: '80%',
    },
    body: {
        flex: 1,
    },
    suggestions: {
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    predictionsContent: {
        padding: 15,
    },
    predictionSecondaryText: {
        color: '#999',
        marginTop: 2
    },
    currentLocation: {
        flexDirection: 'row',
        width: '60%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    currentLocationText: {
        color: '#e91e63',
        padding: 10,
        fontSize: 18,
    },
    savedLocation: {

    }
})











