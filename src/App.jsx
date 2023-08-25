import HelloScreen from './screens/HelloScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import PlayerScreen from './screens/PlayerScreen';
import SearchScreen from './screens/SearchScreen';
import SeasonScreen from './screens/SeasonScreen';
import FilmDetails from './screens/FilmDetails';
import SerialEpisodeDetails from './screens/SerialEpisodeDetails';

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
