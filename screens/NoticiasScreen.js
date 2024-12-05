import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Linking } from "react-native";
import { COLORS, SPACING, FONTS, globalStyles } from "../theme";

const NoticiasScreen = () => {
  const noticias = [
    {
      id: 1,
      titulo: "Nuevo parque para paseadores en Bucaramanga",
      descripcion:
        "Inauguran un espacio exclusivo para paseadores y sus perros en el norte de la ciudad.",
      fecha: "24 Nov 2024",
      imagen:
        "https://udes.edu.co/media/k2/items/cache/8376aace7af18ea8cafa499d7e69a6ec_XL.jpg?t=20190830_200333",
      categoria: "Novedades",
      link: "https://bucaramanga.udes.edu.co/comunicaciones/noticias/paseador-de-perros-una-alternativa-viable-en-pro-del-bienestar-y-la-salud-de-las-mascotas ", // Nuevo campo
    },
    {
      id: 2,
      titulo: "Consejos para pasear perros en clima cálido",
      descripcion:
        "Aprende cómo cuidar a tu perro durante los paseos en días calurosos y mantenerlo hidratado.",
      fecha: "23 Nov 2024",
      imagen:
        "https://www.bucaramangainedita.com/blog/thu_donde_llevar_a_tu_mascota_a_pasear_en_bucaramanga_1513375805.jpg",
      categoria: "Consejos",
      link: "https://www.bucaramangainedita.com/blog/25/donde-llevar-tu-mascota-a-pasear-en-bucaramanga ", // Nuevo campo
    },
    {
      id: 3,
      titulo: "Evento de adopción en Bucaramanga",
      descripcion:
        "Este fin de semana, gran evento de adopción en el Parque de los Perros.",
      fecha: "22 Nov 2024",
      imagen:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2A471GF9rhvGM4TzCrD5UHc3RVEpoN2YFVQ&s",
      categoria: "Eventos",
      link: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bucaramanga.gov.co%2Fnoticias%2Feste-domingo-tendremos-una-nueva-jornada-de-adopcion-animal%2F&psig=AOvVaw0fvq-OC10pw7eq7p4qk8ZF&ust=1733421512216000&source=images&cd=vfe&opi=89978449&ved=0CBcQjhxqFwoTCMD5gr7YjooDFQAAAAAdAAAAABAf ", // Nuevo campo
    },
  ];

  const handlePressLink = (url) => {
    Linking.openURL(url).catch(() =>
      Alert.alert("Error", "No se pudo abrir el enlace.")
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Noticias y Eventos</Text>
      </View>

      {noticias.map((noticia) => (
        <TouchableOpacity
          key={noticia.id}
          style={styles.card}
          onPress={() => handlePressLink(noticia.link)} // Abrir el enlace al hacer clic
        >
          <Image source={{ uri: noticia.imagen }} style={styles.image} />
          <View style={styles.cardContent}>
            <View style={styles.categoryContainer}>
              <Text style={styles.category}>{noticia.categoria}</Text>
              <Text style={styles.date}>{noticia.fecha}</Text>
            </View>
            <Text style={styles.cardTitle}>{noticia.titulo}</Text>
            <Text style={styles.cardDescription}>{noticia.descripcion}</Text>
            <TouchableOpacity
              style={styles.readMoreButton}
              onPress={() => handlePressLink(noticia.link)} // Abrir el enlace al presionar "Leer más"
            >
              <Text style={styles.readMoreText}>Leer más</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
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
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    ...globalStyles.title,
    marginBottom: 0,
  },
  card: {
    ...globalStyles.card,
    padding: 0,
    overflow: "hidden",
    margin: SPACING.md,
  },
  image: {
    width: "100%",
    height: 200,
  },
  cardContent: {
    padding: SPACING.md,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  category: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.semibold,
  },
  date: {
    color: COLORS.textLight,
    fontSize: FONTS.sizes.sm,
  },
  cardTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  cardDescription: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textLight,
    marginBottom: SPACING.md,
  },
  readMoreButton: {
    alignSelf: "flex-start",
  },
  readMoreText: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
  },
});

export default NoticiasScreen;
