import React, {useContext, useState} from 'react';
import {
  Text,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import call from 'react-native-phone-call';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import QuantityButton from '../../components/Details/QuantityButton';
import COLORS from '../../const/colors';
import {CartContext} from '../../Context/Cart-context';
import {FavContext} from '../../Context/fav-context';

const DetailsScreen = ({navigation, route}) => {
  const pet = route.params;
  const CartCon = useContext(CartContext);
  const Items = CartCon.ids;
  const [Quantity, SetQuantity] = useState(1);

  console.log(pet);
  const Path = pet.path;
  const user = pet.postedBy;
  const faviourite = useContext(FavContext);
  const ID = pet._id;

  const isMealFav = faviourite?.ids.includes(ID); //Context
  const Badge = !isMealFav ? 'heart-outline' : 'heart';
  const ColorBadge = !isMealFav ? 'white' : '#FF6347';

  const Faviourite = () => {
    if (isMealFav) {
      faviourite.removeFav(ID);
    } else {
      faviourite.addFav(ID);
    }
  };

  function CartActions() {
    //we are checking for the array of object for our id
    const found = Items.some(el => el._id === ID);
    found
      ? CartCon.updateQuantity(pet._id, Quantity)
      : CartCon.addCart(pet, Quantity);
    Alert.alert('Added Item', 'Item Added Successfully.');
    // navigation.navigate('CartScreen');
  }

  const args = {
    number: `${user.phone_number}`, // String value with the number to call
    prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
    skipCanOpen: true, // Skip the canOpenURL check
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar backgroundColor={COLORS.background} />
      <View style={{height: 400, backgroundColor: 'black'}}>
        <ImageBackground
          resizeMode="contain"
          source={{uri: pet.picture}}
          style={{
            height: 280,
            top: 20,
          }}>
          {/* Render  Header */}
          <View style={style.header}>
            <Icon
              name="arrow-left"
              size={28}
              color={'white'}
              onPress={navigation.goBack}
            />
            <View style={{width: '15%', flexDirection: 'row'}}>
              <Icon
                name="cart"
                size={28}
                color={'white'}
                onPress={() => navigation.navigate('Cart')}
              />
              <Text
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  height: 18,
                  width: '20%',
                  borderRadius: 7,
                  borderWidth: 0.15,
                  elevation: 18,
                  shadowColor: 'black',
                  shadowOpacity: 15,
                  shadowRadius: 5,
                }}>
                {Items.length}
              </Text>
            </View>
          </View>
        </ImageBackground>

        <View style={style.detailsContainer}>
          {/* Pet name and gender icon */}

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{fontSize: 20, color: COLORS.dark, fontWeight: 'bold'}}>
              {pet.name}
            </Text>
            {pet.breed && (
              <Icon name="gender-male" size={25} color={COLORS.grey} />
            )}
          </View>

          {/* Render Pet type and age */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Text style={{fontSize: 12, color: COLORS.dark}}>
              {pet.breed ? pet.breed : `${pet.price}PKR`}
            </Text>
            <Text style={{fontSize: 13, color: COLORS.dark}}>{pet.age}</Text>
          </View>

          {/* Render location and icon */}
          <View style={{marginTop: 5, flexDirection: 'row'}}>
            <Icon name="map-marker" color={COLORS.primary} size={20} />
            <Text style={{fontSize: 14, color: COLORS.grey, marginLeft: 5}}>
              {user.address}
            </Text>
          </View>
          <View style={{marginTop: 5, flexDirection: 'row'}}>
            <Icon name="phone" color={COLORS.primary} size={20} />
            <Text style={{fontSize: 14, color: COLORS.grey, marginLeft: 5}}>
              {user.phone_number}
            </Text>
          </View>
        </View>
      </View>

      {/* Comment container */}
      <View style={{marginTop: 80, justifyContent: 'space-between', flex: 1}}>
        <View>
          {/* Render user image , name and date */}
          <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
            <Image
              source={{uri: user.avatar}}
              style={{height: 40, width: 40, borderRadius: 20}}
            />
            <View style={{flex: 1, paddingLeft: 10}}>
              <Text
                style={{color: COLORS.dark, fontSize: 12, fontWeight: 'bold'}}>
                {user.username}
              </Text>
              <Text
                style={{
                  color: COLORS.grey,
                  fontSize: 11,
                  fontWeight: 'bold',
                  marginTop: 2,
                }}>
                Owner
              </Text>
            </View>
            {/* <Text style={{color: COLORS.grey, fontSize: 12}}>May 25, 2020</Text> */}
          </View>
          <Text style={style.comment}>{pet.discription}</Text>
        </View>

        {/* Render footer */}
        <View style={style.footer}>
          {Path !== 'Product' ? (
            <TouchableOpacity style={style.iconCon} onPress={Faviourite}>
              <Icon name={Badge} size={22} color={ColorBadge} />
            </TouchableOpacity>
          ) : (
            <View
              style={{
                width: '45%',
                height: '100%',
                borderRadius: 15,
                paddingHorizontal: 10,
                justifyContent: 'center',
              }}>
              <QuantityButton
                size={16}
                Qunatity={Quantity}
                show={true}
                Add={() => SetQuantity(prev => prev + 1)}
                Minus={() => SetQuantity(prev => prev - 1)}
              />
            </View>
          )}
          {Quantity > 0 && (
            <TouchableOpacity
              style={style.btn}
              onPress={() => {
                Path == 'Product'
                  ? CartActions()
                  : call(args).catch(console.error);
              }}>
              <Text style={{color: COLORS.white, fontWeight: 'bold'}}>
                {Path !== 'Product' ? 'Buy It Now' : 'Add to Cart'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  detailsContainer: {
    height: 170,
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    flex: 1,
    bottom: -60,
    borderRadius: 18,
    elevation: 10,
    padding: 20,
    justifyContent: 'center',
  },
  comment: {
    marginTop: 10,
    fontSize: 12.5,
    color: COLORS.dark,
    lineHeight: 20,
    marginHorizontal: 20,
  },
  footer: {
    height: 100,
    backgroundColor: COLORS.light,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconCon: {
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  btn: {
    backgroundColor: COLORS.primary,
    flex: 1,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
});
export default DetailsScreen;
