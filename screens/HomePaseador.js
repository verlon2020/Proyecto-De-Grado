import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location"; // Para obtener la ubicación en tiempo real

const HomePaseador = ({ navigation }) => {
  const [location, setLocation] = useState(null); // Coordenadas actuales
  const [direccion, setDireccion] = useState("Obteniendo ubicación..."); // Dirección actual

  // Obtener ubicación del usuario
  const obtenerUbicacion = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setDireccion("Permiso denegado para acceder a la ubicación");
        return;
      }

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000, // Actualizar cada segundo
          distanceInterval: 1, // Actualizar si se mueve más de 1 metro
        },
        async (currentLocation) => {
          const { latitude, longitude } = currentLocation.coords;
          setLocation({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });

          // Convertir coordenadas en dirección
          const geocode = await Location.reverseGeocodeAsync({
            latitude,
            longitude,
          });

          if (geocode.length > 0) {
            const { street, city, region } = geocode[0];
            setDireccion(`${street}, ${city}, ${region}`);
          } else {
            setDireccion("Dirección no encontrada");
          }
        }
      );
    } catch (error) {
      console.error(error);
      setDireccion("Error obteniendo ubicación");
    }
  }, []);

  useEffect(() => {
    obtenerUbicacion();
  }, [obtenerUbicacion]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido, Paseador</Text>
      <Text style={styles.locationText}>Ubicación: {direccion}</Text>

      {/* Mapa */}
      {location && (
        <MapView style={styles.map} region={location} showsUserLocation={true}>
          <Marker coordinate={location} title="Tu ubicación" />
        </MapView>
      )}

      {/* Botón para ver solicitudes */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("VerSolicitudes")}
      >
        <Text style={styles.buttonText}>Ver Solicitudes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  locationText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  map: {
    width: "100%",
    height: 300,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomePaseador;
