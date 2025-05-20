import { Platform, Pressable, Text, View } from "react-native";
import styles from "./Styles";
import { useEffect, useRef, useState } from "react";
import MapView, { LatLng, Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteRef } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";

export default function ClientSearchMapScreen() {
  const [location, setLocation] = useState<Region | undefined>(undefined);
  const [selectePlace, setSelectPlace] = useState<LatLng | undefined>();
  const [inputText, setInputText] = useState<string>('')
  const autocompleteTextRef = useRef<GooglePlacesAutocompleteRef>(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("permiso de ubicacion denegado");
        return;
      }
      if (Platform.OS === "android") {
        const { status: backgroundStatus } =
          await Location.requestBackgroundPermissionsAsync();
        if (backgroundStatus !== "granted") {
          console.log("Permiso de ubicación en segundo plano denegado");
          return;
        }
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  if (!location) {
    return <View style={styles.container}></View>;
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={location}>
        <Marker
          coordinate={{
            latitude: location!.latitude,
            longitude: location!.longitude,
          }}
          title="Mi ubicación"
        />
      </MapView>
      <GooglePlacesAutocomplete
        ref={autocompleteTextRef}
        minLength={4}
        styles={{container: styles.placeAutocomplete}}
        placeholder="Intoduce punto de partida"
        onPress={(data) => {
          setInputText(data.description);
          console.log(data);
        }}
        textInputProps={{
          onChangeText: (text) => setInputText(text),
          value: inputText
        }}
        query={{
          key: Constants.expoConfig!.extra!.googleApiKey,
          language: "es", //Español
          components: "country:mx", //limita la busqueda al pais mx para no predecir otros lugares y reducir costos
          location: `${location!.latitude},${location!.longitude}`,
          radius: 15000,
        }}
        debounce={500}
        fetchDetails={false}
        renderRightButton={() =>
          inputText.length > 0 ? (
            <Pressable
              onPress={() => {
                console.log('clear');
                autocompleteTextRef.current?.setAddressText('');
                setInputText('');
              }}
              style={styles.clearButton}
            >
              <Text style={styles.clearText}>×</Text>
            </Pressable>
          ) : (
            <></>
          )
        }
      ></GooglePlacesAutocomplete>
    </View>
  );
}
