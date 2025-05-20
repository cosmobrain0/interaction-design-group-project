import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LocationPicker() {
  const [region, setRegion] = useState({
    latitude: 52.2044132,
    longitude: 0.1056739,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [marker, setMarker] = useState({
    latitude: 52.2044132,
    longitude: 0.1056739,
  });

  const mapRef = useRef<MapView>(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
      <View style={{ position: 'absolute', top: 0, width: '100%', zIndex: 99 }}>
        <GooglePlacesAutocomplete
          keyboardShouldPersistTaps="handled"
          placeholder="Search for a location"
          fetchDetails={true}
          predefinedPlaces={[]}
          nearbyPlacesAPI="GooglePlacesSearch"
          textInputProps={{ onFocus: () => {} , placeholderTextColor: "#000"}}
          onPress={(data, details = null) => {
            if (data.description) {
              AsyncStorage.setItem('selectedLocationName', data.description)
                .then(() => console.log('Location saved',data.description))
                .catch(err => console.warn('Save failed', err));
            }
            if (!details || !details.geometry) return;
            const lat = details.geometry.location.lat;
            const lng = details.geometry.location.lng;
            const newRegion = {
              ...region,
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            };
            setRegion(newRegion);
            setMarker({ latitude: lat, longitude: lng });
            mapRef.current?.animateToRegion(newRegion, 1000);
          }}
          query={{
            key: 'AIzaSyAs1kLToLR4dB6I6bUp3cw5-ni6bv-ojwM',
            language: 'en',
          }}
          minLength={2}
          debounce={300}
          onFail={(error) => console.warn("GooglePlacesAutocomplete Error:", error)}
          styles={{
            container: {
              flex: 0,
              position: 'absolute',
              width: '100%',
              top: 0,
              zIndex: 5,
            },
            textInputContainer: {
              backgroundColor: '#ccc',
              paddingHorizontal: 10,
              paddingTop: 20,
              borderTopWidth: 0,
              borderBottomWidth: 0,
              zIndex: 6,
            },
            textInput: {
              height: 44,
              color: '#000',
              backgroundColor: '#ccc',
              fontSize: 16,
            },
            listView: {
              backgroundColor: 'white',
              zIndex: 99,
              elevation: 10,
              position: 'absolute',
              top: 64,
              width: '100%',
              maxHeight: 300,
            },
          }}
        />
      </View>
      <MapView
        ref={mapRef}
        style={[styles.map, { zIndex: 1 }]}
        region={region}
        onRegionChangeComplete={setRegion}
        onPress={(event) => {
          const { latitude, longitude } = event.nativeEvent.coordinate;
          setMarker({ latitude, longitude });
          setRegion({ ...region, latitude, longitude });
        }}
      >
        <Marker coordinate={marker} />
      </MapView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});