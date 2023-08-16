import { Text, View } from 'react-native';
import * as React from 'react';
import { TouchableRipple } from 'react-native-paper';

const SeasonBox = ({ navigation, film, season }) => {
  return (
    <View
      style={{
        backgroundColor: '#292929',
        marginTop: 15,
        borderRadius: 30,
      }}
    >
      <TouchableRipple
        borderless={true}
        onPress={() => {
          navigation.navigate('Season', { season, film });
        }}
        rippleColor="rgba(255, 255, 255, .64)"
        style={{
          borderRadius: 30,
        }}
      >
        <View
          style={{
            padding: 20,
            paddingTop: 10,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25 }}>{season.name}</Text>
          {season.episodes
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((episode) => (
              <Text style={{ color: 'white', fontSize: 15, marginTop: 3 }}>{episode.name}</Text>
            ))}
        </View>
      </TouchableRipple>
    </View>
  );
};

export default SeasonBox;
