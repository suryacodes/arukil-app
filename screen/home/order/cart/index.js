import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Counter from "../helper/addbutton/components/counter";
import RazorpayCheckout from 'react-native-razorpay';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage'

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

function Index(props) {
    const [isLoading, setIsLoading] = React.useState(false);

    const [state, setState] = React.useState({
        userId: '',
        name: '',
        phonenumber: '',
    })

    async function decoded() {
        try {
            let token = await AsyncStorage.getItem('token');
            let decoded = jwt_decode(token);
            setState({
                userId: decoded.user._id,
                name: decoded.user.username,
                phonenumber: decoded.user.phonenumber
            })
            return;
        }
        catch (e) {
            console.log(e)
        }
    }

    const selecterHandler = async (item, val, index) => {

        setIsLoading(false);
        let obj = props.bucket[index]
        if (val === 0) {
            props.REMOVE_FROM_BUCKET(index);
            setIsLoading(true);
            return;
        }
        else if (val < obj.quantity) {
            obj = {
                ...obj,
                quantity: val,
                totalPrice: obj.price * val,
                netWeight: obj.calculate * val
            }
            props.UPDATE_TO_BUCKET({ obj, index, DECREMENT });
            setIsLoading(true);
            return;
        }
        else {
            obj = {
                ...obj,
                quantity: val,
                totalPrice: obj.price * val,
                netWeight: item.calculate * val
            }
            props.UPDATE_TO_BUCKET({ obj, index, INCREMENT });
            setIsLoading(true);
            return;
        }
    }


    const funCallBack = React.useCallback(
        () => {
            var grocery = [], vegetable = [], fruit = [];
            for (let index = 0; index < props.bucket.length; index++) {
                if (props.bucket[index].type === 'GROCERY') { grocery.push(props.bucket[index]) }
                else if (props.bucket[index].type === 'VEGETABLE') { vegetable.push(props.bucket[index]) }
                else { fruit.push(props.bucket[index]) }
            }
            grocery = [...grocery, ...vegetable, ...fruit]
            props.IN_ORDER_BUCKET(grocery);
            decoded();
            return setIsLoading(true);
        }, [])

    React.useEffect(() => {
        funCallBack();
    }, [])


    const paymentHandler = () => {
        if (props.tpw.totalPrice < 99) {
            return alert('please order minimum 99 rs.');
        }
        else {
            var options = {
                description: '',
                image: 'https://arukil.s3.ap-south-1.amazonaws.com/offercard/arukil.png',
                currency: 'INR',
                key: 'rzp_test_24eqy0wZagxwur',
                amount: props.tpw.totalPrice * 100,
                name: 'Arukil',
                prefill: {
                    contact: state.phonenumber,
                    name: state.name
                },
                theme: { color: '#ee5488' }
            }
            RazorpayCheckout.open(options).then((data) => {
                alert(`Success: ${data.razorpay_payment_id}`);
            }).catch((error) => {
                alert('your payment is failed');
            });
        }
    }

    const renderItem = ({ item, index }) => {
        const { name, image, flavour, weight, totalPrice, quantity, type } = item;
        return (
            <View style={styles.listView}>
                <Image source={{ uri: image }} resizeMode='contain' style={styles.image} />
                <View style={styles.listContent}>
                    {!flavour ?
                        <Text style={styles.listname} numberOfLines={2}>{name}{' ('}{weight + ')'}</Text>
                        :
                        <Text style={{ color: '#4f4f4f' }} numberOfLines={1}>{flavour}{' ('}{weight + ')'}</Text>
                    }
                    <View style={styles.subdiv}>
                        <Counter
                            start={quantity}
                            onChange={(val) => selecterHandler(item, val, index)}
                            max={5}
                            min={0}
                        />
                        <Text style={styles.price}>
                            <MaterialCommunityIcons name='currency-inr' size={15} color={'#000'} />
                            {totalPrice}
                        </Text>
                    </View>
                </View>
            </View>
        )
    };

    React.useEffect(() => {
        props.bucket.length == 0 ? props.navigation.navigate('Index') : null;
    }, [props.bucket])

    return (
        isLoading ?
            <View style={styles.container}>
                <View style={styles.body}>
                    <FlatList
                        data={props.bucket}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        initialNumToRender={4}
                        maxToRenderPerBatch={3}
                        removeClippedSubviews={false}
                        showsVerticalScrollIndicator={false}
                        key={props.bucket.length}
                    />
                </View>

                <View style={styles.footer}>
                    <View style={styles.location}>
                        <View style={{ width: '95%' }}>
                            <Text style={{ color: '#4f4f4f', fontWeight: '700', fontSize: 14 }}>
                                <MaterialCommunityIcons name='checkbox-marked-circle' size={15} color={'green'} />Delivery Address</Text>
                            <Text numberOfLines={1} style={{ fontSize: 12, color: '#4f4f4f' }} >{props.location.formatted_address}</Text>
                        </View>
                        {/* <TouchableOpacity style={{ padding: 5 }} activeOpacity={0.7} onPress={() => props.navigation.navigate('GetLocation')}>
                            <Text style={{ color: '#E91E63', textDecorationLine: 'underline' }}  >Change</Text>
                        </TouchableOpacity> */}
                    </View>
                    <TouchableOpacity style={styles.paybtn} activeOpacity={0.9}
                        onPress={() => paymentHandler()}    >
                        <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }} >
                            <Text>Pay</Text>
                            <MaterialCommunityIcons name='currency-inr' size={15} color={'#fff'} />
                            <Text>{props.tpw.totalPrice}</Text>
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
            : <View style={styles.loader}>
                <ActivityIndicator size="large" color="#e91e63" />
            </View>
    )
}

const mapStateToProps = (state) => {
    return {
        location: state.locationReducer.location,
        bucket: state.bucket.item,
        tpw: state.bucket.tpw
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        CURRENT_LOCATION: (data) => {
            dispatch({ type: 'CURRENT_LOCATION', data })
        },
        ADD_TO_BUCKET: (data) => {
            dispatch({ type: 'ADD_TO_BUCKET', data })
        },
        UPDATE_TO_BUCKET: (data) => {
            dispatch({ type: 'UPDATE_TO_BUCKET', data })
        },
        REMOVE_FROM_BUCKET: (data) => {
            dispatch({ type: 'REMOVE_FROM_BUCKET', data })
        },
        IN_ORDER_BUCKET: (data) => {
            dispatch({ type: 'IN_ORDER_BUCKET', data })
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Index)

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
    footer: {
        flex: 0.22,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
        justifyContent: 'space-between',
        borderTopWidth: 2,
        borderColor: '#f5f5f5'
    },
    location: {
        height: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#f5f5f5',
        borderBottomWidth: 1,
    },
    paybtn: {
        backgroundColor: '#009c02',
        padding: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5
    },
    body: {
        flex: 1
    },
    listView: {
        width: '100%',
        height: 110,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderBottomWidth: 0.2,
        borderColor: '#ddd',
    },
    listContent: {
        width: '65%',
        height: '80%',
        justifyContent: 'space-around',
    },
    image: {
        width: '25%',
        height: '55%',
        borderRadius: 5,
        aspectRatio: 1
    },
    listname: {
        width: '90%',
        fontSize: 14,
        fontWeight: '600',
        color: '#4f4f4f'
    },
    subdiv: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    price: {
        fontSize: 15,
        fontWeight: '700',
        color: '#5e5b54'
    },
})
