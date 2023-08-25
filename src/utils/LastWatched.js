import AsyncStorage from '@react-native-community/async-storage';

export const getLastWatched = async () => {
  const out = JSON.parse(await AsyncStorage.getItem('lastWatchedFilms'));
  return out === undefined ? [] : out;
};

export const addLastWatched = async (serial, lastEpisode) => {
  if (serial.title.startsWith('['))
    serial.title = serial.title.split(' ').shift().join(' ');
  let lastWatched = await getLastWatched();
  if (!lastWatched) lastWatched = [];
  const checkPreviews = lastWatched.filter(
    watched => watched?.serial?.link !== serial.link,
  );
  checkPreviews.push({serial, lastEpisode, date: Date.now()});
  await AsyncStorage.setItem('lastWatchedFilms', JSON.stringify(checkPreviews));
};
