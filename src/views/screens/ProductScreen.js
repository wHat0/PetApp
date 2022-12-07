import React, { useContext, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import COLORS from "../../const/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Card } from "../../components/Cards";
import { AuthContext } from "../../Context/AuthContext";
import { useIsFocused } from "@react-navigation/native";
import { CartContext } from "../../Context/Cart-context";
import { URL } from "./url";
import { ActivityIndicator } from "react-native-paper";
const { height } = Dimensions.get("window");

const ProductScreen = ({ navigation }) => {
  const [Loading, setLoading] = useState(false);
  const isfocused = useIsFocused();

  const ContxAuth = useContext(AuthContext);
  const User = ContxAuth.User;
  const [ApiData, setApiData] = useState();

  const CartCon = useContext(CartContext);
  const Items = CartCon.ids;

  React.useEffect(() => {
    getData();
  }, [isfocused]);

  const getData = async () => {
    setLoading(true);
    const res = await fetch(`${URL}product/get/all`);
    const data = await res.json();
    // console.log(data.products);
    setApiData(data.products);
    setLoading(false);
  };

  if (Loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <SafeAreaView style={{ flex: 1, color: COLORS.primary }}>
      <View style={style.header}>
        <Icon name="sort-variant" size={28} onPress={navigation.toggleDrawer} />
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Pet Products
        </Text>
        <TouchableOpacity
          style={{ flexDirection: "row", width: "20%" }}
          onPress={() => navigation.navigate("Cart")}
        >
          <Icon name={"cart"} size={25} color={"white"} />
          <Text
            style={{
              backgroundColor: "red",
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              height: 18,
              width: "20%",
              borderRadius: 7,
              borderWidth: 0.15,
              elevation: 18,
              shadowColor: "black",
              shadowOpacity: 15,
              shadowRadius: 5,
            }}
          >
            {Items.length}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.mainContainer}>
          <View style={{ marginTop: 20 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={ApiData}
              renderItem={({ item }) => {
                console.log(item);
                const Pet = {
                  image: item.picture,
                  name: item.name,
                  type: item.price,
                  age: item.age,
                };
                return (
                  <Card
                    pet={Pet}
                    onPress={() =>
                      navigation.navigate("DetailsScreen", {
                        ...item,
                        path: "Product",
                      })
                    }
                  />
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryBtn: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  categoryBtnName: {
    color: COLORS.dark,
    fontSize: 10,
    marginTop: 5,
    fontWeight: "bold",
  },
});
export default ProductScreen;
