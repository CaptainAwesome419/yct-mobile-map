import { Dimensions, StyleSheet } from 'react-native'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
export default StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: '100%',
        marginTop: 15,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        width: '100%',
        height: '88%'
    },
    autocompleteContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        alignSelf: 'center',
        width: '90%',
        position: 'absolute'
        //width: 50
    },
    descriptionContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    itemText: {
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 5,
        margin: 2,
    },
    infoText: {
        //textAlign: 'center',
        fontSize: 16,
    }

});