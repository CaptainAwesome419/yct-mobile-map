import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import SplashScreen from './screens/SplashScreen';
import PlaceScreen from './screens/PlaceScreen';
import HomeScreen from './screens/HomeScreen';
import { createAppContainer } from 'react-navigation';
import { View } from 'react-native';

//import { View } from 'react-native';


const Stack = createStackNavigator({
  SplashScreen: {
    screen: SplashScreen,

  },
  HomeScreen: {
    screen: HomeScreen,
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
    <View style={{ flex: 1, alignContent: 'center' }}>
      <StatusBar backgroundColor={'green'} />
      <Container />
    </View>
    // <Container />
  );
}