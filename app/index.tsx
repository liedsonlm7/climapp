import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter()
  return (
    <LinearGradient colors={["#00457D", "#05051F"]} style={style.container}>
       
         <Image source={require('../assets/images/logo.png')} alt="logo"/>
         <Image source={require('../assets/images/weather.png')} alt="clima" />
         <Text style={style.title}>Boas-vindas!</Text>

          <TouchableOpacity onPress={() => {router.push('/cities')}} style={style.button}>
            <Text style={style.buttonTitle}>Entrar</Text>
            <MaterialIcon name='arrow-forward' size={24} color={"#01080E"} />
          </TouchableOpacity>


       
    </LinearGradient>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 64,
    paddingVertical: 79,
    paddingHorizontal: 32
  },
  title: {
    fontSize: 25,
    color: '#FFF',
    fontFamily: "Montserrat_400Regular"
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#7693FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    flexDirection: 'row',
    gap: 8
  },
  buttonTitle: {
    color: "#01080E",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Montserrat_600SemiBold"
  }
})
