import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        display: 'flex',
        backgroundColor: 'green',
    },
    header: {
        flex: 1,
        backgroundColor: 'green',
        justifyContent: 'center',
        //borderBottomLeftRadius: 30,
        //borderBottomRightRadius: 30
        //alignContent: 'center'
    },
    formcontainer: {
        flex: 1,
        backgroundColor: '#fff',
        //bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderColor: 'yellow',
        borderLeftWidth: 3,
        borderRightColor: 3,
        borderTopWidth: 3,
        paddingVertical: 50,
        paddingHorizontal: 50,
        justifyContent: 'center'
    },
    inputView: {
        padding: 15,
        marginTop: 10,
        marginBottom: 10
    }
})