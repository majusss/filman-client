import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableRipple } from 'react-native-paper';

const FilmBox = ({ navigation, film }) => {
  const maxFontSize = 50;
  const minFontSize = 7;
  const maxVisualWidth = 50;
  const baseFontSize = 20;
  const averageCharWidth = 8;
  if (film.title.includes('/')) {
    film.title = film.title.split('/')[0];
  }
  const maxChars = Math.floor(maxVisualWidth / averageCharWidth);
  const fontSize = Math.max(
    minFontSize,
    Math.min((baseFontSize * maxChars) / film.title.length, maxFontSize)
  );
  const textHeight = fontSize * 1.1;
  return (
    <ImageBackground
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: 130,
        height: 180,
        margin: 10,
        borderRadius: 20,
        overflow: 'hidden',
        borderColor: '#8C8C8C',
        borderWidth: 1,
      }}
      source={{ uri: film.imageUrl }}
    >
      <LinearGradient
        colors={['transparent', 'rgba(14,14,14,0.73)', '#0E0E0E']}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          height: '100%',
        }}
      >
        <View
          style={{
            height: 170 - textHeight,
          }}
        ></View>
        <Text
          style={{
            color: 'white',
            fontSize: fontSize,
            maxHeight: 50,
          }}
          numberOfLines={1}
        >
          {film.title}
        </Text>
      </View>
      <TouchableRipple
        style={{ position: 'absolute', width: '100%', height: '100%' }}
        onPress={() => {
          navigation.navigate('Film', { film });
        }}
        rippleColor="rgba(255, 255, 255, .64)"
      >
        <View></View>
      </TouchableRipple>
    </ImageBackground>
  );
};

export default FilmBox;
