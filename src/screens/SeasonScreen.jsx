import * as React from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SvgUri from 'react-native-svg-uri';

const SearchScreen = ({navigation, route}) => {
  const season = route.params.season;
  const film = route.params.film;
  return (
    <View
      style={{
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#0E0E0E',
      }}>
      <StatusBar
        translucent={false}
        backgroundColor="#0E0E0E"
        barStyle="light-content"
      />
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
            width: Dimensions.get('window').width - 48 - 55,
            marginRight: 3,
            backgroundColor: '#292929',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomRightRadius: 15,
            borderTopRightRadius: 15,
          }}>
          <Text
            style={{
              margin: 8,
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            {film.title.trim()}: {season.name}
          </Text>
        </View>
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
          left: 24,
          right: 24,
        }}>
        <ScrollView fadingEdgeLength={70} style={{}}>
          {season.episodes
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(episode => (
              <TouchableOpacity
                onPress={() =>
                  navigation.replace('Episode', {
                    film: {
                      title: episode.name,
                      desc: undefined,
                      imageUrl: film.imageUrl,
                      qualityVersion: undefined,
                      viewCount: undefined,
                      link: episode.url,
                    },
                  })
                }
                style={{marginBottom: 20}}>
                <Text style={{color: 'white', fontSize: 15, marginTop: 3}}>
                  {episode.name}
                </Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default SearchScreen;
