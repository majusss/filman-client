import {ScrollView, Text, View} from 'react-native';
import ProfileLabel from '../components/ProfileLabel';
import FilmSearch from '../components/FilmSearch';
import HorizontalFilmsList from '../components/HorizontalFilmsList';
import {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import ActivityIndicatorWithErrorHandling from '../components/ActivityIndicatorWithErrorHandling';
import * as React from 'react';
import {getLastWatched} from '../utils/LastWatched';

const HelloScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [films, setFilms] = useState({});
  const [lastWatched, setLast] = useState([]);

  async function fetchFilms() {
    setError(undefined);
    setLoading(true);
    try {
      const filmsRes = await axios.get(
        `https://filman-api.awfulworld.space/v1/news?cookies=${await AsyncStorage.getItem(
          'user/cookies',
        )}`,
        {timeout: 30000},
      );
      if (filmsRes.data.success) {
        setFilms(filmsRes.data.news);
        const viewFormat = [];
        const savedLastWatched = await getLastWatched();
        if (savedLastWatched)
          if (savedLastWatched.length > 0) {
            savedLastWatched
              .sort((a, b) => b.date - a.date)
              .map(({serial, lastEpisode}) => {
                serial.title =
                  lastEpisode.title.split(' ')[0] + ' ' + serial.title;
                viewFormat.push(serial);
              });
            setLast(viewFormat);
          } else {
            setLast([]);
          }
        setLoading(false);
      } else {
        console.log(filmsRes.data.error);
        setError({name: 'custom', message: filmsRes.data.error});
      }
    } catch (e) {
      setError(e);
    }
  }

  useEffect(() => {
    fetchFilms();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0E0E0E',
      }}>
      <ProfileLabel />
      <FilmSearch
        onPress={() => {
          navigation.navigate('Search');
        }}
      />
      {isLoading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicatorWithErrorHandling
            style={{}}
            size={'large'}
            animating={true}
            color={'#FC3627'}
            error={error}
            onPress={fetchFilms}
          />
        </View>
      ) : (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            top: '18%',
            height: '82%',
          }}>
          <ScrollView style={{display: 'flex'}} fadingEdgeLength={70}>
            {lastWatched.length > 0 && (
              <HorizontalFilmsList
                navigation={navigation}
                category={'Oglądane Seriale'}
                films={lastWatched}></HorizontalFilmsList>
            )}
            <HorizontalFilmsList
              navigation={navigation}
              category={'Filmy Na Czasie'}
              films={films.filmyNaCzasie}
            />
            <HorizontalFilmsList
              navigation={navigation}
              category={'Gorące Filmy'}
              films={films.goraceFilmy}
            />
            <HorizontalFilmsList
              navigation={navigation}
              category={'Seriale Na Czasie'}
              films={films.serialeNaCzasie}
            />
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default HelloScreen;
