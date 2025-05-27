import { Image, Platform, Pressable, Text, TextInput, View } from "react-native";
import styles from "./Styles";
import { useEffect, useRef, useState } from "react";
import MapView, { Camera, LatLng, Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteRef } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import { container } from "../../../../di/container";
import { PlaceDetail } from "../../../../domain/models/PlaceDetail";
import { PlaceGeocodeDetail } from "../../../../domain/models/PlaceGeocodeDetail";

export default function ClientSearchMapScreen() {
  const [location, setLocation] = useState<Region | undefined>(undefined);
  const [selectePlace, setSelectPlace] = useState<LatLng | undefined>();
  const [inputText, setInputText] = useState<string>('')
  const autocompleteTextRef = useRef<GooglePlacesAutocompleteRef>(null);
  const mapRef = useRef<MapView>(null);
  const [isUserMovingMap, setIsUserMovingMap] = useState<boolean>(true);
  const viewModel = container.resolve('clientSearchMapViewModel')
  
  // Para imprimir el useState porque se setea asincronicamente
  useEffect(() => {
    console.log('RESPONSE Selected Place:\n', selectePlace);
  }, [selectePlace])  //Hasta que cambia, selectedPlace se imprime

  // Generar coordenadas de un lugar a partir de texto plano (Google Autocomplete y placeId) - GEOCODIFICAR
  const handleGetPlaceDetails = async (placeId: string) => {
    const response: PlaceDetail | null  = await viewModel.getPlaceDetails(placeId);
    if(response !== null) {
      const lat = response!.result.geometry.location.lat;
      const lng = response!.result.geometry.location.lng;
      setSelectPlace({
        latitude: lat,
        longitude: lng,
      })
      // Despues de obtener las coordenadas de un lugar especifico se mueve el mapa a ese punto
      moveMapToLocation(lat,lng);
    }
  }

  // Generar direcciones a partir de un par de coordenadas (lat,lng) - GEODECODIFICAR
  const handleGetPlaceDetailsByCoords = async (lat: number, lng: number) => {
    const response: PlaceGeocodeDetail | null  = await viewModel.getPlaceDetailsByCoords(lat,lng);
    if(response !== null) {
      const address = response.results[0].formatted_address;
      console.log('DIRECCION: ',address);
      await autocompleteTextRef.current?.setAddressText(address);
      await setInputText(address);
    }
  }

  const moveMapToLocation = (lat: number, lng: number) => {
    setIsUserMovingMap(false);
     // A partir de aqui, cualquier cambio en el mapa sera mediante programacion
    const camera: Camera = {
      center: {
        latitude: lat,
        longitude: lng,
      },
      pitch: 0,
      heading: 0,
      zoom: 17,
    };
    mapRef.current?.animateCamera(camera, {duration: 1000})
    setTimeout(() => {
      setIsUserMovingMap(true);
    }, 1200); // Despues de los cambios por programacion en el mapa, todos los cambios solo seran por el usuario
  }

  // Permisos de ubicacion del dispositivo
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
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421,
      });
      setSelectPlace({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
    })();
  }, []);

  if (!location) {
    return <View style={styles.container}></View>;
  }

  return (
    <View style={styles.container}>
      <MapView 
        ref={mapRef}
        style={styles.map} 
        initialRegion={location}
        onRegionChangeComplete={(region)=>{
          //Si el usuario no esta moviendo el mapa (el mapa se mueve por autocomplete) entonces no geodecodifica
          if(!isUserMovingMap) return
          console.log('REGION:\n',region);
          handleGetPlaceDetailsByCoords(region.latitude, region.longitude);
        }}
      >
        {/* <Marker
          coordinate={{
            latitude: location!.latitude,
            longitude: location!.longitude,
          }}
          title="Mi ubicación"
        /> */}
      </MapView>
      <GooglePlacesAutocomplete
        ref={autocompleteTextRef}
        minLength={4}
        styles={{
          container: styles.placeAutocomplete,
          textInput: styles.textInputAutocomplete
        }}
        placeholder="Intoduce punto de partida"
        onPress={(data) => {
          setInputText(data.description);
          handleGetPlaceDetails(data.place_id);
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
              onPress={async () => {
                console.log('clear');
                await autocompleteTextRef.current?.setAddressText('');
                await setInputText('');
              }}
              style={styles.clearAutocompleteButton}
            >
              <Text style={styles.clearAutocompleteText}>×</Text>
            </Pressable>
          ) : (
            <></>
          )
        }
      />
      <Image
      style={styles.pinImageMap}
        source={require('../../../../assets/pin_red.png')}
      />
    </View>
  );
}
