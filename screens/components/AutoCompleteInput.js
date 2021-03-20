import React from 'react'
import { View, Text, StatusBar, TextInput, StyleSheet } from 'react-native'

const AutoCompleteInput = ({ onChangeText, value, resultList }) => {

    return (
        <View style={styles.autocompleteView}>
            <TextInput
                placeholder="Search for an address"
                placeholderTextColor="#fff"
                style={styles.searchBox}
                onChangeText={onChangeText}
                value={value}
                clearButtonMode={'while-editing'}
            />
            {
                resultList.length > 0 && (

                    <FlatList
                        data={resultList}
                        renderItem={({ item, index }) => {
                            return (
                                <View>
                                    <TouchableOpacity
                                        style={styles.resultItem}
                                        onPress={() => handleLocationSelect(item)}>
                                        <Text>{item.name}</Text>

                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                        keyExtractor={(item) => item.id.toString()}
                        style={styles.searchResultsContainer}
                    />
                )

            }

        </View>
    )
}

const styles = StyleSheet.create({

    autocompleteView: {
        height: 30,
        marginLeft: 10,
        position: 'relative',
    },
    searchBox: {
        width: 250,
        height: 30,
        fontSize: 14,
        borderRadius: 8,
        borderColor: '#aaa',
        color: '#000',
        backgroundColor: '#fff',
        borderWidth: 1.5,
        paddingLeft: 15,
    },
    resultItem: {
        borderRadius: 8,
        borderStyle: 'solid',
        borderBottomColor: '#035923',
        borderBottomWidth: 1,
        paddingTop: 8,
        paddingBottom: 8
    },
    searchResultsContainer: {
        width: 250,
        maxHeight: 200,
        backgroundColor: '#fff',
        position: 'absolute',
        top: 50,
    }


});

export default AutoCompleteInput
