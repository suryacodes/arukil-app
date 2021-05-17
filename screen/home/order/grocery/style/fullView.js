import { StyleSheet, Dimensions } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'space-between',
    },
    body: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#fff',
        justifyContent: 'space-around'
    },
    image: {
        flex: 0.5,
    },
    content: {
        flex: 0.18,
        justifyContent: 'space-between',
    },
    name: {
        width: '90%',
        fontSize: 16,
        color: '#4f4f4f',
        fontWeight: '700'
    },
    flavour: {
        width: '90%',
        fontSize: 16,
        color: '#4f4f4f',
        fontWeight: '700'
    },
    subdiv: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#5e5b54'
    },
})

export default styles;