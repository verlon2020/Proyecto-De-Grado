import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../credenciales'; // Cambiar 'firestore' por 'db'
import { doc, getDoc } from 'firebase/firestore';
import { COLORS, SPACING, FONTS, globalStyles } from '../theme';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Iniciar sesión con Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Consultar Firestore para obtener el rol del usuario
      const userDocRef = doc(db, 'users', user.uid); // Cambiar 'firestore' por 'db'
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userRole = userData.role; // Cambiar a 'role' si ese es el campo correcto en tu Firestore

        // Redirigir según el rol
        if (userRole === 'Cliente') {
          navigation.replace('ClienteMain'); // Reemplazar con la pantalla de cliente
        } else if (userRole === 'Paseador') {
          navigation.replace('PaseadorMain'); // Reemplazar con la pantalla de paseador
        } else {
          Alert.alert('Error', 'Rol de usuario desconocido');
        }
      } else {
        Alert.alert('Error', 'No se encontró la información del usuario en Firestore');
      }
    } catch (error) {
      console.error(error); // Imprimir el error en la consola para depuración
      if (error.code === 'auth/wrong-password') {
        Alert.alert('Error', 'Contraseña incorrecta');
      } else if (error.code === 'auth/user-not-found') {
        Alert.alert('Error', 'Usuario no encontrado');
      } else {
        Alert.alert('Error', 'Hubo un problema al iniciar sesión');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      
      <View style={styles.formContainer}>
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

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.linkContainer}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.linkText}>¿No tienes una cuenta? Regístrate aquí</Text>
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

export default LoginScreen;
