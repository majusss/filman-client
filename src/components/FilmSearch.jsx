import {Text, View} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import {TouchableRipple} from 'react-native-paper';

const FilmSearch = ({onPress}) => {
  return (
    <TouchableRipple
      onPress={onPress}
      borderless={true}
      rippleColor="rgba(0, 0, 0, .32)"
      style={{
        backgroundColor: '#292929',
        position: 'absolute',
        top: '8.5%',
        width: 'auto',
        left: 24,
        right: 24,
        height: '7%',
        borderRadius: 8,
        justifyContent: 'center',
      }}>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginLeft: 24}}>
        <SvgUri
          width={20}
          height={20}
          svgXmlData={
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path fill="#8C8C8C" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>'
          }></SvgUri>
        <Text style={{color: '#8C8C8C', marginLeft: 8}}>Search video</Text>
      </View>
    </TouchableRipple>
  );
};

export default FilmSearch;