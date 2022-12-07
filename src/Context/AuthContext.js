// import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
  token: '',
  email: '',
  User: '',
  isTokenValide: false,
  authenticate: token => {},
  logout: () => {},
});

function AuthContextProvider({children}) {
  const [AuthToken, setAuthToken] = useState();
  const [Email, setEmail] = useState();
  const [User, setUser] = useState();

  async function authenticate(token, email, User) {
    setUser(User);
    setAuthToken(token);
    setEmail(email);
  }

  async function logout() {
    setAuthToken(null);
    setEmail(null);
    setUser(null);
    AsyncStorage.removeItem('Fav');
    await AsyncStorage.clear();
  }

  const value = {
    token: AuthToken,
    email: Email,
    User: User,
    isTokenValide: !!AuthToken,
    logout: logout,
    authenticate: authenticate,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
