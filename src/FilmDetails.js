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
import { ActivityIndicator } from 'react-native-paper';
import * as ScreenOrientation from 'expo-screen-orientation';
import ActivityIndicatorWithErrorHandling from './components/ActivityIndicatorWithErrorHandling';
import SeasonBox from './components/SeasonBox';
import HostBox from './components/HostBox';

const FilmDetails = ({ navigation, route }) => {
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

  if (film.title.includes('/')) {
    film.title = film.title.split('/')[0];
  }
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
          <Text style={{ color: '#8C8C8C', bottom: -6 }}>
            {isLoading ? '' : filmDetails.categories.join(' ').toUpperCase()}
          </Text>
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
          <Text style={{ color: 'white' }}>{film.desc}</Text>
          <View
            style={{
              width: '100%',
              height: 55,
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                width: '49%',
                height: '100%',
                backgroundColor: '#292929',
                marginRight: '1%',
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <SvgUri
                width={24}
                height={24}
                svgXmlData={
                  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path fill="#fff" d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z"/></svg>'
                }
              ></SvgUri>
              {film.releaseDate !== undefined ? (
                <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 8 }}>
                  {film.releaseDate}
                </Text>
              ) : isLoading ? (
                <ActivityIndicator style={{ marginLeft: 8 }} color={'white'}></ActivityIndicator>
              ) : (
                <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 8 }}>
                  {filmDetails.releaseDate}
                </Text>
              )}
            </View>
            <View
              style={{
                width: '49%',
                height: '100%',
                backgroundColor: '#292929',
                marginLeft: '1%',
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <SvgUri
                width={24}
                height={24}
                svgXmlData={
                  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path fill="#fff" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>'
                }
              ></SvgUri>
              {film.viewCount !== undefined ? (
                <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 8 }}>
                  {film.viewCount?.split(' ')[0]}
                </Text>
              ) : isLoading ? (
                <ActivityIndicator style={{ marginLeft: 8 }} color={'#white'}></ActivityIndicator>
              ) : (
                <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 8 }}>
                  {filmDetails.viewCount?.split(' ')[0]}
                </Text>
              )}
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: 55,
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                height: '100%',
                width: '100%',
                backgroundColor: '#292929',
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              {isLoading ? (
                <ActivityIndicator color={'white'}></ActivityIndicator>
              ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <SvgUri
                    width={24}
                    height={24}
                    svgXmlData={
                      isLoading
                        ? '<svg></svg>'
                        : filmDetails.isSerialPage
                        ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path fill="#fff" d="M88 0C74.7 0 64 10.7 64 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C120.5 112.3 128 119.9 128 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C119.5 47.7 112 40.1 112 24c0-13.3-10.7-24-24-24zM32 192c-17.7 0-32 14.3-32 32V416c0 53 43 96 96 96H288c53 0 96-43 96-96h16c61.9 0 112-50.1 112-112s-50.1-112-112-112H352 32zm352 64h16c26.5 0 48 21.5 48 48s-21.5 48-48 48H384V256zM224 24c0-13.3-10.7-24-24-24s-24 10.7-24 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C232.5 112.3 240 119.9 240 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C231.5 47.7 224 40.1 224 24z"/></svg>'
                        : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path fill="#fff" d="M57.7 193l9.4 16.4c8.3 14.5 21.9 25.2 38 29.8L163 255.7c17.2 4.9 29 20.6 29 38.5v39.9c0 11 6.2 21 16 25.9s16 14.9 16 25.9v39c0 15.6 14.9 26.9 29.9 22.6c16.1-4.6 28.6-17.5 32.7-33.8l2.8-11.2c4.2-16.9 15.2-31.4 30.3-40l8.1-4.6c15-8.5 24.2-24.5 24.2-41.7v-8.3c0-12.7-5.1-24.9-14.1-33.9l-3.9-3.9c-9-9-21.2-14.1-33.9-14.1H257c-11.1 0-22.1-2.9-31.8-8.4l-34.5-19.7c-4.3-2.5-7.6-6.5-9.2-11.2c-3.2-9.6 1.1-20 10.2-24.5l5.9-3c6.6-3.3 14.3-3.9 21.3-1.5l23.2 7.7c8.2 2.7 17.2-.4 21.9-7.5c4.7-7 4.2-16.3-1.2-22.8l-13.6-16.3c-10-12-9.9-29.5 .3-41.3l15.7-18.3c8.8-10.3 10.2-25 3.5-36.7l-2.4-4.2c-3.5-.2-6.9-.3-10.4-.3C163.1 48 84.4 108.9 57.7 193zM464 256c0-36.8-9.6-71.4-26.4-101.5L412 164.8c-15.7 6.3-23.8 23.8-18.5 39.8l16.9 50.7c3.5 10.4 12 18.3 22.6 20.9l29.1 7.3c1.2-9 1.8-18.2 1.8-27.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>'
                    }
                  ></SvgUri>
                  <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 8 }}>
                    {filmDetails.isSerialPage
                      ? filmDetails.season.length
                      : film.qualityVersion.replace('|', ' ').replace('   ', ' ')}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View>
            {isLoading ? (
              <ActivityIndicatorWithErrorHandling
                error={error}
                onPress={getDetails}
                style={{ marginTop: '20%' }}
                color={'#FC3627'}
              ></ActivityIndicatorWithErrorHandling>
            ) : filmDetails.isSerialPage ? (
              <View style={{ marginTop: 5 }}>
                {filmDetails.season
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((season) => {
                    return (
                      <SeasonBox navigation={navigation} season={season} film={film}></SeasonBox>
                    );
                  })}
              </View>
            ) : (
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
            )}
          </View>
          {isLoading ? <View style={{ height: '40%' }}></View> : <></>}
        </View>
      </ScrollView>
    </View>
  );
};

export default FilmDetails;
