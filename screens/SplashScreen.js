import React from 'react';
import { View, Text, SafeAreaView, Image, Dimensions, ImageBackground, Button, StatusBar, StyleSheet } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

const dimScreen = Dimensions.get("window");

function SplashScreen({ navigation }) {
    return (
        <SafeAreaView style={splashStyle.container}>
            <ImageBackground
                source={require('../images/yctBackground.jpg')}
                imageStyle=
                {{ opacity: 0.8, }}
                style={splashStyle.imgBckgrnd}
            >
                <Image
                    source={require('../images/logoyct.png')}
                    style={splashStyle.logo}
                >
                </Image>
                <View style={splashStyle.splashBottomDiv}>
                    <View style={splashStyle.bottomDivTextDiv}>
                        <Text style={splashStyle.bottomDivText}>
                            Experience an easy way to navigate around the campus. Faster and more efficiently
                        </Text>
                    </View>
                    <View style={splashStyle.bottomDivButtonDiv} >
                        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                            <Text style={splashStyle.bottomDivButtonText} >Go To Map</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>

        </SafeAreaView >
    )
}

const splashStyle = StyleSheet.create({
    container: {
        backgroundColor: 'green', flex: 1, alignItems: 'center', justifyContent: 'center', resizeMode: 'cover'
    },
    imgBckgrnd: {
        flex: 1,
        resizeMode: 'cover',
        width: dimScreen.width
    },
    logo: {
        flex: 1,
        resizeMode: 'center',
        width: dimScreen.width,
        height: dimScreen.height
    },
    splashBottomDiv: { marginBottom: 40, alignContent: 'center', resizeMode: 'center' },
    bottomDivTextDiv: { marginBottom: 40, opacity: 0.8, backgroundColor: 'transparent', alignContent: 'center' },
    bottomDivText: { color: '#fff', fontSize: 15, textAlign: 'center', fontWeight: 'bold', backgroundColor: 'transparent' },
    bottomDivButtonDiv: { marginBottom: 9, padding: 15, marginLeft: 20, marginRight: 20, alignContent: 'center', alignItems: 'center', backgroundColor: 'green' },
    bottomDivButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 20, opacity: 0.9 }
});

export default SplashScreen

