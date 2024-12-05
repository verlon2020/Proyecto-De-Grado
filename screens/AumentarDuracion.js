import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS, SPACING, FONTS, globalStyles } from '../theme';

const AumentarDuracion = ({ navigation }) => {
  const [nuevaDuracion, setNuevaDuracion] = useState('');
  const [nuevaOferta, setNuevaOferta] = useState('');

  const handleAumentar = () => {
    // Aquí puedes enviar la solicitud de aumento de duración al paseador
    Alert.alert('¡Solicitud Enviada!', 'La solicitud de aumento de duración ha sido enviada.');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aumentar Duración del Paseo</Text>

      <TextInput
        style={styles.input}
        placeholder="Nueva Duración (horas)"
        value={nuevaDuracion}
        onChangeText={setNuevaDuracion}
      />
      <TextInput
        style={styles.input}
        placeholder="Nueva Oferta (precio)"
        value={nuevaOferta}
        onChangeText={setNuevaOferta}
      />

      <TouchableOpacity style={styles.button} onPress={handleAumentar}>
        <Text style={styles.buttonText}>Enviar Solicitud</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  ...globalStyles,
});

export default AumentarDuracion;