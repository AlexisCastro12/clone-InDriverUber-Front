import {
  Image,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import styles from "./Styles";
import { useEffect, useRef, useState } from "react";
import MapView, {
  Camera,
  LatLng,
  Marker,
  Polyline,
  Region,
} from "react-native-maps";
import * as Location from "expo-location";
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import { container } from "../../../../di/container";
import { PlaceDetail } from "../../../../domain/models/PlaceDetail";
import { PlaceGeocodeDetail } from "../../../../domain/models/PlaceGeocodeDetail";
import { ClientSearchMapViewModel } from "./ClientSearchMapViewModel";
import { GoogleDirections } from "../../../../domain/models/GoogleDirections";
import { decode } from "@googlemaps/polyline-codec";

export default function ClientSearchMapScreen() {
  const [location, setLocation] = useState<Region | undefined>(undefined);
  const [originPlace, setOriginPlace] = useState<
    | {
        lat: number;
        lng: number;
        address: string;
      }
    | undefined
  >(undefined);
  const [destinationPlace, setDestinationPlace] = useState<
    | {
        lat: number;
        lng: number;
        address: string;
      }
    | undefined
  >(undefined);
  const [originText, setOriginText] = useState<string>("");
  const [destinationText, setDestinationText] = useState<string>("");
  const [isUserMovingMap, setIsUserMovingMap] = useState<boolean>(true);
  const [directionsRoute, setDirectionsRoute] = useState<LatLng[]>([]);
  const [shouldDrawRoute, setShouldDrawRoute] = useState<boolean>(false);

  const autocompleteOriginTextRef = useRef<GooglePlacesAutocompleteRef>(null);
  const autocompleteDestinationTextRef =
    useRef<GooglePlacesAutocompleteRef>(null);
  const mapRef = useRef<MapView>(null);

  const viewModel: ClientSearchMapViewModel = container.resolve(
    "clientSearchMapViewModel"
  );

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
    })();
  }, []);

  useEffect(() => {
    if (originPlace !== undefined && destinationPlace !== undefined && shouldDrawRoute) {
      console.log("Ya se seleccionaron los datos de ubicacion");
      console.log("ORIGIN:\n", originPlace);
      console.log("DESTINATION:\n", destinationPlace);
      handleGetDirections(); // Hasta que se seleccionen los dos lugares correctamente se traza la ruta
    } else {
      console.log("Error al dibujar la ruta");
    }
  }, [originPlace, destinationPlace, shouldDrawRoute]);

  if (!location) {
    return <View style={styles.container}></View>;
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
    mapRef.current?.animateCamera(camera, { duration: 1000 });
    setTimeout(() => {
      setIsUserMovingMap(true);
    }, 1200); // Despues de los cambios por programacion en el mapa, todos los cambios solo seran por el usuario
  };

  // Generar coordenadas de un lugar a partir de texto plano (Google Autocomplete y placeId) - GEOCODIFICAR
  const handleGetPlaceDetails = async (placeId: string, isOrigin: boolean) => {
    const response: PlaceDetail | null = await viewModel.getPlaceDetails(
      placeId
    );
    if (response !== null) {
      const lat = response.result.geometry.location.lat;
      const lng = response.result.geometry.location.lng;
      const address = response.result.formatted_address;
      if (isOrigin) {
        setOriginPlace({
          lat: lat,
          lng: lng,
          address: address,
        });
        // Despues de obtener las coordenadas de un lugar especifico se mueve el mapa a ese punto
        // Solo para seleccionar punto de partida
        moveMapToLocation(lat, lng);
      } else {
        setDestinationPlace({
          lat: lat,
          lng: lng,
          address: address,
        });
      }
      setShouldDrawRoute(true); // Cada que se cambian los destinos desde el autocomplete
    }
  };

  // Generar direcciones a partir de un par de coordenadas (lat,lng) - GEODECODIFICAR
  const handleGetPlaceDetailsByCoords = async (lat: number, lng: number) => {
    const response: PlaceGeocodeDetail | null =
      await viewModel.getPlaceDetailsByCoords(lat, lng);
    if (response !== null) {
      const address = response.results[0].formatted_address;
      console.log("DIRECCION Origen: ", address);
      // Solo se geodecodifica con el punto de partida (trabaja con el marcador en el mapa)
      autocompleteOriginTextRef.current?.setAddressText(address);
      if(originPlace === undefined) {
        setShouldDrawRoute(true); // Cada que no este definido un punto de partida
        setOriginPlace({
          lat: lat,
          lng: lng,
          address: address,
        }); // El marcador de partida solo se deja fijo siempre que no exista anteriormente
      }
      else {
        setShouldDrawRoute(false);
      }
      setOriginText(address);
    }
  };

  const handleGetDirections = async () => {
    //Como ya manejara variables de estado (originPlace y destinationPlace) es mejor manejarla desde un useEffect
    const response: GoogleDirections | null = await viewModel.getDirections(
      {
        latitude: originPlace!.lat,
        longitude: originPlace!.lng,
      },
      {
        latitude: destinationPlace!.lat,
        longitude: destinationPlace!.lng,
      }
    );
    if (response !== null) {
      if (response.routes.length) {
        const points = response.routes[0].overview_polyline.points;
        const coordinates = decode(points).map(([lat, lng]) => ({
          latitude: lat,
          longitude: lng,
        }));
        setDirectionsRoute(coordinates);
      }
    }
  };
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        zoomControlEnabled = {true}
        initialRegion={location}
        onRegionChangeComplete={(region) => {
          //Si el usuario no esta moviendo el mapa (el mapa se mueve por autocomplete) entonces no geodecodifica
          if (!isUserMovingMap) return;
          handleGetPlaceDetailsByCoords(region.latitude, region.longitude);
        }}
      >
        {
          originPlace && (
            <Marker
            coordinate={{
            latitude: originPlace!.lat,
            longitude: originPlace!.lng,
          }}
          title="Punto de Partida"
        >
          <View style={{width:50, height:50}}>
            <Image
              source={require('../../../../assets/pin_map.png')}
              style={{width:35, height:35, resizeMode: 'contain'}}
            />
          </View>
        </Marker>
          )
        }
        {
          destinationPlace && (
            <Marker
            coordinate={{
            latitude: destinationPlace!.lat,
            longitude: destinationPlace!.lng,
          }}
          title="Punto de Partida"
        >
          <View style={{width:50, height:50}}>
            <Image
              source={require('../../../../assets/flag.png')}
              style={{width:35, height:35, resizeMode: 'contain'}}
            />
          </View>
        </Marker>
          )
        }
        {
        directionsRoute.length > 0 && (
          <Polyline
            coordinates={directionsRoute}
            strokeWidth={6}
            strokeColor="red"
          />
        )}
      </MapView>
      <GooglePlacesAutocomplete
        ref={autocompleteOriginTextRef}
        minLength={4}
        styles={{
          container: styles.placeOriginAutocomplete,
          textInput: styles.textInputAutocomplete,
        }}
        placeholder="Intoduce punto de partida"
        onPress={(data) => {
          setOriginText(data.description);
          handleGetPlaceDetails(data.place_id, true); // is Origin: True para el primer autocomplete
        }}
        textInputProps={{
          onChangeText: (text) => setOriginText(text),
          value: originText,
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
          originText.length > 0 ? (
            <Pressable
              onPress={async () => {
                console.log("clear Origin");
                await autocompleteOriginTextRef.current?.setAddressText("");
                setOriginText("");
                setOriginPlace(undefined);
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

      <GooglePlacesAutocomplete
        ref={autocompleteDestinationTextRef}
        minLength={4}
        styles={{
          container: styles.placeDestinationAutocomplete,
          textInput: styles.textInputAutocomplete,
        }}
        placeholder="Intoduce punto de destino"
        onPress={(data) => {
          setDestinationText(data.description);
          handleGetPlaceDetails(data.place_id, false); // isOrigin: false para el segundo autocomplete
        }}
        textInputProps={{
          onChangeText: (text) => setDestinationText(text),
          value: destinationText,
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
          destinationText.length > 0 ? (
            <Pressable
              onPress={async () => {
                console.log("clear Destination");
                await autocompleteDestinationTextRef.current?.setAddressText(
                  ""
                );
                setDestinationText("");
                setDestinationPlace(undefined);
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
        source={require("../../../../assets/pin_red.png")}
      />
    </View>
  );
}
