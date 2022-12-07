import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CartContext} from '../../Context/Cart-context';
import {useIsFocused} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {URL} from './url';
import COLORS from '../../const/colors';
import Card from '../../components/Cart/Card';
import CartStats from '../../components/Cart/CartStats';

const {height} = Dimensions.get('window');

export default function CartScreen({navigation}) {
  const CartCon = useContext(CartContext);
  const isfocus = useIsFocused();
  const [Cart, setCart] = useState(CartCon.ids);
  // const Cart = useRef(CartCon.ids);
  const [Quantity, setQuantity] = useState(CartCon.Qty);
  const [SubTotalValue, setSubTotalValue] = useState(0);

  useEffect(() => {
    setCart(CartCon.ids);
    setQuantity(CartCon.Qty);
    CalculateSubTotal();
  }, [isfocus]);

  function CalculateSubTotal() {
    const Quantity = CartCon.Qty;
    const Ids = CartCon.ids;
    setSubTotalValue(0);

    for (const key in Quantity) {
      const total = Ids[key]?.price * Number(Quantity[key]);
      setSubTotalValue(prev => prev + total);
    }
  }

  return Cart.length != 0 ? (
    <SafeAreaView style={{flex: 1, color: COLORS.primary}}>
      <View style={styles.header}>
        <Icon name="sort-variant" size={28} onPress={navigation.toggleDrawer} />
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          Cart Screen
        </Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={{height: '45%'}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={Cart}
            renderItem={({item, index}) => {
              const qty = Quantity[index];
              return (
                <Card
                  ID={item._id}
                  price={item.price}
                  title={item.name}
                  url={item.picture}
                  Value={qty}
                  onPress={() => CalculateSubTotal()}
                />
              );
            }}
          />
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          backgroundColor: 'lightgrey',
          borderTopEndRadius: 45,
          borderTopStartRadius: 45,
        }}>
        <CartStats Subtotal={SubTotalValue} DeliveryCharges={13} Discount={3} />
      </View>
    </SafeAreaView>
  ) : (
    <View
      style={{
        flex: 1,
        marginTop: 35,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Ionicons name="trash-bin" size={55} color="red" />
      <Text
        style={{
          color: 'red',
          fontSize: 35,
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
        NO ITEM IN CART
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.light,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 40,
    minHeight: height,
  },
});
