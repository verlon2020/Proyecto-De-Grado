import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../credenciales'; // Importa `db` correctamente
import { doc, setDoc } from 'firebase/firestore'; // Asegúrate de tener estas funciones
import { COLORS, SPACING, FONTS, globalStyles } from '../theme';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState(null);

  const handleRegister = async () => {
    if (!email || !password || !name || !role) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      // Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar datos adicionales en Firestore
      const userDocRef = doc(db, 'users', user.uid); // Usa `db` como referencia a Firestore
      await setDoc(userDocRef, {
        uid: user.uid,
        name: name,
        email: email,
        role: role,
        createdAt: new Date().toISOString(),
      });

      Alert.alert('¡Éxito!', 'Registro completado');
      navigation.replace(role === 'Cliente' ? 'ClienteMain' : 'PaseadorMain');
    } catch (error) {
      console.error(error); // Log del error para mayor visibilidad
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'Este correo electrónico ya está en uso');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'El correo electrónico no es válido');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Error', 'La contraseña es muy débil');
      } else {
        Alert.alert('Error', 'No se pudo completar el registro');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>
      
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.roleText}>Selecciona tu rol:</Text>
        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[styles.roleButton, role === 'Cliente' && styles.activeRoleButton]}
            onPress={() => setRole('Cliente')}
          >
            <Text style={[styles.roleButtonText, role === 'Cliente' && styles.activeRoleButtonText]}>
              Cliente
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roleButton, role === 'Paseador' && styles.activeRoleButton]}
            onPress={() => setRole('Paseador')}
          >
            <Text style={[styles.roleButtonText, role === 'Paseador' && styles.activeRoleButtonText]}>
              Paseador
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.linkContainer}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión aquí</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    justifyContent: 'center',
  },
  title: {
    ...globalStyles.title,
    marginBottom: SPACING.xl,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: SPACING.md,
  },
  input: {
    ...globalStyles.input,
  },
  roleText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  roleButton: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: 10,
    backgroundColor: COLORS.background,
    marginHorizontal: SPACING.xs,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeRoleButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  roleButtonText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    fontWeight: FONTS.weights.medium,
  },
  activeRoleButtonText: {
    color: COLORS.white,
  },
  button: {
    ...globalStyles.button,
  },
  buttonText: {
    ...globalStyles.buttonText,
  },
  linkContainer: {
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  linkText: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.md,
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;

