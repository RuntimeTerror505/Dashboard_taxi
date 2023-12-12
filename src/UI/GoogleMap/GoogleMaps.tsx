import React, { useRef, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import GoogleMapsInput from './GoogleMapsInput';

const GoogleMaps = () => {
    const mapRef = useRef<google.maps.Map | null>(null)
    const [coordinates, setCoordinates] = useState({ lat: 47.94584260193872, lng: 33.42311448349305 })

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyAVbNNSBv8rX8ftQkneIxpdVcGy-bdhUvw' || ''
    })

    const defaultOptions = {
        panControl: true,
        zoomControl:true,
        mapTypeControl: false,
        streetViewControl:false,
        scaleControl: false,
        rotateControl:false,
        clickableIcons: false,
        keyboardShortcuts: false,
        disableDoubleClickZoom: true,
        fullscreenControl: false,
    }
    
    const onLoad = React.useCallback(function callback(map:google.maps.Map) {
        mapRef.current = map
        map.fitBounds(new window.google.maps.LatLngBounds(coordinates))
    }, [])

    const onUnmount = React.useCallback(function callback() {mapRef.current = null }, [])
    console.log(coordinates)
    return isLoaded ? (
        <section className={container} >
            <GoogleMapsInput isLoaded={isLoaded} onChange={setCoordinates}/>
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '500px' }}
                center={coordinates}
                zoom={19}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={defaultOptions}
            ><Marker position={{ lng: 47.94584260193872, lat: 33.42311448349305 }}/>
            </GoogleMap>
                
        </section>
    ) : <></>
};

export default React.memo(GoogleMaps);

const container = 'flex flex-col w-full'