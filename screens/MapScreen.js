import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, Text, KeyboardAvoidingView, Button } from 'react-native'
import Autocomplete from 'react-native-autocomplete-input';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import mapstyles from '../styles/mapstyles';
import { urlConstants } from './UrlConstants';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MapScreen = () => {

    const [selectedValue, setSelectedValue] = useState({});
    const [region, setRegion] = useState({
        latitude: 6.500558,
        longitude: 3.345037,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    });
    const [resultList, setResultList] = useState([]);
    const [showAddButton, setShowAddButton] = useState(false);
    const [longLat, setLongLat] = useState({ long: '', lat: '' });

    const handleSearch = (text) => {

        console.log('Text: ' + text);
        console.log(text)
        let url = urlConstants.queryLocation + text;
        console.log(url)
        axios.get(url).then((response) => {
            console.log(response.data);
            let apiResponse = response.data;
            let code = apiResponse.code;
            if (code === '00') {
                setShowAddButton(false);
                let data = apiResponse.data;
                console.log('after successful: data: ' + data)
                setResultList(data);
            } else {
                setShowAddButton(true);
            }
            console.log('resultList: ' + resultList);
        }).catch(error => console.log(error));
    }
    return (
        // <View style={{ flex: 1 }}>
        <View style={mapstyles.container}>
            <StatusBar backgroundColor={'green'} />
            <View style={{ backgroundColor: 'transparent', height: 60, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Autocomplete containerStyle={mapstyles.autocompleteContainer} onChangeText={(text) => handleSearch(text)} placeholder='Search Location'
                    data={resultList}
                    autoCorrect={false}
                    renderItem={({ item }) => (
                        // For the suggestion view
                        <TouchableOpacity
                            onPress={() => {
                                if (!showAddButton) {
                                    setSelectedValue(item);
                                    console.log('SelectedItem: ' + JSON.stringify(item))
                                    let longReponse = item.location[0];
                                    setLongLat({ long: longReponse.longitude, lat: longReponse.latitude })
                                    setResultList([]);
                                } else {

                                }
                            }}>
                            <Text style={mapstyles.itemText}>
                                {item.id === 0 ? item.location[0].name : item.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
                <View style={mapstyles.descriptionContainer}>
                    {resultList.length > 0 ? (
                        <>
                            <Text style={mapstyles.infoText}>
                                {selectedValue.name}
                            </Text>
                            <Text style={mapstyles.infoText}>
                                {/* {JSON.stringify(selectedValue)} */}
                                {selectedValue.description}
                            </Text>
                        </>
                    ) : (
                            <View style={mapstyles.infoText}>
                                <Button title='Not Found. Add Now'></Button>
                            </View>
                        )}
                </View>
            </View>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={mapstyles.map}
                region={region}
            />
        </View>
        // </View>
    )
}

export default MapScreen;
