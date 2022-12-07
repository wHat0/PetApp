import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import ImagePicker from 'react-native-image-crop-picker';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import COLORS from '../../../const/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {URL} from '../url';

const SignUpScreen = ({navigation}) => {
  const [Loading, setLoading] = useState(false);

  const [data, setData] = useState({
    username: '',
    password: '',
    confirm_password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });
  const [image, SetImage] = useState(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAdd] = useState('');
  const [_emailChecker, SetEmailCheck] = useState(false);

  const textInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
      });
    }
  };

  const textEmailChange = val => {
    if (val.length !== 0 && val.match(/\S+@\S+\.\S+/)) {
      setEmail(val), SetEmailCheck(true);
    } else {
      setEmail(val), SetEmailCheck(false);
    }
  };

  const handlePasswordChange = val => {
    if (val.length >= 8) {
      setData({
        ...data,
        password: val,
      });
    }
  };

  const handleConfirmPasswordChange = val => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  if (Loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  async function SignUp() {
    if (
      data.username.length == 0 ||
      !email ||
      !address ||
      !phone ||
      data.password.length == 0
    ) {
      return Alert.alert('Wrong Input!', ' fields cannot be empty.', [
        {text: 'Okay'},
      ]);
    } else if (data.password.length < 7) {
      return Alert.alert('Warning', 'Password should be greater than 7');
    } else if (!image) {
      return Alert.alert('Warning', 'You should add Pet image');
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('profile', {
      name: `pic ${new Date()} `,
      uri: image.path,
      type: image.mime,
    });
    formData.append('username', data.username);
    formData.append('password', data.password);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('phone_number', phone);
    console.log(formData);
    console.log('---------------------FormData------------------');
    const response = await fetch(`${URL}user/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
    console.log(response);
    const res2 = await response.json();
    console.log(res2);
    setLoading(false);
    Alert.alert('SignUp Successfully', ` 🎉 ${res2?.message}... 🎉`);
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
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'black'} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <TouchableOpacity onPress={() => ImageGetter()}>
            {!image ? (
              <View
                style={{
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 160,
                  width: 380,
                  height: 300,
                  marginBottom: 8,
                }}>
                <Icon name="images-outline" size={100} color={'grey'} />
              </View>
            ) : (
              <View
                style={{
                  padding: 20,
                  backgroundColor: 'white',
                  width: 250,
                  height: 250,
                  alignSelf: 'center',
                  borderRadius: 160,
                }}>
                <Image
                  style={{
                    borderRadius: 8,
                    width: '100%',
                    height: '100%',
                    borderRadius: 160,
                    marginBottom: 8,
                    backgroundColor: 'white',
                  }}
                  source={{uri: image.path}}
                  resizeMode={'contain'}
                />
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholderTextColor="grey"
              placeholder="Your Username"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => textInputChange(val)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholderTextColor="grey"
              placeholder="email@xyz.com"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => textEmailChange(val)}
            />
            {_emailChecker ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <View style={styles.action}>
            <FontAwesome name="phone" color="#05375a" size={20} />
            <TextInput
              placeholderTextColor="grey"
              placeholder="03xx-xxxxxxxx"
              style={styles.textInput}
              keyboardType="numeric"
              onChangeText={val => setPhone(val)}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="home" color="#05375a" size={20} />
            <TextInput
              placeholderTextColor="grey"
              placeholder="Address"
              style={styles.textInput}
              autoCapitalize="none"
              multiline={true}
              onChangeText={val => setAdd(val)}
            />
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholderTextColor="grey"
              placeholder="Your Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholderTextColor="grey"
              placeholder="Confirm Your Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
            </Text>
            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
              {' '}
              Terms of service
            </Text>
            <Text style={styles.color_textPrivate}> and</Text>
            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
              {' '}
              Privacy policy
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={[
                styles.signIn,
                {
                  borderColor: COLORS.primary,
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
              onPress={() => {
                SignUp();
              }}>
              <Text style={[styles.textSign, {color: COLORS.primary}]}>
                Sign Up
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles.signIn,
                {
                  borderColor: COLORS.primary,
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: COLORS.primary,
                  },
                ]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 15,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
});
