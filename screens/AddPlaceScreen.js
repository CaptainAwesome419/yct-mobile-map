import React, { useState, useEffect } from 'react'
import { Alert, Button, Text, View } from 'react-native'
import axios from 'axios';
import { urlConstants } from './UrlConstants';
import styles from '../styles/addplacestyles';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import Spinner from 'react-native-loading-spinner-overlay';

const AddPlaceScreen = ({ navigation }) => {
    //const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [location, setLocation] = useState(null);
    const [showLoader, setShowLoader] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        let url = urlConstants.fetchMainLocations;
        console.log(url)
        axios.get(url).then((response) => {
            console.log(response.data);
            let apiResponse = response.data;
            let code = apiResponse.code;
            if (code === '00') {
                var fetchedCategories = [];
                apiResponse.data.forEach(data => {
                    fetchedCategories.push({ label: data.name, value: data.id });
                });
                setLocations(fetchedCategories);
            }

        }).catch(error => console.log(error));


    }, []);

    const handleSubmit = () => {
        if (name === '' || description === '' || location === '') {
            Alert.alert(
                "Empty Field(s)",
                'Please fill all fields appropriately',
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            );
        } else {
            const submitValue = { name: name, description: description, location: [{ id: location }] }
            var jsonData = JSON.stringify(submitValue);
            console.log('jsonData: ' + jsonData);
            setShowLoader(true);
            axios.post(urlConstants.addLocation, submitValue)
                .then((response) => {
                    setShowLoader(false);
                    let responseData = response.data;
                    let code = responseData.code;
                    if (code === '00') {
                        setName('');
                        setDescription('')
                        Alert.alert(
                            "Successful",
                            responseData.message,
                            [
                                { text: "OK", onPress: () => navigation.navigate('MapScreen') }
                            ],
                            { cancelable: false }
                        );

                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }



    }

    return (
        <View style={styles.container}>
            <Spinner
                visible={showLoader}
                textContent={'Processing...'}
                textStyle={{ color: '#FFF' }}
            />
            <View style={styles.header}>
                <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>
                    Please Go ahead and add a new location
                </Text>
            </View>

            <View style={styles.formcontainer} >
                <View style={styles.inputView}>
                    <Text>Location:</Text>
                    <TextInput
                        placeholder='Name of location'
                        mode='outlined'
                        label='Name'
                        style={{ borderBottomWidth: 1 }}
                        onChangeText={(text) => setName(text)}
                    />
                </View>
                <View style={styles.inputView}>
                    <Text>Description:</Text>
                    <TextInput
                        placeholder='Description of location'
                        mode='outlined'
                        style={{ borderBottomWidth: 1, height: 40 }}
                        onChangeText={(text) => setDescription(text)}
                    />
                </View>
                <View style={styles.inputView}>
                    <Text>Where is it Located?</Text>
                    <DropDownPicker
                        items={locations}
                        containerStyle={{ height: 40 }}
                        style={{ backgroundColor: '#fafafa' }}
                        dropDownStyle={{ backgroundColor: '#fafafa', height: 100 }}
                        onChangeItem={item => setLocation(item.value)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TouchableOpacity onPress={handleSubmit}>
                        {/* <Text style={{ color: '#fff', paddingLeft: 15, paddingRight: 15, textAlign: 'center' }}>Submit</Text> */}
                        <Button color='#035923' title='Save'></Button>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    )
}

export default AddPlaceScreen
