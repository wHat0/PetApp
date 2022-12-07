import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../../const/colors';

function CartStats({Subtotal, Discount, DeliveryCharges}) {
  const Total = Subtotal + DeliveryCharges - Discount;
  return (
    <View style={{alignItems: 'center'}}>
      <View style={{width: '85%', marginTop: 35}}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-between',
          }}>
          <Text style={{color: 'grey'}}>Subtotal</Text>
          <Text style={{color: 'black'}}>{Subtotal} PKR</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-between',
          }}>
          <Text style={{color: 'grey'}}>Discount</Text>
          <Text style={{color: 'black'}}>-{Discount} PKR</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
          <Text style={{color: 'grey'}}>Delivery</Text>
          <Text style={{color: 'black'}}>{DeliveryCharges} PKR</Text>
        </View>

        <View
          style={{
            borderTopWidth: 1,
            borderStyle: 'dashed',
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginTop: 20,
            }}>
            <Text style={{color: 'grey'}}>Total</Text>
            <Text style={{color: 'black'}}> {Total}</Text>
          </View>
        </View>
        {/* Bottom BAR */}
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: 30,

            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
          }}>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                'Conferm Your Order ?',
                `Total Price of ${Total} Will be charged`,
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      console.log('DONE EAT');
                      // navigation.navigate('Home');
                    },
                  },
                ],
              )
            }
            style={styles.BottomBar}>
            <Text style={{fontWeight: '400', fontSize: 15, color: 'white'}}>
              Checkout
            </Text>
            <Ionicons
              name="arrow-forward"
              size={20}
              color={COLORS.secondary}
              style={{paddingHorizontal: 10}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default CartStats;

const styles = StyleSheet.create({
  BottomBar: {
    backgroundColor: COLORS.primary,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    margin: 10,
    width: '100%',
  },
  BottomText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
    margin: 5,
  },
  CalculationView: {
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  RedCal: {
    fontWeight: 'bold',
    marginLeft: 5,
    color: 'red',
  },
});
