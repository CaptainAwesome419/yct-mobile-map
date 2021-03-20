import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import SplashScreen from './screens/SplashScreen';
import PlaceScreen from './screens/PlaceScreen';
import MapScreen from './screens/MapScreen';
import AddPlaceScreen from './screens/AddPlaceScreen';
import { createAppContainer } from 'react-navigation';
import { View } from 'react-native';

const Stack = createStackNavigator({
  SplashScreen: {
    screen: SplashScreen,
  },
  MapScreen: {
    screen: MapScreen,
  },
  AddPlaceScreen: {
    screen: AddPlaceScreen,
  },
  PlaceScreen: {
    screen: PlaceScreen
  },
}, {
  initialRouteName: 'SplashScreen', headerMode: 'none'
});
const Container = createAppContainer(Stack);
export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={'#035923'} style="light" />
      <View style={{ flex: 1 }}>
        <Container />
      </View>
    </View>
  );
}