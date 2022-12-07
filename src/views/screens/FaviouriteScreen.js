import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import COLORS from '../../const/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card} from '../../components/Cards';
import {useIsFocused} from '@react-navigation/native';
import {FavContext} from '../../Context/fav-context';
import {URL} from './url';
import {ActivityIndicator} from 'react-native-paper';
const {height} = Dimensions.get('window');

export default function FaviouriteScreen({navigation}) {
  const faviourite = useContext(FavContext);
  const Fav = faviourite.ids;
  const [Faviourite, setFaviourite] = useState([]);
  const [showData, setShowData] = useState([]);
  const [ApiData, setApiData] = useState();
  const isfocus = useIsFocused();
  const [Loading, setLoading] = useState(false);

  const getData = async () => {
    const res = await fetch(`${URL}pets/fetch/pets`);
    setApiData(await res.json());
  };

  useEffect(() => {
    setLoading(true);
    getData();
    if (Fav) {
      setFaviourite([]);
      for (const key in Fav) {
        getFavData(Fav[key]);
        // Faviourite.push(data);
      }
    }
    setShowData(Faviourite);
    setLoading(false);
    // console.log('DATA-Show', Faviourite);
  }, [isfocus]);

  async function getFavData(ID) {
    // console.log(ID);
    await ApiData.map(data => {
      if (data._id == ID) {
        Faviourite.push(data);
      }
    });
  }

  if (Loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <SafeAreaView style={{flex: 1, color: COLORS.primary}}>
      <View style={style.header}>
        <Icon
          name="sort-variant"
          size={28}
          onPress={() => navigation.toggleDrawer()}
        />
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          Faviourites
        </Text>
      </View>
      <View style={style.mainContainer}>
        <View style={{marginTop: 20}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={showData}
            renderItem={({item}) => {
              const Pet = {
                image: item.picture,
                name: item.name,
                type: item.breed,
                age: item.age,
              };
              return (
                <Card
                  icon={true}
                  pet={Pet}
                  onPress={() => navigation.navigate('DetailsScreen', item)}
                />
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
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
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 7,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryBtn: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  categoryBtnName: {
    color: COLORS.dark,
    fontSize: 10,
    marginTop: 5,
    fontWeight: 'bold',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardDetailsContainer: {
    height: 120,
    backgroundColor: COLORS.white,
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 20,
    justifyContent: 'center',
  },
  cardImageContainer: {
    height: 150,
    width: 140,
    backgroundColor: COLORS.background,
    borderRadius: 20,
  },
});
