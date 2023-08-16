import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Text, View } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { ActivityIndicator, Button, HelperText, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import Recaptcha from 'react-native-recaptcha-that-works';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const recaptcha = useRef();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState('Requesting...');
  const [error, setError] = useState([]);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  if (isLoading)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#0E0E0E',
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator size={100} animating={true} color={'#FC3627'} />
          <Text style={{ color: 'white', fontSize: 16 }}>{loginStatus}</Text>
        </View>
      </View>
    );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#0E0E0E',
      }}
    >
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          position: 'static',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#0E0E0E',
          top: isKeyboardVisible === true ? 270 : 0,
        }}
      >
        <View style={{ flexDirection: 'row', marginBottom: 45, top: -35 }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 50 }}>Log-</Text>
          <Text style={{ color: '#FC3627', fontWeight: 'bold', fontSize: 50 }}>in</Text>
        </View>

        <View
          style={{
            top: -60,
          }}
        >
          <SvgUri
            source={require('../assets/undraw_fingerprint_login_re_t71l.svg')}
            height={140}
          ></SvgUri>
        </View>
        <Text style={{ color: 'white', top: -20 }}>Use Your web username and password</Text>
        <TextInput
          style={{ width: 300, backgroundColor: '#292929' }}
          outlineColor={'#8C8C8C'}
          activeOutlineColor={'#FC3627'}
          mode={'outlined'}
          label="Username"
          textColor={'white'}
          placeholderTextColor={'#8C8C8C'}
          textContentType={'username'}
          value={login}
          onChangeText={(text) => setLogin(text)}
        />
        <TextInput
          style={{ width: 300, backgroundColor: '#292929' }}
          outlineColor={'#8C8C8C'}
          activeOutlineColor={'#FC3627'}
          mode={'outlined'}
          label="Password"
          textColor={'white'}
          secureTextEntry={true}
          placeholderTextColor={'#8C8C8C'}
          textContentType={'password'}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={{ top: 11, height: 50 }}>
          {error.map((err) => {
            return (
              <HelperText
                visible={error.length > 0}
                type={'error'}
                style={{ color: '#FC3627', alignSelf: 'center' }}
              >
                {err}
              </HelperText>
            );
          })}
        </View>
        <View style={{ top: 20 }}>
          <Button
            style={{
              width: 300,
              height: 70,
              justifyContent: 'center',
              margin: 5,
              backgroundColor: '#FC3627',
            }}
            mode="contained"
            onPress={async () => {
              let err = [];
              if (!login) err.push('Input login pls');
              if (!password) err.push('Input password pls');
              setError(err);
              if (err.length > 0) return;
              recaptcha.current.open();
            }}
          >
            Login
          </Button>
          <Button
            style={{
              backgroundColor: '#0E0E0E',
              borderWidth: 4,
              borderColor: '#FC3627',
              width: 300,
              height: 70,
              justifyContent: 'center',
              margin: 5,
            }}
            mode="contained"
            onPress={() => navigation.goBack()}
          >
            Go back
          </Button>
        </View>
        <Text
          style={{
            position: 'absolute',
            fontSize: 10,
            color: '#8C8C8C',
            bottom: 10,
          }}
        >
          Not affiliated with Organic Codesand (FILMAN)
        </Text>
        <View style={{}}>
          <Recaptcha
            ref={recaptcha}
            siteKey="6LcQs24iAAAAALFibpEQwpQZiyhOCn-zdc-eFout"
            baseUrl="https://filman.cc/logowanie"
            onVerify={async (token) => {
              setLoginStatus(`Requesting login per api server...`);
              setLoading(true);
              try {
                const loginRes = await axios.post('http://192.168.0.125:3000/v1/login', {
                  username: login,
                  password,
                  captchaToken: token,
                });
                console.log(loginRes.data);
                if (loginRes.data.success) {
                  setLoginStatus('Logged in successfully');
                  await AsyncStorage.setItem('firstOpen', 'false');
                  await AsyncStorage.setItem('user/login', login);
                  await AsyncStorage.setItem('user/password', password);
                  await AsyncStorage.setItem('user/cookies', loginRes.data.cookies);
                  navigation.replace('Home');
                } else {
                  setLoading(false);
                  setLoginStatus('Login failed');
                  setError([loginRes.data.error]);
                }
              } catch (e) {
                console.log(e);
                setLoading(false);
                setLoginStatus('Login failed');
                setError([e.message]);
              }
            }}
            size="compact"
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
