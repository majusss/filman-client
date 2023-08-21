import {ScrollView, Text, View} from 'react-native';
import FilmBox from './FilmBox';
import * as React from 'react';

const HorizontalFilmsList = ({navigation, category, films}) => {
  // console.log(films);
  return (
    <View
      style={{
        height: 235,
        // paddingLeft: 8,
        // paddingRight: 8,
      }}>
      <Text
        style={{
          color: 'white',
          marginLeft: 24,
          fontWeight: 'bold',
          fontSize: 24,
        }}>
        {category}
      </Text>
      <ScrollView
        horizontal
        style={{
          flex: 1,
          height: 240,
        }}>
        <View style={{width: 12, height: '100%'}}></View>
        {films.map((film, i) => (
          <FilmBox navigation={navigation} key={i} film={film} />
        ))}
        <View style={{width: 12, height: '100%'}}></View>
      </ScrollView>
    </View>
  );
};

export default HorizontalFilmsList;
