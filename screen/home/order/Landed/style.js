import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    location: {
        width: '340%',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft:-8,
    },
    locationTextContainer: {
        flexDirection: 'column',
        borderColor:'#ddd'
    },
    primaryLocationText: {
        fontWeight: '700',
        color:'#4f4f4f',
    },
    SecondaryLocationText: {
        color: '#999',
        fontSize: 12,
        paddingBottom:5,
    },
    changeLocation: {
        padding: 5,
    },
    body: {
        flex: 1,
        paddingHorizontal:10
    },

})


export default styles;