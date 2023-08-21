import * as React from 'react';
import {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import {ActivityIndicator, TextInput} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {encode} from 'base-64';
import FilmBox from './components/FilmBox';
import ActivityIndicatorWithErrorHandling from './components/ActivityIndicatorWithErrorHandling';

const SearchScreen = ({navigation}) => {
  const [query, setQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [results, setResults] = useState([]);

  const fetch = async () => {
    setError(undefined);
    setLoading(true);
    try {
      const searchRes = await axios.get(
        `https://filman-api.awfulworld.space/v1/search?cookies=${await AsyncStorage.getItem(
          'user/cookies',
        )}&query=${encode(query)}`,
        {timeout: 30000},
      );
      if (searchRes.data.success) {
        setResults(searchRes.data.answer);
        setLoading(false);
      } else {
        console.log(searchRes.data.error);
        setError({name: 'custom', message: searchRes.data.error});
      }
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  return (
    <View
      style={{
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#0E0E0E',
      }}>
      <View
        style={{
          marginTop: 12,
          margin: 24,
          width: 'auto',
          height: 55,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={{
            height: '100%',
            width: 55,
            borderBottomLeftRadius: 15,
            borderTopLeftRadius: 15,
            marginRight: 3,
            backgroundColor: '#292929',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <SvgUri
            width={'25'}
            height={'25'}
            style={{margin: 10}}
            svgXmlData={
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path fill="#fff" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>'
            }></SvgUri>
        </TouchableOpacity>

        <View
          style={{
            height: '100%',
            width: '66%',
            marginRight: 3,
            backgroundColor: '#292929',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            style={{
              backgroundColor: '#292929',
              flex: 1,
              justifyContent: 'center',
            }}
            value={query}
            onChangeText={text => setQuery(text)}
            activeUnderlineColor={'#292929'}
            cursorColor={'white'}
            textColor={'white'}
            placeholder={'Search here'}></TextInput>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={async () => {
            if (!query) return;
            await fetch();
          }}
          style={{
            height: '100%',
            width: 55,
            borderBottomRightRadius: 15,
            borderTopRightRadius: 15,
            backgroundColor: '#292929',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <SvgUri
            width={'25'}
            height={'25'}
            style={{margin: 10}}
            svgXmlData={
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path fill="#fff" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>'
            }></SvgUri>
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: 'relative',
          marginTop: 0,
          width: 'auto',
          height: '85%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {isLoading ? (
          <ActivityIndicatorWithErrorHandling
            error={error}
            onPress={fetch}
            color={'#FC3627'}></ActivityIndicatorWithErrorHandling>
        ) : (
          <ScrollView fadingEdgeLength={70} style={{}}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
              {isLoading ? (
                <ActivityIndicator color={'#FC3627'} />
              ) : (
                <>
                  {results.length > 0 ? (
                    results.map((film, i) => (
                      <FilmBox navigation={navigation} key={i} film={film} />
                    ))
                  ) : (
                    <></>
                  )}
                </>
              )}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default SearchScreen;
