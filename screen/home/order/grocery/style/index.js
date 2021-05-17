import { StyleSheet ,Dimensions } from 'react-native';


const SCREEN_WIDTH = (Dimensions.get('window').width - 20) / 3.5;
const SCREEN_HEIGHT = (Dimensions.get('window').height / 5.8);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    notify: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        width: '74%',
    },
    sliderContainer: {
        width: '100%',
        height: 148,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 5,
    },
    sliderImage: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 5,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    title: {
        marginTop: 8,
        padding: 10,
    },
    primaryTitle: {
        color: '#4f4f4f',
        fontSize: 17,
        fontWeight: '700'
    },
    secondaryTitle: {
        color: '#999',
        fontSize: 12
    },
    body: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'space-around',
        backgroundColor: '#fafdff',
        borderColor: '#d4f5ff',
        alignItems: 'center',
        borderWidth: 0.4,
        marginTop: 10,
        borderRadius: 5,
    },
    image: {
        height: '60%',
        aspectRatio: 1
    },
    name: {
        fontSize: 12,
        textAlign: 'center',
        color: '#646769',
        fontWeight: '700'
    },

});

export default styles;
