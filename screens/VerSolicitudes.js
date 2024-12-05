import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { db } from '../credenciales';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const VerSolicitudes = ({ navigation }) => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null); // Estado para solicitud aceptada

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser; // Obtener al paseador logueado
        if (user) {
          const q = query(
            collection(db, 'solicitudes'),
            where('estado', '==', 'pendiente') // Solo solicitudes pendientes
          );
          const querySnapshot = await getDocs(q);
          const solicitudesData = [];
          querySnapshot.forEach((doc) => {
            solicitudesData.push({ id: doc.id, ...doc.data() });
          });
          setSolicitudes(solicitudesData);
        }
      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'No se pudieron cargar las solicitudes');
      }
    };

    fetchSolicitudes();
  }, []);

  const aceptarSolicitud = async (solicitud) => {
    try {
      const solicitudRef = doc(db, 'solicitudes', solicitud.id);
      await updateDoc(solicitudRef, {
        estado: 'aceptado', // Cambiar el estado a 'aceptado'
      });

      // Actualizar el estado de la solicitud aceptada
      setSolicitudSeleccionada(solicitud);
      Alert.alert('Solicitud Aceptada', 'Has aceptado esta solicitud.');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Hubo un problema al aceptar la solicitud');
    }
  };

  const renderSolicitud = ({ item }) => {
    // Si la solicitud ha sido aceptada, mostrar solo esa solicitud
    if (solicitudSeleccionada && solicitudSeleccionada.id === item.id) {
      return (
        <View style={styles.solicitudContainer}>
          <Text style={styles.solicitudText}>Cliente: {item.clienteId}</Text>
          <Text style={styles.solicitudText}>Duración: {item.duracion} min</Text>
          <Text style={styles.solicitudText}>Precio: ${item.precio}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert('Solicitud Aceptada', 'Ya has aceptado esta solicitud.')}
          >
            <Text style={styles.buttonText}>Solicitud Aceptada</Text>
          </TouchableOpacity>
        </View>
      );
    }

    // Mostrar las solicitudes disponibles y su botón de aceptar
    return (
      <View style={styles.solicitudContainer}>
        <Text style={styles.solicitudText}>Cliente: {item.clienteId}</Text>
        <Text style={styles.solicitudText}>Duración: {item.duracion} min</Text>
        <Text style={styles.solicitudText}>Precio: ${item.precio}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => aceptarSolicitud(item)} // Llamar a la función de aceptación
        >
          <Text style={styles.buttonText}>Aceptar Solicitud</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitudes Disponibles</Text>
      <FlatList
        data={solicitudes.filter(item => solicitudSeleccionada ? item.id === solicitudSeleccionada.id : true)} // Filtrar para mostrar solo la seleccionada
        renderItem={renderSolicitud}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay solicitudes disponibles</Text>}
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
  solicitudContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  solicitudText: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});

export default VerSolicitudes;
