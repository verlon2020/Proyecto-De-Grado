import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from './theme';

// Import your screens
import HomeScreen from './screens/HomeScreen';
import NoticiasScreen from './screens/NoticiasScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeCliente from './screens/HomeCliente';
import HomePaseador from './screens/HomePaseador';
import AgregarMascota from './screens/AgregarMascota';
import BuscarPaseadores from './screens/BuscarPaseadores';
import SeguimientoScreen from './screens/SeguimientoScreen';
import AumentarDuracion from './screens/AumentarDuracion';
import CancelarServicio from './screens/CancelarServicio';
import VerSolicitudes from './screens/VerSolicitudes';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Public Screens Stack
const PublicStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: COLORS.primary,
      },
      headerTintColor: COLORS.white,
      headerTitleStyle: {
        fontWeight: '600',
      },
    }}
  >
    <Stack.Screen 
      name="HomeScreen" 
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="PublicNoticias" 
      component={NoticiasScreen}
      options={{ title: 'Noticias' }}
    />
  </Stack.Navigator>
);

// Authentication Stack
const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: COLORS.primary,
      },
      headerTintColor: COLORS.white,
      headerTitleStyle: {
        fontWeight: '600',
      },
    }}
  >
    <Stack.Screen 
      name="Login" 
      component={LoginScreen}
      options={{ title: 'Iniciar Sesión' }}
    />
    <Stack.Screen 
      name="Register" 
      component={RegisterScreen}
      options={{ title: 'Registro' }}
    />
  </Stack.Navigator>
);

// Client Tab Navigator
const ClienteTab = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'HomeCliente') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Noticias') {
          iconName = focused ? 'newspaper' : 'newspaper-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.inactive,
    })}
  >
    <Tab.Screen 
      name="HomeCliente" 
      component={HomeCliente}
      options={{ title: 'Inicio' }}
    />
    <Tab.Screen 
      name="Noticias" 
      component={NoticiasScreen}
      options={{ title: 'Noticias' }}
    />
  </Tab.Navigator>
);

// Walker Tab Navigator
const PaseadorTab = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'HomePaseador') {
          iconName = focused ? 'paw' : 'paw-outline';
        } else if (route.name === 'Noticias') {
          iconName = focused ? 'newspaper' : 'newspaper-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.inactive,
    })}
  >
    <Tab.Screen 
      name="HomePaseador" 
      component={HomePaseador}
      options={{ title: 'Inicio' }}
    />
    <Tab.Screen 
      name="Noticias" 
      component={NoticiasScreen}
      options={{ title: 'Noticias' }}
    />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Public" component={PublicStack} />
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="ClienteMain" component={ClienteTab} />
        <Stack.Screen name="PaseadorMain" component={PaseadorTab} />
        <Stack.Screen name="AgregarMascota" component={AgregarMascota} />
        <Stack.Screen name="BuscarPaseadores" component={BuscarPaseadores} />
        <Stack.Screen name="Seguimiento" component={SeguimientoScreen} />
        <Stack.Screen name="AumentarDuracion" component={AumentarDuracion} />
        <Stack.Screen name="CancelarServicio" component={CancelarServicio} />
        <Stack.Screen name="VerSolicitudes" component={VerSolicitudes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}