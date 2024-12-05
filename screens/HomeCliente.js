import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location"; // Para obtener la ubicación
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { COLORS, SPACING, FONTS, globalStyles } from "../theme";

const HomeCliente = ({ navigation }) => {
  const [mascotas, setMascotas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [direccion, setDireccion] = useState("Obteniendo ubicación...");
  const [location, setLocation] = useState(null);

  // Obtener ubicación del usuario
  const obtenerUbicacion = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setDireccion("Permiso denegado para acceder a la ubicación");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.01, // Nivel de zoom
        longitudeDelta: 0.01,
      });

      // Convertir coordenadas en dirección
      const geocode = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (geocode.length > 0) {
        const { street, city, region } = geocode[0];
        setDireccion(`${street}, ${city}, ${region}`);
      } else {
        setDireccion("Dirección no encontrada");
      }
    } catch (error) {
      console.error(error);
      setDireccion("Error obteniendo ubicación");
    }
  }, []);

  useEffect(() => {
    obtenerUbicacion();
  }, [obtenerUbicacion]);

  // Función para cargar las mascotas desde Firestore
  const cargarMascotas = useCallback(() => {
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const q = query(
        collection(db, "mascotas"),
        where("userId", "==", user.uid)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const mascotasData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMascotas(mascotasData);
        setIsLoading(false);
      });

      // Limpiar el listener cuando el componente se desmonte
      return () => unsubscribe();
    }
  }, []);

  useEffect(() => {
    cargarMascotas();
  }, [cargarMascotas]);

  // Función para eliminar una mascota
  const eliminarMascota = (mascotaId) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar esta mascota?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            const db = getFirestore();
            try {
              const mascotaRef = doc(db, "mascotas", mascotaId);
              await deleteDoc(mascotaRef);
              Alert.alert("Éxito", "Mascota eliminada correctamente");
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar la mascota");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido, Cliente</Text>
      <Text style={styles.locationText}>Ubicación: {direccion}</Text>

      {/* Mapa */}
      {location && (
        <MapView style={styles.map} region={location} showsUserLocation={true}>
          <Marker coordinate={location} title="Tu ubicación" />
        </MapView>
      )}

      {/* Opción: Mis Mascotas */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AgregarMascota")}
      >
        <Text style={styles.buttonText}>Mis Mascotas</Text>
      </TouchableOpacity>

      {/* Lista de mascotas registradas */}
      {isLoading ? (
        <Text style={styles.loadingText}>Cargando mascotas...</Text>
      ) : (
        <FlatList
          data={mascotas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.mascotaCard}>
              <Text style={styles.mascotaName}>{item.nombre}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => eliminarMascota(item.id)}
              >
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No tienes mascotas registradas.
            </Text>
          }
        />
      )}

      {/* Opción: Buscar Paseador */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("BuscarPaseadores")}
      >
        <Text style={styles.buttonText}>Buscar Paseadores</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  ...globalStyles,
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
  },
  title: {
    ...globalStyles.title,
    marginBottom: SPACING.lg,
  },
  locationText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textLight,
    marginBottom: SPACING.md,
  },
  map: {
    width: "100%",
    height: 300,
    marginBottom: SPACING.md,
  },
  button: {
    ...globalStyles.button,
    marginTop: SPACING.lg,
  },
  buttonText: {
    ...globalStyles.buttonText,
  },
  mascotaCard: {
    ...globalStyles.card,
    marginBottom: SPACING.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mascotaName: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.text,
  },
  deleteButton: {
    backgroundColor: COLORS.danger,
    padding: SPACING.sm,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: COLORS.white,
    fontWeight: FONTS.weights.bold,
  },
  emptyText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textLight,
    textAlign: "center",
    marginTop: SPACING.lg,
  },
  loadingText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textLight,
    textAlign: "center",
    marginTop: SPACING.lg,
  },
});

export default HomeCliente;
