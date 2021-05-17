import React from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, TextInput, ActivityIndicator, SafeAreaView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import jwt_decode from 'jwt-decode';

const placeOptions = ['Home', 'Office', 'Other'];

const Address = (props) => {

    const [userAddress, setUserAddress] = React.useState({
        title: '',
        address: '',
        location: props.route.params.address,

    })
    const [data, setData] = React.useState([]);
    const [textInputLine, setTextInputLine] = React.useState(false);
    const [buttonRelease, setButtonRelease] = React.useState(true);
    const [UserChoseOne, setUserChoseOne] = React.useState(true)


    React.useEffect(() => {

        const getSavedAddress = async () => {
            try {
                let token = await AsyncStorage.getItem('token');
                let decoded = jwt_decode(token);
                const instance = {
                    url: 'https://arukil.herokuapp.com/api/users/saveAddress/read',
                    timeout: 1500,
                    method: 'GET',
                    headers: {
                        'authorization': 'Bearer ' + token,
                        'Accept': "application/json",
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    data: {
                        userId: decoded.user._id
                    }
                };
                let response = await axios(instance);
                let res = response.data;
                console.log(res)
                res ? setData([]) : null;
                return;

            }
            catch (e) {
                console.log(e)
            }
        }

        getSavedAddress();

    }, [])

    React.useEffect(() => {
        userAddress.address && userAddress.title ? setButtonRelease(false) : setButtonRelease(true)
    }, [userAddress])

    React.useEffect(() => {
        UserChoseOne ? setUserAddress({ ...userAddress, title: '' }) : null;
    }, [UserChoseOne])


    const Update_address_Handler = async () => {

        let check = data.find(({ title }) => title === userAddress.title);
        if (check) {
            setUserAddress({ ...userAddress, title: '' });
            alert(`you have already ${userAddress.title} address`);
            return;
        }
        else {
            try {
                let token = await AsyncStorage.getItem('token');
                let decoded = jwt_decode(token);
                const instance = axios.create({
                    baseURL: 'https://arukil.herokuapp.com/api/users',
                    timeout: 1000,
                    headers: {
                        'authorization': 'Bearer ' + token,
                        'Accept': "application/json",
                        "Content-Type": "application/json"
                    },
                    body: {
                        userId: decoded.user._id,
                        address: userAddress
                    }
                });
                instance.post('/saveAddress')
                    .then(response => {
                        console.log(response)
                        return;
                    })
                    .catch(err => console.log(err));
            }
            catch (e) {
                console.log(e)
            }
        }

    }

    const _setPlaceHandler = (place) => {

        if (data.length !== 0 && place !== placeOptions[2]) {
            let check = data.find(({ title }) => title === place);
            return check ?
                alert(`you have already ${place} address`) : setUserAddress({ ...userAddress, title: place });
        }
        else if (data.length === 0 && place !== placeOptions[2]) {
            return setUserAddress({ ...userAddress, title: place });
        }
        else {
            setUserAddress({ ...userAddress, title: '' });
            return setUserChoseOne(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                <View style={styles.header}>
                    <Text style={styles.title}>Enter address details</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => props.navigation.pop()}>
                        <MaterialCommunityIcons name='close' color={'#4f4f4f'} size={25} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.addressContainer} activeOpacity={0.7} onPress={() => props.navigation.navigate('GetLocation')}>
                    <Text numberOfLines={1} style={styles.addressContent}>
                        <MaterialCommunityIcons name='checkbox-marked-circle-outline' size={16} color={'#0090D6'} />{' ' + props.route.params.address.formatted_address}</Text>
                    <Text style={{ color: '#e91e63' }}>CHANGE</Text>
                </TouchableOpacity>

                <View style={styles.TextInputContainer}>
                    <Text style={{ color: '#999' }}>Complete Address<Text style={{ color: 'red' }}>*</Text></Text>
                    <TextInput autoFocus style={[styles.TextInput, { borderBottomColor: textInputLine ? '#e91e63' : '#999' }]} value={userAddress.address} onChangeText={(place) => setUserAddress({ ...userAddress, address: place })}
                        placeholder={'House no. / Flat no. / Floor / Building'} onFocus={() => setTextInputLine(true)} onBlur={() => setTextInputLine(false)} />
                </View>

                {UserChoseOne ?
                    <View style={styles.savedAddressTitleContainer}>
                        {
                            placeOptions.map((place) =>
                                <TouchableOpacity activeOpacity={0.9} onPress={() => _setPlaceHandler(place)} style={[styles.savedAddressTitle, { borderBottomColor: place === userAddress.title ? '#e91e63' : '#999' }]}>
                                    <Text style={{ color: place === userAddress.title ? '#4f4f4f' : '#999', fontSize: 14 }}>{place}</Text>
                                </TouchableOpacity>
                            )}
                    </View>
                    :
                    <View style={styles.otherTitleContainer}>
                        <TextInput autoFocus onChangeText={(place) => setUserAddress({ ...userAddress, title: place })}
                            placeholder={"eg..: surya's Home , Dad's place"} />
                        <TouchableOpacity activeOpacity={0.8} onPress={() => setUserChoseOne(true)}>
                            <Text style={{ color: '#e91e63', fontSize: 12 }}>{' '}CANCEL</Text>
                        </TouchableOpacity>
                    </View>
                }
                <TouchableOpacity style={[styles.button, { backgroundColor: userAddress.address && userAddress.title ? '#ee5488' : '#f59bba' }]}
                    disabled={buttonRelease} activeOpacity={0.9} onPress={() => Update_address_Handler()}>
                    <Text style={styles.buttonText}>Save location</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView >

    )
}



const mapDispatchToProps = (dispatch) => {
    return {
        GET_LOCATION: (data) => {
            dispatch({ type: 'GET_LOCATION', data })
        }
    };
}

export default connect(null, mapDispatchToProps)(Address);


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        paddingHorizontal: 10,
        paddingVertical: 40,
    },
    body: {
        flex: 0.55,
        justifyContent: 'space-between'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 18,
        color: '#4f4f4f',
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: '#ddd',
        height: 60,
    },
    addressContent: {
        fontSize: 16,
        color: "#4f4f4f",
        width: '75%',
    },
    savedAddressTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    TextInputContainer: {
        height: 60,
        justifyContent: 'space-between',
    },
    TextInput: {
        borderBottomWidth: 1.5
    },
    otherTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1.5,
        borderColor: '#e91e63'
    },
    savedAddressTitle: {
        padding: 8,
        borderBottomWidth: 1.2,
        borderColor: '#999',
    },
    button: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
    },

})
//ee5488

