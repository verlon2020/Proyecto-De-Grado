import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { COLORS, SPACING, FONTS, globalStyles } from '../theme';

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Paseadores Perros</Text>
        <Text style={styles.subtitle}>Tu compañero confiable para el paseo de tu mascota</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/dog-walking.jpg')} // Asegúrate de tener esta imagen
          style={styles.heroImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>¿Qué ofrecemos?</Text>
        
        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>Paseadores Verificados</Text>
          <Text style={styles.featureText}>
            Todos nuestros paseadores pasan por un riguroso proceso de verificación.
          </Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>Flexibilidad Horaria</Text>
          <Text style={styles.featureText}>
            Programa los paseos cuando más te convenga.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: COLORS.primary }]}
            onPress={() => navigation.navigate('Auth')}
          >
            <Text style={styles.buttonText}>Comenzar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: COLORS.secondary }]}
            onPress={() => navigation.navigate('PublicNoticias')}
          >
            <Text style={styles.buttonText}>Ver Noticias</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.lg,
    backgroundColor: COLORS.primary,
  },
  title: {
    fontSize: FONTS.sizes.xxxl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.white,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.white,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  featureCard: {
    ...globalStyles.card,
    marginBottom: SPACING.md,
  },
  featureTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  featureText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textLight,
  },
  buttonContainer: {
    marginTop: SPACING.lg,
    gap: SPACING.md,
  },
  button: {
    ...globalStyles.button,
    padding: SPACING.md,
  },
  buttonText: {
    ...globalStyles.buttonText,
  },
});

export default HomeScreen;