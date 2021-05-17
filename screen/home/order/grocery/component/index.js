import React from 'react';
import {
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
  ActivityIndicator,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {offerImage, item} from './data';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../style/index';

function Grocery(props) {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(false);
  }, []);

  return !isLoading ? (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.notify}>
        <MaterialCommunityIcons name="moped" size={28} color={'#e91'} />
        <Text style={{fontSize: 16, color: '#999'}}>
          Delivery timing: 9 Am to 7 Pm{' '}
        </Text>
      </View>
      <View style={styles.sliderContainer}>
        <Swiper
          activeDotColor={'#e91e63'}
          autoplay={true}
          dotStyle={{width: 5, height: 5, top: 20}}
          activeDotStyle={{width: 5, height: 5, top: 20}}>
          {offerImage.map((image, index) => (
            <View style={styles.slide} key={index}>
              <Image
                source={{uri: image}}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
          ))}
        </Swiper>
      </View>

      <View style={styles.title}>
        <Text style={styles.primaryTitle}>Categories</Text>
        <Text style={styles.secondaryTitle}>Browse products by categories</Text>
      </View>

      <View style={styles.body}>
        {item.map((res, index) => (
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.card, {marginLeft: index % 3 === 0 ? 0 : 15}]}
            onPress={() =>
              props.navigation.navigate('ListView', {
                item: res,
              })
            }
            key={res.name}>
            <Image
              source={{uri: res.image}}
              resizeMode="contain"
              style={styles.image}
            />
            <Text style={styles.name} numberOfLines={2}>
              {res.name}{' '}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  ) : (
    <ActivityIndicator size="large" color="#e91e63" style={styles.loader} />
  );
}

export default React.memo(Grocery);
