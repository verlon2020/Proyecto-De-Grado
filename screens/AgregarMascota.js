import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../credenciales';
import { COLORS, SPACING, FONTS, globalStyles } from '../theme';

const AgregarMascota = ({ navigation }) => {
  const [mascota, setMascota] = useState({
    nombre: '',
    edad: '',
    peso: '',
    raza: '',
    contacto: '',
    direccion: '',
    preferencias: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const guardarMascota = async () => {
    if (!mascota.nombre || !mascota.edad || !mascota.peso || !mascota.raza) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    setIsLoading(true);

    try {
      const mascotaData = {
        nombre: mascota.nombre,
        edad: parseFloat(mascota.edad),
        peso: parseFloat(mascota.peso),
        raza: mascota.raza,
        contacto: mascota.contacto,
        direccion: mascota.direccion,
        preferencias: mascota.preferencias,
        userId: auth.currentUser.uid,
        createdAt: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, 'mascotas'), mascotaData);
      Alert.alert(
        'Éxito',
        'Mascota agregada correctamente',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'No se pudo guardar la mascota: ' + (error.message || 'Error desconocido')
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={mascota.nombre}
          onChangeText={(text) => setMascota({ ...mascota, nombre: text })}
          placeholder="Nombre de tu mascota"
        />

        <Text style={styles.label}>Edad (años)</Text>
        <TextInput
          style={styles.input}
          value={mascota.edad}
          onChangeText={(text) => setMascota({ ...mascota, edad: text })}
          placeholder="Edad"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Peso (kg)</Text>
        <TextInput
          style={styles.input}
          value={mascota.peso}
          onChangeText={(text) => setMascota({ ...mascota, peso: text })}
          placeholder="Peso"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Raza</Text>
        <TextInput
          style={styles.input}
          value={mascota.raza}
          onChangeText={(text) => setMascota({ ...mascota, raza: text })}
          placeholder="Raza"
        />

        <Text style={styles.label}>Número de contacto</Text>
        <TextInput
          style={styles.input}
          value={mascota.contacto}
          onChangeText={(text) => setMascota({ ...mascota, contacto: text })}
          placeholder="Teléfono de contacto"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Dirección</Text>
        <TextInput
          style={styles.input}
          value={mascota.direccion}
          onChangeText={(text) => setMascota({ ...mascota, direccion: text })}
          placeholder="Dirección donde vive"
          multiline
        />

        <Text style={styles.label}>Preferencias</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={mascota.preferencias}
          onChangeText={(text) => setMascota({ ...mascota, preferencias: text })}
          placeholder="Preferencias especiales"
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity 
          style={[styles.button, isLoading && styles.buttonDisabled]} 
          onPress={guardarMascota}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.buttonText}>Guardar Mascota</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  form: {
    padding: SPACING.md,
  },
  label: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  input: {
    ...globalStyles.input,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    ...globalStyles.button,
    marginTop: SPACING.lg,
  },
  buttonText: {
    ...globalStyles.buttonText,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});

export default AgregarMascota;