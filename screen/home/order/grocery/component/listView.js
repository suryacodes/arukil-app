import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import Cart from '../../helper/cart';
import CartBtn from '../../helper/cartbtn';
import styles from '../style/listView';
import {connect} from 'react-redux';

const selectedColor = '#fff';
const unSelectedColor = '#757575';

function ListView(props) {
  const [state, setState] = React.useState({
    isLoading: true,
    list: [],
    selectedProduct: {},
  });

  const innerFunction = React.useCallback(async () => {
    var obj = {};
    const localData = await props.grocery.find(
      ({name}) => name === props.route.params.item.name,
    );
    if (localData) {
      return setState({
        isLoading: false,
        list: localData.res,
        selectedProduct: localData.res[0].list ? localData.res[0] : {},
      });
    } else {
      await axios
        .get(
          `http://192.168.43.194:4000/api/products/${props.route.params.item.name}`,
        )
        .then((response) => {
          const res = response.data.data;
          Object.assign(obj, {name: props.route.params.item.name}, {res: res});
          props.ADD_GROCERY(obj);

          return setState({
            isLoading: false,
            list: res,
            selectedProduct: res[0].list ? res[0] : {},
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  React.useEffect(() => {
    props.navigation.setOptions({
      title: props.route.params.item.name,
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            props.navigation.navigate('Search', {
              name: props.route.params.item.name,
            })
          }>
          <MaterialCommunityIcons
            name="magnify"
            color={'#4f4f4f'}
            size={25}
            style={{
              marginRight: 10,
              padding: 6,
              backgroundColor: '#f5f5f5',
              borderRadius: 20,
            }}
          />
        </TouchableOpacity>
      ),
    });
    innerFunction();
  }, []);

  const renderItem = ({item, index}) => {
    const {name, available, image, flavour, type} = item;
    return (
      <View style={styles.listView}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => props.navigation.navigate('FullView', {item})}>
          <Image
            source={{uri: image}}
            resizeMode="contain"
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={styles.listContent}>
          {!flavour ? (
            <Text style={styles.listname} numberOfLines={1}>
              {name}
            </Text>
          ) : (
            <Text style={{color: '#4f4f4f'}} numberOfLines={1}>
              {flavour}
            </Text>
          )}
          <View style={styles.subdiv}>
            <Text style={{color: '#999'}}>{available[0].weight}</Text>
            <CartBtn
              data={{
                name: name,
                flavour: flavour ? flavour : '',
                image: image,
                available: available,
                type: type,
              }}
            />
          </View>
          <Text style={styles.price}>
            <MaterialCommunityIcons
              name="currency-inr"
              size={15}
              color={'#000'}
            />
            {available[0].price}
          </Text>
        </View>
      </View>
    );
  };

  return !state.isLoading ? (
    <View style={styles.container}>
      {Object.keys(state.selectedProduct).length !== 0 ? (
        <View style={styles.header}>
          <ScrollView horizontal={true}>
            {state.list.map(({name}, index) => (
              <TouchableOpacity
                activeOpacity={1}
                style={[
                  styles.productListTitle,
                  {
                    backgroundColor:
                      name === state.selectedProduct.name
                        ? '#e4545f'
                        : '#f9f9f9',
                    marginLeft: index === 0 ? 0 : 10,
                  },
                ]}
                onPress={() =>
                  name !== state.selectedProduct.name
                    ? setState({...state, selectedProduct: state.list[index]})
                    : null
                }
                key={index}>
                <Text
                  numberOfLines={2}
                  style={{
                    textAlign: 'center',
                    fontSize: 12.5,
                    color:
                      state.selectedProduct.name === name
                        ? selectedColor
                        : unSelectedColor,
                  }}>
                  {name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : null}
      <FlatList
        style={{flex: 1}}
        data={
          Object.keys(state.selectedProduct).length !== 0
            ? state.selectedProduct.list
            : state.list
        }
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={5}
        showsVerticalScrollIndicator={false}
        key={
          Object.keys(state.selectedProduct).length !== 0
            ? state.selectedProduct.list
            : state.list
        }
      />
      <Cart navigation={props.navigation} />
    </View>
  ) : (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color="#e91e63" />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    grocery: state.grocery.item,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ADD_GROCERY: (data) => {
      dispatch({type: 'ADD_GROCERY', data});
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListView);
