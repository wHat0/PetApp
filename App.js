import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import AuthContextProvider, {AuthContext} from './src/Context/AuthContext';
import CartContextProvider from './src/Context/Cart-context';
import FavContextProvider, {FavContext} from './src/Context/fav-context';
import AuthStack from './src/views/navigators/AuthStack';
import {HomeStack} from './src/views/navigators/AuthStack';

export default function App() {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <FavContextProvider>
          <Navigation />
        </FavContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
  );
}

function Navigation() {
  const ContxAuth = useContext(AuthContext);
  useEffect(() => {
    async function getToken() {
      const token = await AsyncStorage.getItem('token');
      const email = JSON.parse(await AsyncStorage.getItem('email'));

      if (token) {
        console.log(email, 'FROM APP');
        ContxAuth.authenticate(token, email.username, email);
      }
      return;
    }

    getToken();
  }, []);

  return (
    <NavigationContainer>
      {ContxAuth.isTokenValide ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
