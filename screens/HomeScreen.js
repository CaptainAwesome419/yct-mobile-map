import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import MapScreen from './MapScreen'

var deviceWidth = Dimensions.get('screen').width;
const HomeScreen = () => {
    return (
        <View style={{
            flex: 1, width: deviceWidth, alignContent: 'center', justifyContent: 'center'

        }}>
            <View style={{}} >
                <TextInput placeholder='Enter Location' />
            </View>
            <MapScreen />
        </View >
    )
}

export default HomeScreen
