import HelloScreen from './src/HelloScreen';
import LoginScreen from './src/LoginScreen';
import HomeScreen from './src/HomeScreen';
import PlayerScreen from './src/PlayerScreen';
import SearchScreen from './src/SearchScreen';
import SeasonScreen from './src/SeasonScreen';
import FilmDetails from './src/FilmDetails';
import SerialEpisodeDetails from './src/SerialEpisodeDetails';

import * as React from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppRegistry, StatusBar, View} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {useEffect, useState} from 'react';

const Stack = createNativeStackNavigator();
export default function App() {
  const [initialRoute, setInitialRoute] = useState('');
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function checkFirstOpen() {
      const firstOpen = await AsyncStorage.getItem('firstOpen');
      if (firstOpen === 'false') {
        setInitialRoute('Home');
      } else {
        setInitialRoute('Hello');
      }
      setLoading(false);
    }

    checkFirstOpen();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <PaperProvider>
      <StatusBar backgroundColor="#0E0E0E" barStyle="light-content" />
      <View
        style={{
          flex: 1,
          backgroundColor: '#0E0E0E',
        }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={initialRoute}>
            <Stack.Screen
              name="Hello"
              component={HelloScreen}
              options={{orientation: 'portrait'}}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{orientation: 'portrait'}}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{orientation: 'portrait'}}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{orientation: 'portrait'}}
            />
            <Stack.Screen
              name="Film"
              component={FilmDetails}
              options={{orientation: 'portrait'}}
            />
            <Stack.Screen
              name="Episode"
              component={SerialEpisodeDetails}
              options={{orientation: 'portrait'}}
            />
            <Stack.Screen
              name="Player"
              component={PlayerScreen}
              options={{orientation: 'landscape'}}
            />
            <Stack.Screen
              name="Season"
              component={SeasonScreen}
              options={{orientation: 'portrait'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </PaperProvider>
  );
}

AppRegistry.registerComponent('Filman Client', () => App);
