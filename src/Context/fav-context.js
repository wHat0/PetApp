import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState} from 'react';

export const FavContext = createContext({
  ids: [],
  addFav: (id = {}),
  removeFav: (id = {}),
});

function FavContextProvider({children}) {
  const [favId, setFavId] = useState([]);

  async function addFaviourite(id) {
    setFavId(currentFavId => [...currentFavId, id]);
    // await AsyncStorage.setItem('Fav', JSON.stringify(favId));
  }

  async function removeFaviourite(id) {
    setFavId(currentFavId => currentFavId.filter(mealID => mealID !== id));
    // AsyncStorage.removeItem('Fav');
    // await AsyncStorage.setItem('Fav', JSON.stringify(favId));
  }
  const value = {
    ids: favId,
    addFav: addFaviourite,
    removeFav: removeFaviourite,
  };

  return <FavContext.Provider value={value}>{children}</FavContext.Provider>;
}

export default FavContextProvider;
