import React, { useState } from "react";
import { StyleSheet, Text, ScrollView, View, Image, SafeAreaView, Button, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

function TelaPerfil() {
  return (
    <ScrollView contentContainerStyle={styles.pageContainer}>
      <Image
        source={require("./assets/minha-foto.jpg")} // Caminho da imagem
        style={styles.fotoPerfil} // Estilo para a foto
      />
      <Text style={styles.titulo}>Informações de Perfil</Text>
      <Text><Text style={styles.bold}>Nome:</Text> Alyson Henrique Seixas do Nascimento{"\n"}</Text>
      <Text><Text style={styles.bold}>Telefone:</Text> (81) 98342-6558{"\n"}</Text>
      <Text><Text style={styles.bold}>E-mail:</Text> alysonnascimento142@gmail.com{"\n"}</Text>
      <Text><Text style={styles.bold}>Endereço:</Text> Rua Almirante Barroso - Campo Grande{"\n"}</Text>
      <Text><Text style={styles.bold}>Cidade:</Text> Recife{"\n"}</Text>
      <Text><Text style={styles.bold}>Estado:</Text> Pernambuco{"\n"}</Text>
      <Text><Text style={styles.bold}>Idade:</Text> 19 Anos{"\n"}</Text>
    </ScrollView>
  );
}

function TelaExperiencia() {
  return (
    <ScrollView contentContainerStyle={styles.pageContainer}>
      <Text style={styles.titulo}>Experiência Profissional</Text>
      <Text><Text style={styles.bold}>Empresa:</Text> C3 Engenharia e Incorporações{"\n"}</Text>
      <Text><Text style={styles.bold}>Cargo:</Text> Auxiliar Administrativo{"\n"}</Text>
      <Text><Text style={styles.bold}>Período:</Text> Março/2023 - Presente{"\n"}</Text>
    </ScrollView>
  );
}

function TelaEducacao() {
  return (
    <ScrollView contentContainerStyle={styles.pageContainer}>
      <Text style={styles.titulo}>Formação Acadêmica</Text>
      <Text><Text style={styles.bold}>Ensino Superior (Cursando)</Text>{"\n"}Faculdade SENAC PE - 3º Período em Análise e Desenvolvimento de Sistemas{"\n"}Endereço: Rua do Pombal - Santo Amaro{"\n"}{"\n"}</Text>
      <Text><Text style={styles.bold}>Ensino Médio (Completo)</Text>{"\n"}EREM NÓBREGA - Conclusão em 2021{"\n"}Endereço: Estr. de Belém, 257 - Encruzilhada{"\n"}</Text>
      <Text style={styles.titulo}>Qualificações e Atividades Complementares</Text>
      <Text>- Ennet Recife - Curso Profissionalizante | 2022 - Conclusão em 2024.{"\n"}</Text>
      <Text>- Web Design: Introdução e desenvolvimento na criação de sites através do Wordpress, Wix.{"\n"}</Text>
      <Text>- MAI: Introdução a Tecnologia, Digitação, Sistemas Operacionais, Canva.{"\n"}</Text>
      <Text>- Robótica: Prática e manuseio de arduino e montagem de robôs através de kits.{"\n"}</Text>
      <Text>- ITIC: Organização, Segurança e Configuração dos Sistemas, Websites, Gerenciamento de mídias, Tratamento de imagens.{"\n"}</Text>
      <Text>- Manutenção, Configuração e Redes: Aprimoramento em suporte de Hardware e Software visando a resolução de problemas tecnológicos gerais.{"\n"}</Text>
      <Text>- Senac PE - Criação de Aplicativos com Flutter(Cursando){"\n"}</Text>
      <Text>- Google + CIEE - Curso EAD - Suporte de TI (Cursando){"\n"}</Text>
      <Text>- Inglês avançado{"\n"}</Text>
    </ScrollView>
  );
}

function TelaMap() {
  const [location, setLocation] = useState(null);
  const [mensagemErro, setMensagemErro] = useState(null);

  const handleUsuario = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setMensagemErro('A permissão para acessar a localização foi negada');
      return;
    }

    let userLocation = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: userLocation.coords.latitude,
      longitude: userLocation.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Minha Localização" onPress={handleUsuario} />
      <View style={styles.mapContainer}>
        <MapView
          initialRegion={{
            latitude: -23.5505,
            longitude: -46.6333,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={location}
          style={styles.map}
        >
          {location && (
            <Marker
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              title="Você está aqui!"
            />
          )}
        </MapView>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconColor;

            if (route.name === "Perfil") {
              iconName = focused ? "person" : "person-outline";
              iconColor = focused ? "#2ca4bf" : color; 
            } else if (route.name === "Experiência") {
              iconName = focused ? "briefcase" : "briefcase-outline";
              iconColor = focused ? "#2ca4bf" : color;
            } else if (route.name === "Educação") {
              iconName = focused ? "school" : "school-outline";
              iconColor = focused ? "#2ca4bf" : color;
            } else if (route.name === "Localização") {
              iconName = focused ? "map" : "map-outline";
              iconColor = focused ? "#2ca4bf" : color;
            }

            return <Ionicons name={iconName} size={size} color={iconColor} />;
          },
          tabBarActiveTintColor: "#008080",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "#f8f8f8",
            borderTopWidth: 0,
          },
        })}
      >
        <Tab.Screen name="Perfil" component={TelaPerfil} />
        <Tab.Screen name="Experiência" component={TelaExperiencia} />
        <Tab.Screen name="Educação" component={TelaEducacao} />
        <Tab.Screen name="Localização" component={TelaMap} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
  },
  
  mapContainer: {
    flex: 1,
    width: '95%',
    alignSelf: "center",
  },

  map: {
    width: '100%',
    height: '100%',
  },

  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  bold: {
    fontWeight: 'bold',
  },
  
  fotoPerfil: {
    width: 150,
    height: 150,
    borderRadius: 75, 
    marginBottom: 20,
  },
});
