import { Colors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HeaderBackButton } from '@react-navigation/elements';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import 'react-native-get-random-values';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';

export default function LocationPicker() {
  const [region, setRegion] = useState({
    latitude: 52.2044132,
    longitude: 0.1056739,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
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
            disableScroll={true}
            isRowScrollable={false}
            textInputProps={{
              placeholderTextColor: Colors.foregroundTertiary,
              clearButtonMode: "while-editing"
            }}
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
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              };
              setRegion(newRegion);
              setMarker({ latitude: lat, longitude: lng });
              AsyncStorage.setItem('selectedLocationCoords', JSON.stringify({ lat, lng }))
                .then(() => console.log('Coordinates saved', { lat, lng }))
                .catch(err => console.warn('Coordinate save failed', err));
              mapRef.current?.animateToRegion(newRegion, 1000);
            }}
            query={{
              key: 'AIzaSyBMdzTFSC8XZdPD4vxIDLcEpDKac_H30-0',
              language: 'en'
            }}
            minLength={3}
            debounce={500}
            styles={searchStyles}
            renderLeftButton={() => (
              <HeaderBackButton onPress={router.back}
                tintColor={Colors.foregroundPrimary}
              />
            )}
            onFail={(error) => console.warn("GooglePlacesAutocomplete Error:", error)}
          />
        </View>
        <MapView
          ref={mapRef}
          style={[styles.map]}
          region={region}
          onRegionChangeComplete={setRegion}
          // onPress={(event) => {
          //   const { latitude, longitude } = event.nativeEvent.coordinate;
          //   setMarker({ latitude, longitude });
          //   setRegion({ ...region, latitude, longitude });
          // }}
        >
          <Marker coordinate={marker} />
        </MapView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    zIndex: -1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
});

const searchStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  textInputContainer: {
    backgroundColor: Colors.boxDark,
    paddingHorizontal: 10,
    margin: 10,
    marginBottom: 0,
    borderRadius: 8
  },
  textInput: {
    marginTop: 5,
    color: Colors.foregroundPrimary,
    backgroundColor: Colors.boxDark,
    fontSize: 22,
  },
  listView: {
    borderTopWidth: 0.2,
    borderColor: Colors.foregroundTertiary,
    elevation: 10,
    margin: 10,
    marginTop: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  row: {
    color: Colors.foregroundPrimary,
    backgroundColor: Colors.boxLight
  },
  description: {
    color: Colors.foregroundPrimary,
    fontSize: 17
  },
  separator: {
    backgroundColor: Colors.foregroundTertiary
  }
})