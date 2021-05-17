import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Counter from "./addbutton/components/counter";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux'

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

function CartAddBtn(props) {

    const [item] = React.useState(props.data);

    const selecterHandler = async (item, val, index) => {

        if (index >= 0) {
            var obj = props.bucket[index];
            if (val === 0) {
                props.REMOVE_FROM_BUCKET(index)
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
                return;
            }
            else {
                obj = {
                    ...obj,
                    quantity: val,
                    totalPrice: obj.price * val,
                    netWeight: obj.calculate * val
                }
                props.UPDATE_TO_BUCKET({ obj, index, INCREMENT });
                return;
            }
        }
        else {
            const insertToBucket = await {
                name: item.name,
                flavour: item.flavour,
                image: item.image,
                quantity: val,
                price: item.available[0].price,
                weight: item.available[0].weight,
                netWeight: item.available[0].calculate,
                totalPrice: item.available[0].price,
                type: item.type,
                calculate: item.available[0].calculate
            }
            props.ADD_TO_BUCKET(insertToBucket);
            return;
        }
    }

    const button = () => {
        const index = props.bucket.findIndex(({ image }) => image === item.image);
        if (index >= 0) {
            return (
                <Counter
                    min={0}
                    onChange={(val) => selecterHandler(item, val, index)}
                    start={props.bucket[index].quantity}
                    max={5}
                />
            )
        }
        else {
            return (
                <TouchableOpacity style={styles.button} activeOpacity={1} onPress={() => selecterHandler(item, 1, index)}>
                    <Text style={{ fontSize: 10, color: '#e91e63', fontWeight: 'bold' }}>ADD</Text>
                    <MaterialCommunityIcons name='plus' color={'#e91e63'} size={12} />
                </TouchableOpacity>
            )
        }
    }


    return button();
}


const mapStateToProps = state => {
    return {
        bucket: state.bucket.item,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ADD_TO_BUCKET: (data) => {
            dispatch({ type: 'ADD_TO_BUCKET', data })
        },
        UPDATE_TO_BUCKET: (data) => {
            dispatch({ type: 'UPDATE_TO_BUCKET', data })
        },
        REMOVE_FROM_BUCKET: (data) => {
            dispatch({ type: 'REMOVE_FROM_BUCKET', data })
        },
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(CartAddBtn)


const styles = StyleSheet.create({
    btnContainer: {
        alignItems: 'center',
    },
    button: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        width: 85,
        height: 32,
        borderWidth: 1,
        borderTopWidth: 0.9,
        borderRadius: 5,
        borderColor: '#ddd',
        backgroundColor: '#ffffff',

    },

})

