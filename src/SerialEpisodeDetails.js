import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { encode } from 'base-64';
import * as ScreenOrientation from 'expo-screen-orientation';
import ActivityIndicatorWithErrorHandling from './components/ActivityIndicatorWithErrorHandling';
import HostBox from './components/HostBox';

const SerialEpisodeDetails = ({ navigation, route }) => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const windowHeight = Dimensions.get('window').height;
  const [bottomPanelY, setBottomY] = useState(0);
  const [filmDetails, setFilmDetails] = useState({});
  const film = route.params.film;

  useEffect(async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }, []);

  async function getDetails() {
    setError(undefined);
    setLoading(true);
    try {
      const detailsRes = await axios.get(
        `http://192.168.0.125:3000/v1/details?cookies=${await AsyncStorage.getItem(
          'user/cookies'
        )}&link=${encode(film.link)}`,
        { timeout: 30000 }
      );
      if (detailsRes.data.success) {
        setFilmDetails(detailsRes.data.details);
        console.log(detailsRes.data.details);
        setLoading(false);
      } else {
        console.log(detailsRes.data.error);
        setError({ name: 'custom', message: detailsRes.data.error });
      }
    } catch (e) {
      setError(e);
    }
  }

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#0E0E0E',
      }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
        style={{
          backgroundColor: '#292929',
          width: 45,
          height: 45,
          borderRadius: 999,
          borderColor: '#8C8C8C',
          borderWidth: 1,
          margin: 24,
          zIndex: 99,
        }}
      >
        <SvgUri
          width={'25'}
          height={'25'}
          style={{ margin: 10 }}
          svgXmlData={
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path fill="#fff" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>'
          }
        ></SvgUri>
      </TouchableOpacity>
      <ImageBackground
        style={{ position: 'absolute', width: '100%', height: '100%', bottom: bottomPanelY * 2 }}
        source={{ uri: film.imageUrl }}
      ></ImageBackground>
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.7)', '#0E0E0E']}
        style={{
          position: 'absolute',
          width: '100%',
          height: '50%',
          bottom: bottomPanelY + windowHeight / 2,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: windowHeight / 2,
          backgroundColor: '#0E0E0E',
          bottom: bottomPanelY,
        }}
      ></View>
      <ScrollView
        onScroll={(e) => {
          setBottomY(e.nativeEvent.contentOffset.y);
        }}
        scrollEventThrottle={0}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      >
        <View style={{ height: windowHeight / 2 - 40 * 1.2 }}></View>
        <View
          style={{
            marginLeft: 24,
            marginRight: 24,
            width: 'auto',
            height: '100%',
          }}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 40,
              maxWidth: '90%',
            }}
          >
            {film.title}
          </Text>
          <View>
            {isLoading ? (
              <ActivityIndicatorWithErrorHandling
                error={error}
                onPress={getDetails}
                style={{ marginTop: '20%' }}
                color={'#FC3627'}
              ></ActivityIndicatorWithErrorHandling>
            ) : (
              <View>
                <Text style={{ color: 'white' }}>{filmDetails.desc}</Text>
                <View style={{ marginTop: 4 }}>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 30 }}>Hosts:</Text>
                  {filmDetails.links
                    .sort((a, b) => b.qualityVersion.localeCompare(a.qualityVersion))
                    .sort((a, b) => a.language.localeCompare(b.language))
                    .map((link, key) => {
                      if (!link.language) return;
                      return <HostBox navigation={navigation} host={link}></HostBox>;
                    })}
                  <View style={{ width: 100 }}></View>
                </View>
              </View>
            )}
          </View>
          {isLoading ? <View style={{ height: '40%' }}></View> : <></>}
        </View>
      </ScrollView>
    </View>
  );
};

export default SerialEpisodeDetails;
