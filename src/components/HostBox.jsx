import {Image, Text, View} from 'react-native';
import * as React from 'react';
import {TouchableRipple} from 'react-native-paper';

const HostBox = ({navigation, host, afterClick}) => {
  return (
    <TouchableRipple
      onPress={() => {
        navigation.navigate('Player', {link: host.link});
        afterClick();
      }}
      borderless={true}
      rippleColor="rgba(255, 255, 255, .32)"
      style={{
        borderColor: '#292929',
        height: 70,
        borderWidth: 3,
        marginTop: 15,
        borderRadius: 20,
        justifyContent: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'white', marginRight: 10}}>{host.language}</Text>
        <Text style={{color: 'white', marginRight: 10}}>
          {host.qualityVersion}
        </Text>
        <Image
          style={{width: 50, height: 50}}
          width={50}
          height={50}
          source={{
            uri: host.hostingImg,
          }}></Image>
      </View>
    </TouchableRipple>
  );
};

export default HostBox;
