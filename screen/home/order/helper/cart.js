import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

function AddCartContainer(props) {

    return (
        props.bucket.length > 0 ?
            <TouchableOpacity style={styles.cart} animation={'fadeInUp'} activeOpacity={0.9}
                onPress={() => props.navigation.navigate('Cart')} >
                <Text style={{ color: '#fff', fontWeight: '700' }}>{props.bucket.length} item |
                    <MaterialCommunityIcons name='currency-inr' size={15} color={'#fff'} />{props.tpw.totalPrice + ' | ' + props.tpw.totalWeight + ' Kg'}
                </Text>
                <View style={styles.rightcart} >
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>View Cart </Text>
                    <MaterialCommunityIcons name='chevron-right' size={20} color={'#fff'} />
                </View>
            </TouchableOpacity>
            :
            null
    )
}

const mapStateToProps = state => {
    return {
        bucket: state.bucket.item,
        tpw: state.bucket.tpw
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        ADD_TO_BUCKET: (data) => {
            dispatch({ type: 'ADD_TO_BUCKET', data })
        },
        BUCKET_RESET: () => {
            dispatch({ type: 'BUCKET_RESET' })
        },


    };
}


const renderOrNot = (preProps, nextProps) => {
    return preProps.tpw.totalWeight === nextProps.tpw.totalWeight
        && preProps.tpw.totalPrice === nextProps.tpw.totalPrice;
}


export default connect(mapStateToProps, mapDispatchToProps)(React.memo(AddCartContainer, renderOrNot))

const styles = StyleSheet.create({
    cart: {
        paddingHorizontal: 5,
        paddingVertical: 15,
        backgroundColor: '#009c02',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rightcart: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
})
