import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    loader: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        justifyContent: 'center'
    },
    header: {
        height: 55,
        paddingVertical:10,
        paddingHorizontal: 10,
    },
    productListTitle: {
        width: 120,
        height: 35,
        borderWidth: 0.7,
        borderColor: '#ddd',
        backgroundColor: 'silver',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    productListTitleText: {
        fontSize: 10,
    },
    listView: {
        width: '100%',
        height: 120,
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
        width: '40%',
        height: '75%',
        borderRadius: 5,
        aspectRatio: 1,

    },
    listname: {
        width: '90%',
        fontSize: 15,
        color: '#4f4f4f',
    },
    overlayBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '70%',
        padding: 4,
        borderWidth: 0.25,
        borderRadius: 5,
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
});


export default styles;