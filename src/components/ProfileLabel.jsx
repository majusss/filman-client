import {Text, TouchableOpacity, View} from 'react-native';
import {useEffect, useState} from 'react';
import SvgUri from 'react-native-svg-uri';
import AsyncStorage from '@react-native-community/async-storage';
import {ActivityIndicator} from 'react-native-paper';

const ProfileLabel = () => {
  const [isLoading, setLoading] = useState(true);
  const [displayName, setName] = useState('');

  useEffect(() => {
    async function getUsername() {
      const username = await AsyncStorage.getItem('user/login');
      setName(username);
      setLoading(false);
    }

    getUsername();
  }, []);

  if (isLoading)
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          width: 'auto',
          height: 60,
          flexDirection: 'row',
          left: 24,
          right: 24,
        }}>
        <View
          style={{
            width: 40,
            height: 40,
            margin: 10,
            borderRadius: 999,
            backgroundColor: '#FC3627',
          }}>
          <ActivityIndicator
            style={{margin: 20}}
            animating={true}
            color={'white'}
          />
        </View>
        <View style={{alignSelf: 'center', flexDirection: 'row'}}>
          <Text style={{color: 'white', fontSize: 19}}>Welcome</Text>
        </View>
      </View>
    );

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        width: 'auto',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        left: 24,
        right: 24,
      }}>
      <TouchableOpacity
        onPress={() => {
          AsyncStorage.clear(); //TODO: remove it xD
        }}
        activeOpacity={0.32}
        style={{
          width: 40,
          height: 40,
          borderRadius: 999,
          backgroundColor: '#1e52b2',
        }}>
        <SvgUri
          style={{margin: 10}}
          width={22}
          height={20}
          svgXmlData={
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path fill="#fff" d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg>'
          }></SvgUri>
      </TouchableOpacity>

      <Text
        style={{
          color: 'white',
          fontSize: 19,
        }}>
        Welcome,{' '}
        <Text
          style={{
            color: 'white',
            fontSize: 19,
            fontWeight: 'bold',
            width: 115,
          }}>
          {displayName}
        </Text>
      </Text>
      <SvgUri
        width={20}
        height={20}
        svgXmlData={
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path fill="#fff" d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"/></svg>'
        }></SvgUri>
    </View>
  );
};

export default ProfileLabel;
