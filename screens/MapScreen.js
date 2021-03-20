import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements'
import mapstyles from '../styles/mapstyles';
import { urlConstants } from './UrlConstants';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import RBSheet from "react-native-raw-bottom-sheet";
import CustomMapViewDirection from './components/CustomMapViewDirection';
import * as Location from 'expo-location';
import { FAB } from 'react-native-paper';


const MapScreen = ({ navigation }) => {
    const refRBSheet = useRef();
    const refDirection = useRef();
    const [directionDetails, setDirectionDetails] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [selectedValue, setSelectedValue] = useState({});
    const [text, setText] = useState('');
    const [directionStart, setDirectionStart] = useState({});
    const [directionEnd, setDirectionEnd] = useState({});
    const [directionStartList, setDirectionStartList] = useState([]);
    const [resultList, setResultList] = useState([]);
    const [useCurrentLocation, setUseCurrentLocation] = useState(false);

    useEffect(() => {
        if (useCurrentLocation) {
            setDirectionStartList([]);
            (async () => {
                let { status } = await Location.requestPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permission Denied', 'You have denied the use of geolocation on this app')
                    return;
                }
                let curreLocation = await Location.getCurrentPositionAsync({});
                let coords = curreLocation.coords;
                console.log('locationDetails: ', JSON.stringify(curreLocation));
                setDirectionStart({
                    location: [{ latitude: coords.latitude, longitude: coords.longitude }],
                    name: 'Current Location',
                    description: 'Current Location',
                });
                setMarkers([]);
                setMarkers([{
                    coordinate: { latitude: coords.latitude, longitude: coords.longitude },
                    title: 'Current Location',
                    description: 'Current Location',
                    identifier: 'marker1'
                }])
            })();
        }

    }, [useCurrentLocation]);

    const clearAll = () => {

        setDirectionDetails(null);
        setText('');
        setMarkers([]);
        setDirectionStart({});
        setDirectionEnd({});
    }

    const fetchResult = (text, list) => {
        if (text !== '') {
            console.log('Text: ' + text);
            console.log(text);
            let url = urlConstants.queryLocation + text;
            console.log(url)
            axios.get(url).then((response) => {
                //console.log(response.data);
                let apiResponse = response.data;
                let code = apiResponse.code;
                if (code === '00') {
                    let data = apiResponse.data;
                    if (list === '1') {
                        setResultList(data);
                    } else if (list === '2') {
                        setDirectionStartList(data);
                    }
                } else {
                    setResultList([]);
                }
                //console.log('resultList: ' + resultList);
            }).catch(error => console.log(error));
        } else {
            console.log('No text entered');
            setResultList([])
            console.log('Current resultList is: ' + JSON.stringify(resultList));
        }
    }

    const updateCurrentLocation = () => {
        setUseCurrentLocation(!useCurrentLocation);
    }

    const viewDirections = () => {
        if (Object.keys(directionStart).length === 0) {
            Alert.alert(
                "Empty Selection",
                'Please select start location',
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            );
        } else {
            refDirection.current.close();
            let directionStartLocation = directionStart.location[0];
            let directionEndLocation = directionEnd.location[0];
            setDirectionDetails({
                origin: {
                    longitude: directionStartLocation.longitude,
                    latitude: directionStartLocation.latitude
                },
                destination: {
                    longitude: directionEndLocation.longitude,
                    latitude: directionEndLocation.latitude
                }
            });
            setMarkers([]);
            setMarkers([
                {
                    coordinate: { latitude: directionStartLocation.latitude, longitude: directionStartLocation.longitude },
                    title: directionStart.name,
                    description: directionStart.description,
                    identifier: 'marker1'
                },
                {
                    coordinate: { latitude: directionEndLocation.latitude, longitude: directionEndLocation.longitude },
                    title: directionEnd.name,
                    description: directionEnd.description,
                    identifier: 'marker2'
                }
            ]);
        }

    }

    const handleLocationSelect = (item) => {
        //setText(item.name)
        console.log('item selected: ' + JSON.stringify(item));
        setText(item.name);
        setSelectedValue(item);
        setDirectionEnd(item)
        setResultList([]);
        setMarkers([{
            coordinate: { latitude: item.location[0].latitude, longitude: item.location[0].longitude },
            title: item.name,
            description: item.description,
            identifier: 'marker1'
        }])
        refRBSheet.current.open();
    }


    return (
        // <View style={mapstyles.container}>
        <View style={mapstyles.container}>

            <CustomMapViewDirection
                directionDetails={directionDetails}
                markers={markers}
            />
            <FAB
                style={mapstyles.floatingButton}
                small={false}
                color={'#fff'}
                icon="close"
                onPress={clearAll}
            />
            <View style={mapstyles.searchView}>
                <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={false}
                    animationType={'slide'}
                    height={140}
                    customStyles={{
                        wrapper: {
                            ...StyleSheet.absoluteFillObject,
                            backgroundColor: "transparent",

                        },
                        draggableIcon: {
                            backgroundColor: "#000"
                        }
                    }}
                >
                    <View style={mapstyles.locationDetails}>
                        <View style={mapstyles.locationDetailsHeader}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                {selectedValue.name}
                            </Text>
                            <Text style={{ fontSize: 10 }}>
                                {selectedValue.description}
                            </Text>
                        </View>
                        <View style={mapstyles.locationDetailsButton}>
                            <TouchableOpacity
                                style={mapstyles.directionButton}
                                onPress={() => { refRBSheet.current.close(); refDirection.current.open(); setUseCurrentLocation(false); setDirectionStart({}) }}>
                                <Text style={{ padding: 10, fontSize: 14, color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
                                    Direction <FontAwesome5 name="directions" size={10} color="#fff" />
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </RBSheet>

                <RBSheet
                    ref={refDirection}
                    closeOnDragDown={true}
                    closeOnPressMask={false}
                    animationType={'slide'}
                    height={400}
                    customStyles={{
                        wrapper: {
                            //...StyleSheet.absoluteFillObject,
                            backgroundColor: "transparent",
                        },
                        draggableIcon: {
                            backgroundColor: "#035923"
                        }
                    }}
                >
                    <View style={mapstyles.directionSelectView}>
                        <View style={mapstyles.directionSelection}>
                            <View style={mapstyles.autoCompleteView}>
                                <TextInput
                                    placeholder="Enter End Location"
                                    placeholderTextColor="#fff"
                                    style={mapstyles.directionSearchBox}
                                    onChangeText={(text) => fetchResult(text, '3')}
                                    value={directionEnd.name}
                                    editable={false}
                                    clearButtonMode={'while-editing'}
                                />
                            </View>
                            <View style={{ height: 10 }}></View>
                            <View style={mapstyles.autoCompleteView}>
                                <TextInput
                                    placeholder="Enter start Location"
                                    placeholderTextColor="#fff"
                                    style={mapstyles.directionSearchBox}
                                    onChangeText={(text) => fetchResult(text, '2')}
                                    value={directionStart.name}
                                    clearButtonMode={'while-editing'}
                                    editable={!useCurrentLocation}
                                    onFocus={() => setDirectionStart({})}
                                />
                                {
                                    directionStartList.length > 0 && (

                                        <FlatList
                                            data={directionStartList}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <View>
                                                        <TouchableOpacity
                                                            style={mapstyles.resultItem}
                                                            onPress={() => { setDirectionStart(item); setDirectionStartList([]); }}>
                                                            <Text>{item.name}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                );
                                            }}
                                            keyExtractor={(item) => item.id.toString()}
                                            style={mapstyles.searchResultsContainer}
                                        />
                                    )}

                            </View>
                        </View>
                        <View style={mapstyles.directionOthers}>
                            <View >
                                <CheckBox
                                    containerStyle={{ backgroundColor: '#035923', width: 200 }}
                                    textStyle={{ color: '#fff' }}
                                    title='Use current Location'
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    checkedColor='#fff'
                                    checked={useCurrentLocation}
                                    onPress={updateCurrentLocation}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                    style={mapstyles.directionButton}
                                    onPress={viewDirections}>
                                    <Text style={{ padding: 10, fontSize: 19, color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
                                        Start <FontAwesome5 name="directions" size={10} color="#fff" />
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>


                </RBSheet>

                <View style={mapstyles.autocompleteView}>
                    <TextInput
                        placeholder="Search for an address"
                        placeholderTextColor="#000"
                        style={mapstyles.searchBox}
                        onChangeText={(text) => { setText(text); fetchResult(text, '1') }}
                        value={text}
                        clearButtonMode={'while-editing'}

                    />

                    {
                        resultList.length > 0 ? (

                            <FlatList
                                data={resultList}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View>
                                            <TouchableOpacity
                                                style={mapstyles.resultItem}
                                                onPress={() => handleLocationSelect(item)}>
                                                <Text>{item.name}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                }}
                                keyExtractor={(item) => item.id.toString()}
                                style={mapstyles.searchResultsContainer}
                            />
                        ) : (

                                <FlatList
                                    style={mapstyles.searchResultsContainer}
                                    data={[{ key: 'New' }]}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity
                                                style={mapstyles.noResultItem}
                                                onPress={() => navigation.navigate('AddPlaceScreen',)}>
                                                <View>
                                                    <Text style={{ color: '#fff' }}>Add Missing Place</Text>
                                                </View>
                                            </TouchableOpacity>
                                        );
                                    }}
                                    keyExtractor={(item) => item.key}

                                />)

                    }

                </View>

            </View>

        </View >
    )
}

export default MapScreen;
