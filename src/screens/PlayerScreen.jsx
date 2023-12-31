import * as React from 'react';
import {StatusBar, View} from 'react-native';
import {WebView} from 'react-native-webview';

const PlayerScreen = ({navigation, route}) => {
  const injectJavaScript = `
setInterval(() => {
  document.querySelectorAll('iframe').forEach((e) => e.remove());
}, 100);
document.body.style.overflow = 'hidden';
document.body.style.backgroundColor = "black";
`;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'red',
      }}>
      <StatusBar hidden></StatusBar>
      <WebView
        source={{uri: route.params.link}}
        injectedJavaScript={injectJavaScript}
        mediaPlaybackRequiresUserAction={false}
        allowsFullscreenVideo={true}
        setSupportMultipleWindows={false}
        onError={e => {
          console.log(e);
        }}
        style={{}}
        onShouldStartLoadWithRequest={event => {
          return false;
        }}
      />
    </View>
  );
};

export default PlayerScreen;
