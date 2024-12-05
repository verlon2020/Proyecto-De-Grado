import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS, SPACING, FONTS, globalStyles } from '../theme';

const CancelarServicio = ({ navigation }) => {
  const handleCancelar = () => {
    // Aquí puedes calcular el pago proporcional y cancelar el servicio
    Alert.alert('Servicio Cancelado', 'El servicio ha sido cancelado y se ha calculado el pago proporcional.');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cancelar Servicio</Text>

      <TouchableOpacity style={styles.button} onPress={handleCancelar}>
        <Text style={styles.buttonText}>Cancelar Servicio</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  ...globalStyles,
});

export default CancelarServicio;