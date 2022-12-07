import React from "react"
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native"
import {
  Avatar,
  Title,
  Caption,
  TouchableRipple,
  Button,
} from "react-native-paper"
const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text2}>Online</Text>
      <Text style={styles.text}>
        Pet <Text>Shop</Text>
      </Text>
      {/* <Text style={styles.text1}>Shop</Text> */}
      <TouchableOpacity style={styles.button}>
        <Image source={require("../../../assets/ic_launcher.png")} />
      </TouchableOpacity>
      <Text style={styles.text3}>Find Your Pet</Text>
      <Button
        style={styles.button1}
        onPress={() => {
          navigation.navigate("SignIn")
        }}
      >
        <Text>Get Started</Text>
      </Button>
    </View>
  )
}
export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 50,
    backgroundColor: "#859a9b",
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#303838",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },
  button1: {
    marginTop: 20,
    backgroundColor: "#ffff",
    borderRadius: 20,
    padding: 10,
  },
  text: {
    fontSize: 65,
    color: "#ffff",
    fontStyle: "italic",
    marginTop: -40,
    borderBottomWidth: 4,
    borderBottomColor: "#ffff",
  },
  text1: {
    fontSize: 55,
    color: "#e60eed",
    fontStyle: "italic",
    marginTop: -30,
  },
  text2: {
    fontSize: 105,
    color: "#e60eed",
    fontStyle: "italic",
    marginTop: -230,
  },
  text3: {
    marginTop: 10,
    fontSize: 30,
    color: "#ffff",
  },
})
