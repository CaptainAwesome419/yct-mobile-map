import { Dimensions, StatusBar, StyleSheet } from 'react-native'
//import { StatusBar } from 'expo-status-bar';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
export default StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        backgroundColor: '#fff',
    },
    searchView: {
        position: 'absolute',
        display: 'flex',
    },
    floatingButton: {
        position: 'absolute',
        backgroundColor: '#035923',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    autocompleteView: {
        //opacity: 0.9,
        height: 60,
        top: StatusBar.currentHeight + 10,
        marginLeft: 10,
        position: 'relative',
        //zIndex: 10,
    },
    searchBox: {
        width: 250,
        height: 45,
        fontSize: 14,
        borderRadius: 8,
        borderColor: '#aaa',
        color: '#000',
        backgroundColor: '#fff',
        borderWidth: 1.5,
        paddingLeft: 15,
    },
    closeButtonParent: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,

    },
    resultItem: {
        borderRadius: 8,
        borderStyle: 'solid',
        borderBottomColor: '#035923',
        borderBottomWidth: 1,
        paddingTop: 8,
        paddingBottom: 8
    },
    noResultItem: {
        borderRadius: 8,
        height: 30,
        alignContent: 'center',
        borderStyle: 'solid',
        backgroundColor: '#035923',
        color: '#fff',
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        paddingTop: 8,
        paddingBottom: 8
    },
    searchResultsContainer: {
        width: 250,
        maxHeight: 110,
        backgroundColor: '#fff',
        position: 'absolute',
        top: 50,
    },
    bottomSearchResult: {
        //position: 'absolute',
        // display: 'flex',
        height: 100,
        backgroundColor: '#fff',
        top: StatusBar.currentHeight + 10
    },
    locationDetails: {
        display: 'flex',
        paddingLeft: 10,
        paddingRight: 10,
    },
    locationDetailsButton: {
        marginTop: 25,

    },
    directionButton: {
        width: 120,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#035923',
    },
    directionSelectView: {
        paddingTop: 20,
        display: 'flex',
        paddingBottom: 15,
        bottom: 0,
        //alignItems: 'center',
        backgroundColor: '#035923',
        height: 400,

    },
    directionSelection: {
        flex: 2,
        alignItems: 'center',
    },
    directionOthers: {
        flex: 1,
        bottom: 40,
        display: 'flex',
        alignItems: 'center',

    },

    directionSearchBox: {
        width: 250,
        height: 35,
        fontSize: 14,
        borderRadius: 8,
        borderColor: '#aaa',
        color: '#fff',
        backgroundColor: '#035923',
        borderWidth: 1.5,
        paddingLeft: 15,
    },






});