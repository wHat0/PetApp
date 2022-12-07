import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  Keyboard,
  Alert,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {ActivityIndicator, Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../../const/colors';
import {AuthContext} from '../../Context/AuthContext';
import {URL} from './url';

function Posting({navigation}) {
  const [image, SetImage] = useState();

  const ContxAuth = useContext(AuthContext);
  const token = ContxAuth.token;

  // const event = new Date();

  const [inputs, setInputData] = useState({
    discription: '',
    name: '',
    type: '',
    age: '',
    price: '',
    gender: 'male',
  });

  const [errors, setErrors] = useState({});
  const [Loading, setLoading] = useState(false);

  async function Post() {
    setLoading(true);
    const formData = new FormData();
    formData.append('pet', {
      name: `pic ${new Date()} `,
      uri: image.path,
      type: image.mime,
    });
    formData.append('name', inputs.name);
    formData.append('discription', inputs.discription);
    formData.append('breed', inputs.type);
    formData.append('age', inputs.age);
    formData.append('gender', inputs.gender);
    formData.append('price', inputs.price);
    // formData.append('token', token)

    console.log(formData);
    const res = await fetch(`${URL}user/sell/pet?token=${token}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
    console.log(res);
    const newRes = await res?.json();
    console.log(newRes);

    Alert.alert('Post Successfully', ` 🎉 ${newRes?.message}... 🎉`);
    // setInputData();
    setLoading(false);
  }

  function ChangeValue(value, input) {
    setInputData(curInput => {
      return {...curInput, [input]: value};
    });
  }

  const validate = () => {
    console.log('VALidation');
    Keyboard.dismiss();
    let isValid = true;
    setErrors({});

    if (!inputs.name) {
      handleError('Please name your Pet', 'Short Name');
      isValid = false;
    }
    if (!inputs.price) {
      Alert.alert('Warning', 'Please enter Price');
      isValid = false;
    }

    if (isValid) {
      console.log(JSON.stringify(inputs));
      Post();
    }
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  if (Loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  async function ImageGetter() {
    ImagePicker.openPicker({
      compressImageMaxWidth: 600,
      compressImageMaxHeight: 400,
      compressImageQuality: 0.7,
      cropping: true,
    })
      .then(image => {
        SetImage(image);
      })
      .catch(err => console.log(err, 'out'));
    console.log('Imagegot');
    // console.log(image);
  }

  return (
    <SafeAreaView style={{flex: 1, overflow: 'hidden', color: COLORS.primary}}>
      <View style={styles.header}>
        <Icon name="list" size={28} onPress={() => navigation.toggleDrawer()} />
      </View>
      <ScrollView
        style={{
          borderRadius: 100,
          backgroundColor: 'white',
          paddingVertical: 20,
        }}
        contentContainerStyle={{
          justifyContent: 'center',
        }}>
        <View style={styles.header}></View>

        {/* <Text>Posting</Text> */}
        <View
          style={{
            marginHorizontal: 10,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 60,
          }}>
          <TouchableOpacity onPress={() => ImageGetter()}>
            {!image ? (
              <View
                style={{
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 100,
                  width: 380,
                  height: 300,
                  overflow: 'hidden',

                  // marginBottom: 8,
                }}>
                <Icon name="images-outline" size={100} color={'grey'} />
              </View>
            ) : (
              <View
                style={{
                  padding: 15,
                  backgroundColor: COLORS.background,
                  borderRadius: 100,
                  width: 380,
                  height: 300,
                  overflow: 'hidden',
                }}>
                <Image
                  style={{
                    borderRadius: 10,
                    width: '100%',
                    height: '100%',
                    backgroundColor: COLORS.background,

                    resizeMode: 'contain',
                  }}
                  source={{uri: image.path}}
                  resizeMode={'contain'}
                />
              </View>
            )}
          </TouchableOpacity>

          <TextInput
            placeholder="Name"
            placeholderTextColor={'grey'}
            style={styles.input}
            value={inputs.name}
            onChangeText={value => ChangeValue(value, 'name')}
          />
          <TextInput
            placeholder="type"
            placeholderTextColor={'grey'}
            style={styles.input}
            value={inputs.type}
            onChangeText={value => ChangeValue(value, 'type')}
          />

          <TextInput
            placeholder="age"
            placeholderTextColor={'grey'}
            style={styles.input}
            keyboardType="numeric"
            value={inputs.age}
            onChangeText={value => ChangeValue(value, 'age')}
          />

          <TextInput
            placeholder="price"
            placeholderTextColor={'grey'}
            style={styles.input}
            keyboardType="numeric"
            value={inputs.price}
            onChangeText={value => ChangeValue(value, 'price')}
          />

          <TextInput
            placeholder="discription"
            placeholderTextColor={'grey'}
            multiline={true}
            style={[styles.input, {width: '90%'}]}
            value={inputs.discription}
            onChangeText={value => ChangeValue(value, 'discription')}
          />
          <TouchableOpacity
            onPress={validate}
            style={[
              styles.Button,
              {
                borderColor: COLORS.primary,
                borderWidth: 1,
                marginTop: 15,
              },
            ]}>
            <Text
              style={[
                styles.textButton,
                {
                  color: COLORS.primary,
                },
              ]}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Posting;

const styles = StyleSheet.create({
  input: {
    // height: ,
    width: '80%',
    marginTop: 18,
    borderWidth: 0.5,
    borderRadius: 8,
    color: 'black',
  },
  Button: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textButton: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
