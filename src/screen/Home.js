import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import Logo from '../asset/logo.png'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={Logo}
        style={styles.logo}
      />
      <Text
        style={{
        color: "#FDCB5A",     
        fontSize: 24,
        marginTop: 20,
      }}>
        Time List
      </Text>
     <View style={styles.container1}>
       <TouchableOpacity style={styles.button}
       onPress={() => navigation.navigate('Login')}
       >
          <Text style={styles.textLogin}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container2}>
        <TouchableOpacity style={styles.button1}
           onPress={() => navigation.navigate('Register')}
           >
          <Text style={styles.textLogin2}>Registrasi</Text>
        </TouchableOpacity>
      </View>
    </View>
    )
  }
  
const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor: "#001a33",
    alignItems: "center",
    justifyContent: 'center',
  },
  logo: {
    width: 320,
    height: 120,
    marginTop: 50,
  },
  container1: {
    marginVertical: 5,
    marginTop: 100,
    width: "80%",
    height: 50,
    marginBottom:15,
  },
  container2: {
    width: "80%",
    height: 50,
  },
  input: {
    backgroundColor: "#5f5f5f",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#1a8cff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  button1: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    alignItems: "center",
  },
  textLogin: {
    color: "#1A3150",
    fontSize: 20,
    fontWeight: "bold",
  },
  textLogin2: {
    color: "#875C25",
    fontSize: 20,
    fontWeight: "bold",
  },
  text1: {
    marginTop: 10,
    color: "#fff",
    paddingTop: 10,
    fontWeight: "bold",
    fontStyle : "italic",
    textAlign: "center",
  },
  textForget: {
    color : "#fff",
    fontSize : 15,
    fontWeight : "bold",
    textAlign: "right",
    marginBottom:20,
  }
})
  
  export default Home
