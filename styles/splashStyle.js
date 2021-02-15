import { Dimensions, StyleSheet } from 'react-native';

const dimScreen = Dimensions.get("screen");
const splashStyle = StyleSheet.create({
    container: {
        backgroundColor: 'green', flex: 1, alignItems: 'center', justifyContent: 'center'
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
    splashBottomDiv: { marginBottom: 40, alignContent: 'center' },
    bottomDivTextDiv: { marginBottom: 40, opacity: 0.8, backgroundColor: '#8f7371', alignContent: 'center' },
    bottomDivText: { color: '#fff', fontSize: 15, textAlign: 'center', fontWeight: 'bold' },
    bottomDivButtonDiv: { marginBottom: 9, padding: 15, marginLeft: 20, marginRight: 20, alignContent: 'center', alignItems: 'center', backgroundColor: 'green' },
    bottomDivButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 20, opacity: 0.9 }
});

export default splashStyle;