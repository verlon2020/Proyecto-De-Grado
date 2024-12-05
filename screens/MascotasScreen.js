import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONTS, globalStyles } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../credenciales';

const MascotasScreen = ({ navigation }) => {
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    cargarMascotas();
  }, []);

  const cargarMascotas = async () => {
    try {
      const mascotasRef = collection(db, 'mascotas');
      const q = query(mascotasRef, where('userId', '==', auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      const mascotasData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMascotas(mascotasData);
    } catch (error) {
      console.error('Error al cargar mascotas:', error);
    }
  };

  const renderMascota = ({ item }) => (
    <TouchableOpacity 
      style={styles.mascotaCard}
      onPress={() => navigation.navigate('DetalleMascota', { mascota: item })}
    >
      <Image 
        source={{ uri: item.foto }} 
        style={styles.mascotaImage}
      />
      <View style={styles.mascotaInfo}>
        <Text style={styles.mascotaNombre}>{item.nombre}</Text>
        <Text style={styles.mascotaRaza}>{item.raza}</Text>
        <Text style={styles.mascotaEdad}>{item.edad} años</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color={COLORS.primary} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('AgregarMascota')}
      >
        <Ionicons name="add-circle" size={24} color={COLORS.white} />
        <Text style={styles.addButtonText}>Agregar Mascota</Text>
      </TouchableOpacity>

      <FlatList
        data={mascotas}
        renderItem={renderMascota}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tienes mascotas registradas</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    margin: SPACING.md,
    borderRadius: 10,
    justifyContent: 'center',
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
    marginLeft: SPACING.sm,
  },
  listContainer: {
    padding: SPACING.md,
  },
  mascotaCard: {
    ...globalStyles.card,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
  },
  mascotaImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: SPACING.md,
  },
  mascotaInfo: {
    flex: 1,
  },
  mascotaNombre: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text,
  },
  mascotaRaza: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textLight,
  },
  mascotaEdad: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textLight,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyText: {
    fontSize: FONTS.sizes.lg,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});

export default MascotasScreen;