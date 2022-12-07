import React, {useContext} from 'react';
import {
  createDrawerNavigator,
  useDrawerProgress,
  DrawerContentScrollView,
  DrawerItemList,
  useDrawerStatus,
} from '@react-navigation/drawer';
import {View, Image, Text, StatusBar, TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';
import HomeScreen from '../screens/HomeScreen';
import COLORS from '../../const/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Posting from '../screens/Posting';
import FaviouriteScreen from '../screens/FaviouriteScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {AuthContext} from '../../Context/AuthContext';
import ProductPosting from '../screens/ProductPost';
import ProductScreen from '../screens/ProductScreen';
import CartScreen from '../screens/CartScreen';

const Drawer = createDrawerNavigator();

const DrawerScreenContainer = ({children}) => {
  const isDrawerOpen = useDrawerStatus();
  // const scale = Animated.interpolateNode(progress, {
  //   inputRange: [0, 1],
  //   outputRange: [1, 0.8],
  // });
  // const borderRadius = Animated.interpolateNode(progress, {
  //   inputRange: [0, 1],
  //   outputRange: [0, 25],
  // });

  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: 'red',
        // borderRadius,
        // transform: [{scale}],
        overflow: 'hidden',
      }}>
      <StatusBar
        backgroundColor={isDrawerOpen == 'open' ? COLORS.primary : COLORS.white}
        barStyle="dark-content"
      />
      {children}
    </View>
  );
};

const CustomDrawerContent = props => {
  const ContxAuth = useContext(AuthContext);
  const username = ContxAuth.email;
  const avatar = ContxAuth.User.avatar;

  return (
    <DrawerContentScrollView
      style={{
        paddingVertical: 30,
      }}>
      <View
        style={{
          marginLeft: 20,
          marginVertical: 40,
        }}>
        <Image
          source={{uri: avatar}}
          style={{height: 70, width: 70, borderRadius: 20}}
        />
        <Text
          style={{
            color: COLORS.white,
            fontWeight: 'bold',
            fontSize: 13,
            marginTop: 10,
          }}>
          {username}
        </Text>
      </View>

      <DrawerItemList {...props} />

      <TouchableOpacity
        onPress={() => {
          ContxAuth.logout();
        }}
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '50%',
          // position: 'absolute', //Here is the trick
          // bottom: 0, //Here is the trick
        }}>
        <Icon name="exit-to-app" size={25} style={{color: COLORS.secondary}} />
        <Text
          style={{
            paddingHorizontal: '5%',
            alignText: 'center',
            color: COLORS.secondary,
            fontSize: 18,
          }}>
          LogOut
        </Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerStyle: {
          width: 200,
          backgroundColor: COLORS.primary,
        },
        overlayColor: null,
        drawerLabelStyle: {
          fontWeight: 'bold',
        },
        drawerActiveTintColor: COLORS.white,
        drawerInactiveTintColor: COLORS.secondary,
        drawerItemStyle: {backgroundColor: null},
        sceneContainerStyle: {
          backgroundColor: COLORS.primary,
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        options={{
          title: 'Home',
          drawerIcon: ({color}) => (
            <Icon name="paw" size={25} style={{marginRight: -20, color}} />
          ),
        }}>
        {props => (
          <DrawerScreenContainer>
            <HomeScreen {...props} />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name="Pet Products"
        component={ProductScreen}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="paw" size={25} style={{marginRight: -20, color}} />
          ),
        }}
      />

      <Drawer.Screen
        name="Cart"
        component={CartScreen}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="cart" size={25} style={{marginRight: -20, color}} />
          ),
        }}
      />
      <Drawer.Screen
        name="ADD PET"
        options={{
          drawerIcon: ({color}) => (
            <Icon name="plus-box" size={25} style={{marginRight: -20, color}} />
          ),
        }}>
        {props => (
          <DrawerScreenContainer>
            <Posting {...props} />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name="PRODUCT"
        component={ProductPosting}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="plus-box" size={25} style={{marginRight: -20, color}} />
          ),
        }}
      />
      <Drawer.Screen
        name="FAVOURITES"
        component={FaviouriteScreen}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="heart" size={25} style={{marginRight: -20, color}} />
          ),
        }}></Drawer.Screen>
      <Drawer.Screen
        name="PROFILE"
        component={ProfileScreen}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="account" size={25} style={{marginRight: -20, color}} />
          ),
        }}></Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
