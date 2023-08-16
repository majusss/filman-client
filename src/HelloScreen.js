import { Linking, Text, View } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { Button } from 'react-native-paper';
import * as React from 'react';

const HelloScreen = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0E0E0E',
      }}
    >
      <View style={{ flexDirection: 'row', marginBottom: 45, top: -35 }}>
        <Text style={{ color: '#FC3627', fontWeight: 'bold', fontSize: 50 }}>Free</Text>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 50 }}>man</Text>
      </View>

      <View
        style={{
          top: -60,
        }}
      >
        <SvgUri
          source={require('../assets/undraw_home_cinema_l7yl.svg')}
          height={170}
          style={{ left: -30 }}
        ></SvgUri>
      </View>
      <Text style={{ color: 'white', top: -20 }}>
        Watch Your favorite films and serials for free
      </Text>
      <Button
        style={{
          width: 300,
          height: 70,
          justifyContent: 'center',
          margin: 10,
          backgroundColor: '#FC3627',
        }}
        mode="contained"
        onPress={() => navigation.navigate('Login')}
      >
        Let's login
      </Button>
      <Button
        style={{
          backgroundColor: '#0E0E0E',
          borderWidth: 4,
          borderColor: '#FC3627',
          width: 300,
          height: 70,
          justifyContent: 'center',
          margin: 10,
        }}
        mode="contained"
        onPress={() => Linking.openURL('https://filman.cc/rejestracja')}
      >
        Register
      </Button>
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
    </View>
  );
};

export default HelloScreen;
