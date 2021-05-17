import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../../../../src/AuthContext';

const row = ['My Orders', 'Refer', 'Help', 'Logout'];
const icon = ['history', 'share-outline', 'face-agent', 'logout'];

export default function Index(props) {
  const [state, setState] = React.useState({
    userId: '',
    name: '',
    phonenumber: '',
  });
  const {signOut} = React.useContext(AuthContext);

  React.useEffect(() => {
    async function decoded() {
      try {
        let token = await AsyncStorage.getItem('token');
        let decoded = jwt_decode(token);
        setState({
          userId: decoded.user._id,
          name: decoded.user.username,
          phonenumber: decoded.user.phonenumber,
        });
        return;
      } catch (e) {
        console.log(e);
      }
    }
    decoded();
  }, []);

  const onRouteHandler = (index) => {
    if (index === 0) {
      return; //props.navigation.navigate('Map');
    } else if (index === 3) {
      return Alert.alert('you want to logout?', '', [
        {text: 'Cancel'},
        {text: 'YES', onPress: () => signOut()},
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftSideHeader}>
          <Text style={styles.name}>{state.name}</Text>
          <Text style={styles.phonenumber}>{state.phonenumber}</Text>
        </View>
        <MaterialCommunityIcons
          name="account-circle"
          size={50}
          color={'#0090D6'}
        />
      </View>
      <View style={styles.row}>
        {row.map((e, index) => (
          <TouchableOpacity
            style={styles.list}
            activeOpacity={0.6}
            key={index}
            onPress={() => onRouteHandler(index)}>
            <View style={styles.leftSideList}>
              <MaterialCommunityIcons
                name={icon[index]}
                size={20}
                color={'#e91e63'}
                style={styles.icon}
              />
              <Text style={styles.listName}>{e}</Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={18}
              color={'#999'}
            />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  header: {
    flex: 0.15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#4f4f4f',
  },
  leftSideHeader: {
    width: '60%',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D2D2D',
  },
  row: {
    justifyContent: 'space-between',
    flex: 0.5,
    marginTop: 30,
  },
  list: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
  },
  leftSideList: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '40%',
  },
  listName: {
    fontSize: 16,
    color: '#4f4f4f',
    paddingLeft: 10,
  },
  icon: {
    padding: 5,
    borderRadius: 50,
    backgroundColor: '#f5f5f5',
  },
});
