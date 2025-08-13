import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";

const CityDetails = () => {
  const router = useRouter()
  const searchParams = useLocalSearchParams();
  const [cityDetails, setCityDetails] = useState(null);

  const weekDays = {
    Dom: "Domingo",
    Seg: "Segunda-feira",
    Ter: "Terça-feira",
    Qua: "Quarta-feira",
    Qui: "Quinta-feira",
    Sex: "Sexta-feira",
    Sáb: "Sábado"
  };

  const handleData = async () => {
    try {
      const response = await fetch("https://climapp-api.vercel.app/api");
      const responseJSON = await response.json();

      const city = responseJSON.find(
        (cityData) => cityData.city === searchParams.cityName
      );

      setCityDetails(city);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  if (!cityDetails) {
    return (
      <LinearGradient colors={["#00457d", "#05051f"]} style={style.container} />
    );
  }

  return (
    <LinearGradient colors={["#00457d", "#05051f"]} style={style.container}>
      <View>
        <TouchableOpacity onPress={() => router.back()} style={style.headerIcon}>
          <MaterialIcons
            name="chevron-left"
            size={24}
            color={"#fff"}
          />
        </TouchableOpacity>
        <Text style={style.headerTitle}>{cityDetails.city}</Text>
      </View>

      <View style={style.card}>
        <View style={style.cardHeader}>
          <Text style={style.cardHeaderTitle}>Hoje</Text>
          <Text style={style.cardHeaderTitle}>{cityDetails.date}</Text>
        </View>

        <View style={style.cardBox}>
          <Image
            source={require("../assets/images/clouds.png")}
            style={style.cardImage}
          />

          <View>
            <Text style={style.cardTemperature}>{cityDetails.temp}°</Text>
            <Text style={style.cardDescription}>{cityDetails.description}</Text>
          </View>
        </View>

        <View style={style.rowBox}>
          <View style={style.row}>
            <Image source={require("../assets/images/humidity.png")} />

            <Text style={style.rowTitle}>Humidity:</Text>

            <Text style={style.rowValue}>{cityDetails.humidity}%</Text>
          </View>

          <View style={style.row}>
            <Image source={require("../assets/images/temperature.png")} />

            <Text style={style.rowTitle}>Min/Max:</Text>

            <Text style={style.rowValue}>
              {cityDetails.forecast[0].min}/{cityDetails.forecast[0].max}
            </Text>
          </View>
        </View>
      </View>
      <View>

        <View style={style.forecastRow}>
          {cityDetails.forecast.slice(0, 3).map((item, index, arr) => (
            <View key={index} style={[style.cardPrevision, index !== arr.length - 1 && { marginRight: 8 }, ]}>
              <Text style={style.cardPrevisionTitle}>
                {weekDays[item.weekday] || item.weekday}
              </Text>
              <Text style={style.cardPrevisionTitle}>({item.date})</Text>
              <Image
                source={require("../assets/images/clouds.png")}
                style={style.cityImage}
              />
              <Text style={style.cardTemperaturePrev}>
                {item.min}/{item.max}°
              </Text>
            </View>
          ))}
        </View>




      </View>
    </LinearGradient>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 100,
    gap: 40,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Montserrat_600SemiBold",
    textAlign: "center",
  },
  card: {
    width: "100%",
    borderRadius: 24,
    backgroundColor: "#4463D5",
    padding: 16,
    gap: 24,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  cardHeaderTitle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat_600SemiBold",
  },
  headerIcon: {
    position: "absolute",
    left: 0,
    zIndex: 10,
  },
  cardImage: {
    width: 72,
    height: 64,
  },
  cardTemperature: {
    color: "#fff",
    fontSize: 43,
    fontFamily: "Montserrat_700Bold",
    textAlign: "center",
  },
  cardDescription: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "Montserrat_400Regular",
    textAlign: "center",
  },
  cardBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  forecastRow: {
    width: "100%",        
    flexDirection: "row",
    justifyContent: "center", 
    alignItems: "center",
    paddingHorizontal: 16
  },
  cardPrevision: {
    width: 125,
    height: 160,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 16,
    paddingVertical: 16
  },
  cardPrevisionTitle: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 16,
    color: "#fff"
  },
  cardTemperaturePrev: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Montserrat_600SemiBold"
  },
  cityImage: {
    width: 27,
    height: 24
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rowTitle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat_600SemiBold",
  },
  rowValue: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    marginLeft: "auto",
  },
  rowBox: {
    gap: 8,
  },
});

export default CityDetails;