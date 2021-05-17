import React from 'react'
import { Text, View, Image } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Cart from '../../helper/cart';
import CartBtn from '../../helper/cartbtn';
import styles from '../style/fullView';

export default function FullView(props) {

    const [item] = React.useState(props.route.params.item);

    React.useEffect(() => {
        props.navigation.setOptions({
            title: item.flavour ? item.flavour : item.name
        });
    }, []);

    
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Image source={{ uri: item.image }} resizeMode='contain' style={styles.image} />
                <View style={styles.content}>
                    {!item.flavour ?
                        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                        :
                        <Text style={styles.flavour} numberOfLines={1}>{item.flavour}</Text>
                    }
                    <View style={styles.subdiv}>
                        <Text style={{ color: '#999', fontSize: 16 }}>{item.available[0].weight}</Text>
                        <CartBtn
                            data={{
                                name: item.name,
                                flavour: item.flavour ? item.flavour : '',
                                image: item.image,
                                available: item.available,
                                type: item.type,
                            }} />
                    </View>
                    <Text style={styles.price}>
                        <MaterialCommunityIcons name='currency-inr' size={15} color={'#000'} />
                        {item.available[0].price}
                    </Text>
                </View>
            </View>
            <Cart navigation={props.navigation} />
        </View>
    )
}
