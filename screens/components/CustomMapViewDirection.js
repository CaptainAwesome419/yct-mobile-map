import React, { useRef, useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions'
import { AppConstants } from '../../appconstants/AppConstants';
import { Tooltip, Text } from 'react-native-elements';

const CustomMapViewDirection = ({ directionDetails, markers }) => {
    const [region, setRegion] = useState(AppConstants.yctRegion);
    const mapRef = useRef();
    const [distance, setDistance] = useState('');
    const [time, setTime] = useState('');
    const tooltipRef = useRef();

    useEffect(() => {
        if (directionDetails != null) {
            //tooltipRef.current.toggleTooltip();
        }
        if (mapRef.current) {
            mapRef.current.setMapBoundaries([{ latitude: 6.515535102016946, longitude: 3.370529065352547 },
            { latitude: 6.522816485113751, longitude: 3.3789131486742234 }]);
            // list of _id's must same that has been provided to the identifier props of the Marker
            console.log('markers: ', markers)
            if (markers !== null) {
                let markerIdentifiers = [];
                markers.forEach(element => {
                    markerIdentifiers.push(element.identifier);
                });
                mapRef.current.fitToSuppliedMarkers(markerIdentifiers);
            } else {
                markers = [];
            }
            console.log('Direction details to render: ' + directionDetails == null ? null : JSON.stringify(directionDetails));

        }
    }, [markers]);

    const doRegionChange = () => {
        console.log('Region change triggered')
        //setRegion(AppConstants.yctRegion);
    }
    return (
        <View style={mapstyles.container}>
            <View style={mapstyles.toolTip}>
                <Text>From To</Text>
            </View>
            <MapView
                ref={mapRef}
                showsUserLocation={true}
                provider={PROVIDER_GOOGLE}
                //region={region}
                initialRegion={region}
                onRegionChangeComplete={doRegionChange}
                style={mapstyles.map}
                loadingEnabled={true}

            >
                {/* {
                    directionDetails !== null && (
                        <Tooltip popover={<Text>Info here</Text>}>
                            <Text>Press me</Text>
                        </Tooltip>
                    )
                } */}
                {directionDetails !== null && (
                    <MapViewDirections
                        origin={directionDetails.origin}
                        destination={directionDetails.destination}
                        apikey={AppConstants.googleApiKey}
                        mode={'WALKING'}
                        strokeWidth={4}

                        strokeColor={'#074502'}
                        optimizeWaypoints={true}
                        onReady={result => {
                            setDistance(result.distance);
                            setTime(result.duration);
                            console.log(`Distance: ${distance} km`)
                            console.log(`Duration: ${time} min.`)

                        }}
                    />)}

                {
                    markers.map(marker =>
                    (<Marker
                        key={marker.identifier}
                        identifier={marker.identifier}
                        coordinate={marker.coordinate}
                        title={marker.title}
                        description={marker.description}
                        precision={'high'}
                        pinColor={'#074502'}
                    />)
                    )

                }



            </MapView>
        </View>
    )
}
const mapstyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,

    },
    toolTip: {
        ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        bottom: 80,
        height: 120,
        backgroundColor: '#fff'
    }
})
export default CustomMapViewDirection
