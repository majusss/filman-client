import { SafeAreaView, ScrollView, View } from 'react-native';
import ProfileLabel from './components/ProfileLabel';
import FilmSearch from './components/FilmSearch';
import HorizontalFilmsList from './components/HorizontalFilmsList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import ActivityIndicatorWithErrorHandling from './components/ActivityIndicatorWithErrorHandling';
import * as ScreenOrientation from 'expo-screen-orientation';

const HelloScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [films, setFilms] = useState({});

  useEffect(async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }, []);

  async function fetchFilms() {
    setError(undefined);
    setLoading(true);
    try {
      const filmsRes = await axios.get(
        `http://192.168.0.125:3000/v1/news?cookies=${await AsyncStorage.getItem('user/cookies')}`,
        { timeout: 30000 }
      );
      if (filmsRes.data.success) {
        setFilms(filmsRes.data.news);
        setLoading(false);
      } else {
        console.log(filmsRes.data.error);
        setError({ name: 'custom', message: filmsRes.data.error });
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
      }}
    >
      <ProfileLabel></ProfileLabel>
      <FilmSearch
        onPress={() => {
          navigation.navigate('Search');
        }}
      ></FilmSearch>
      {isLoading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
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
        <SafeAreaView
          style={{
            position: 'absolute',
            width: '100%',
            top: '18%',
            height: '82%',
          }}
        >
          <ScrollView style={{ display: 'flex' }} fadingEdgeLength={70}>
            <HorizontalFilmsList
              navigation={navigation}
              category={'Filmy Na Czasie'}
              films={films.filmyNaCzasie}
            ></HorizontalFilmsList>
            <HorizontalFilmsList
              navigation={navigation}
              category={'Gorące Filmy'}
              films={films.goraceFilmy}
            ></HorizontalFilmsList>
            <HorizontalFilmsList
              navigation={navigation}
              category={'Seriale Na Czasie'}
              films={films.serialeNaCzasie}
            ></HorizontalFilmsList>
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
};

export default HelloScreen;
