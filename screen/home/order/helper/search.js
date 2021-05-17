import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity ,SafeAreaView} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux'


function Search(props) {

    const [textInput, setTextInput] = React.useState('');

    

    return (
        <SafeAreaView style={styles.container}>   
          <View style={styles.search} activeOpacity={0.7}>
                <MaterialCommunityIcons name='magnify' size={20} style={styles.searchIcon} />
                <TextInput placeholder='search for your loctaion...' style={styles.InputField}
                    onChangeText={(text) => setTextInput(text)}
                    value={textInput}
                />
                {textInput.length > 0 ?
                    <TouchableOpacity activeOpacity={0.7} onPress={() => setTextInput('')}>
                        <MaterialCommunityIcons name='close' size={20} style={styles.searchIcon} />
                    </TouchableOpacity>
                    : null}
            </View>
            <View style={styles.body}>

            </View>
        </SafeAreaView>
    )
}


export default connect()(Search);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        paddingHorizontal:10
     },
    search: {
        borderBottomWidth: 0.35,
        borderColor: '#999',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    searchIcon: {
        color: '#000',
        padding:10,
    },
    InputField: {
        width: '75%',
    },
    body: {
        flex: 1,
    },
    suggestions: {
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
    },

})





