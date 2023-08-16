import * as React from 'react';
import { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from 'expo-screen-orientation';

const PlayerScreen = ({ navigation, route }) => {
  useEffect(async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    StatusBar.setHidden(true);
  }, []);

  useEffect(() => {
    const orientationDidChange = ScreenOrientation.addOrientationChangeListener(
      async (newOrientation) => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      }
    );

    return () => {
      ScreenOrientation.removeOrientationChangeListener(orientationDidChange);
    };
  }, []);

  const injectJavaScript = `
window.originalClickHandler = function(event) {}
setInterval(() => {
  document.querySelectorAll('iframe').forEach((e) => e.remove());
}, 100);
const videoPlayer = document.querySelector('video');
const videoParent = videoPlayer.parentNode;
while (videoParent.firstChild) {
  if (videoParent.firstChild !== videoPlayer) {
    videoParent.removeChild(videoParent.firstChild);
  } else {
    break;
  }
}
const chuj = document.createElement('div');
chuj.className = 'vjs-watermark-content';
videoPlayer.style.width = '100%';
videoPlayer.style.height = 'auto';
videoPlayer.style.maxHeight = '100vh';
document.body.innerHTML = '';
document.body.style.backgroundColor = "black";
document.body.appendChild(chuj);
document.body.appendChild(videoPlayer);
document.body.style.overflow = 'hidden';
document.body.style.backgroundColor = "black";
videoPlayer.play();
videoPlayer.requestFullscreen();

`;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'red',
      }}
    >
      <WebView
        source={{ uri: route.params.link }}
        injectedJavaScript={injectJavaScript}
        mediaPlaybackRequiresUserAction={false}
        allowsFullscreenVideo={true}
        onError={(e) => {
          console.log(e);
        }}
        style={{}}
        onShouldStartLoadWithRequest={(event) => {
          return false;
        }}
      />
    </View>
  );
};

export default PlayerScreen;
