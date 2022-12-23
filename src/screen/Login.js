import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, RefreshControl , ToastAndroid} from 'react-native'
import React, {useState} from 'react'
import Logo from '../asset/logo.png'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = () => {
  const navigation = useNavigation();
  const [show, setShow] = React.useState(false);
  const [Visible, setVisible] = React.useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (value) => {
    console.log('value', value);
    try {
      const response = await axios.post('http://192.168.43.199:3300/users/login',{
        username: value.username,
        password: value.password
      }) 
      if (response.data.status == 200) {
        console.log('response', response.data.data)
        navigation.navigate('Homepage')
        // AsyncStorage.setItem
        await AsyncStorage.setItem('password', value.password)
        await AsyncStorage.setItem('username', value.username)
       
      }
    } catch (error) {
        console.log(error.message)
        ToastAndroid.show("Cek kembali username dan password", ToastAndroid.SHORT)
    }
  }

  return(
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <Text style={{
        color: '#FDCB5A',
        fontSize: 30,
        marginBottom: 20,
      }}>Time List</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder="UserName"
          placeholderTextColor="white"
          onChangeText={(username) => setUsername(username)}
          value={username}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={Visible}
          placeholder="Password"
          placeholderTextColor="white"
          onChangeText={(password) => setPassword(password)}
          value={password}
        />
        <TouchableOpacity
            onPress={() => {
                setVisible(!Visible);
                setShow(!show);
            }}>
            <Icon
                style={{
                left: 270,
                marginTop: -60,
                }}
                name={show === false ? 'eye-off' : 'eye'}
                color={'#F1F1F1'}
                size={25}
            />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            await handleLogin({ username, password});
          }}
        >
          <Text style={styles.textButton}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.text}>
          Don't have an account? 
        <Text style={{fontWeight:'bold'}}
        onPress={() => navigation.navigate('Register')}
        > Register</Text></Text> 
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001a33',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 320,
    height: 120,
  },
  input: {
    width: 300,
    height: 50,
    backgroundColor: '#333',
    borderRadius: 10,
    color:'white',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: '#1a8cff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: '#000',
    fontSize: 20,
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontStyle:'italic',
  }
})
export default Login
