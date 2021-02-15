import React from 'react'
import { View, Text } from 'react-native'
import { Marker } from 'react-native-maps'

const CustomMarker = ({ long, lat }) => {
    return (
        <View>
            <Marker coordinate={{ latitude: lat, longitude: long }} />
        </View>
    )
}

export default CustomMarker
