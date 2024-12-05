import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { db } from '../credenciales'; // Asegúrate de tener tu Firebase configurado correctamente
import { collection, getDocs } from 'firebase/firestore';

const MisServicios = ({ navigation }) => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    // Obtener los servicios de Firestore
    const fetchServicios = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'servicios')); // Ajusta la colección según tu base de datos
        const serviciosData = [];
        querySnapshot.forEach((doc) => {
          serviciosData.push(doc.data());
        });
        setServicios(serviciosData);
      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'No se pudieron cargar los servicios');
      }
    };

    fetchServicios();
  }, []);

  const renderServicio = ({ item }) => (
    <View style={styles.servicioContainer}>
      <Text style={styles.servicioText}>Mascota: {item.nombreMascota}</Text>
      <Text style={styles.servicioText}>Duración: {item.duracion} horas</Text>
      <Text style={styles.servicioText}>Precio: ${item.precio}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Servicios Realizados</Text>
      <FlatList
        data={servicios}
        renderItem={renderServicio}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  servicioContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  servicioText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default MisServicios;
