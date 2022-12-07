import React, { useContext, useState } from "react"
import {
  Dimensions,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native"
import { Avatar, Title, Caption, TouchableRipple } from "react-native-paper"
import { useIsFocused } from "@react-navigation/native"
import COLORS from "../../const/colors"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { Card } from "../../components/Cards"
import { AuthContext } from "../../Context/AuthContext"
import { URL } from "./url"
const { height } = Dimensions.get("window")

const HomeScreen = ({ navigation }) => {
  const isfocused = useIsFocused()

  const ContxAuth = useContext(AuthContext)
  const name = ContxAuth.email
  const UserData = ContxAuth.User
  const avatar = UserData.avatar

  const [ApiData, setApiData] = useState()

  React.useEffect(() => {
    getData()
  }, [isfocused])

  const getData = async () => {
    const res = await fetch(`${URL}pets/fetch/pets`)
    setApiData(await res.json())
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
          {name}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("PROFILE")}>
          <Image
            source={{ uri: avatar }}
            style={{ height: 50, width: 50, borderRadius: 25 }}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.mainContainer}>
          <View style={style.allButtons}>
            <TouchableRipple
              onPress={() => {
                navigation.navigate("FAVOURITES")
              }}
            >
              <Icon
                name="heart-outline"
                color="#FF6347"
                size={65}
                style={{
                  width: 65,
                  // borderRadius: 5,
                  // borderColor: "#080808",
                  // borderWidth: 2,
                }}
              />
            </TouchableRipple>

            <TouchableRipple
              onPress={() => {
                navigation.navigate("Pet Products")
              }}
            >
              <Icon
                name="paw"
                size={65}
                style={{
                  width: 65,
                  backgroundColor: "#a3ffb4",
                  // borderRadius: 5,
                  // borderColor: "#080808",
                  // borderWidth: 2,
                }}
              />
            </TouchableRipple>
            <TouchableRipple
              onPress={() => {
                navigation.navigate("Cart")
              }}
            >
              <Icon
                name="cart"
                size={65}
                style={{
                  width: 65,
                  backgroundColor: "#91fae1",
                  // borderRadius: 5,
                  // borderColor: "#080808",
                  // borderWidth: 2,
                }}
              />
            </TouchableRipple>
            <TouchableRipple
              onPress={() => {
                navigation.navigate("ADD PET")
              }}
            >
              <Icon
                name="plus-box"
                size={65}
                style={{
                  width: 65,
                  // borderRadius: 5,
                  // borderColor: "#080808",
                  // borderWidth: 2,
                }}
              />
            </TouchableRipple>
          </View>
          <View style={{ marginTop: 20 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={ApiData}
              renderItem={({ item }) => {
                const Pet = {
                  image: item.picture,
                  name: item.name,
                  type: item.breed,
                  age: item.age,
                }
                return (
                  <Card
                    pet={Pet}
                    icon={true}
                    onPress={() => navigation.navigate("DetailsScreen", item)}
                  />
                )
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  allButtons: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between",
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

  menuItem: {
    width: 45,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
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
})
export default HomeScreen
