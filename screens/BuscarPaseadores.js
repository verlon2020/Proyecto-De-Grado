import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/Ionicons";
import { getFirestore, collection, addDoc, serverTimestamp, query, onSnapshot, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { COLORS, SPACING, FONTS, globalStyles } from "../theme";

const { width, height } = Dimensions.get("window");

const BuscarPaseadores = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState("");
  const [duracion, setDuracion] = useState("");
  const [precio, setPrecio] = useState("");
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    // Obtener las mascotas desde Firestore
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
      });

      // Limpiar el listener cuando el componente se desmonte
      return () => unsubscribe();
    }
  }, []);

  const solicitarPaseo = async () => {
    if (!mascotaSeleccionada || !duracion || !precio) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    // Obtener el ID del usuario actual
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        // Guardar la solicitud en Firestore
        await addDoc(collection(db, "solicitudes"), {
          clienteId: user.uid, // ID del cliente
          mascotaId: mascotaSeleccionada, // ID de la mascota seleccionada
          duracion: duracion,
          precio: precio,
          estado: "pendiente", // Estado inicial
          fechaCreacion: serverTimestamp(), // Fecha de creación
          ubicacion: location ? { lat: location.coords.latitude, lng: location.coords.longitude } : null, // Ubicación del cliente
        });

        Alert.alert("Éxito", "Solicitud enviada al paseador");
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "Hubo un problema al enviar la solicitud");
      }
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Buscar Paseador</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Selecciona tu Mascota</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={mascotaSeleccionada}
            onValueChange={(itemValue) => setMascotaSeleccionada(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecciona una mascota" value="" />
            {mascotas.map((m) => (
              <Picker.Item
                key={m.id}
                label={`${m.nombre} (${m.raza})`}
                value={m.id}
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Detalles del Paseo</Text>
        <View style={styles.inputRow}>
          <View style={styles.inputWrapper}>
            <Icon
              name="time-outline"
              size={20}
              color={COLORS.primary}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Duración (min)"
              keyboardType="numeric"
              value={duracion}
              onChangeText={setDuracion}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Icon
              name="cash-outline"
              size={20}
              color={COLORS.primary}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Precio ($)"
              keyboardType="numeric"
              value={precio}
              onChangeText={setPrecio}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.mainButton} onPress={solicitarPaseo}>
        <Icon
          name="paw"
          size={20}
          color={COLORS.white}
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonText}>Solicitar Paseo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollViewContent: {
    paddingBottom: SPACING.xl,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  backButton: {
    marginRight: SPACING.md,
  },
  title: {
    ...globalStyles.title,
    flex: 1,
    textAlign: "left",
    marginVertical: 0,
  },
  sectionContainer: {
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  pickerContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  picker: {
    height: 50,
  },
  mapContainer: {
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  map: {
    width: "100%",
    height: height * 0.3,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginHorizontal: SPACING.xs,
  },
  inputIcon: {
    marginLeft: SPACING.sm,
  },
  input: {
    ...globalStyles.input,
    flex: 1,
    marginVertical: 0,
    marginLeft: SPACING.sm,
    borderWidth: 0,
    paddingVertical: SPACING.md,
  },
  mainButton: {
    ...globalStyles.button,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: SPACING.md,
    marginTop: SPACING.lg,
  },
  buttonIcon: {
    marginRight: SPACING.sm,
  },
  buttonText: {
    ...globalStyles.buttonText,
  },
});

export default BuscarPaseadores;
