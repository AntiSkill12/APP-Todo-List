import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useState, useEffect } from 'react';
import Logo from '../asset/logo.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Register = () => {
  const navigation = useNavigation();
  const [show, setShow] = React.useState(false);
  const [Visible, setVisible] = React.useState(true);

  const [username, setUsername] = useState('');
  const [nama, setNama] = useState('');
  const [password, setPassword] = useState('');
  


  const [data, setData] = useState({
    username: '',
    nama: '',
    password: '',
  })

  useEffect(() => {
    getData()
    return () => { };
  }, []);

const getData = async () => {
    try {
        let username = await AsyncStorage.getItem('username')
        let password = await AsyncStorage.getItem('password')
        let nama = await AsyncStorage.getItem('nama')
        if (username !== null) {
            // value previously stored
            setData({
                username: username,
                nama: nama,
                password: password,
            })
        }
    } catch (e) {
        // error reading value
    }
};

  const handleRegister = async (value) => {
    console.log('value', value);
    try {
        const response = await axios.post('http://192.168.43.199:3300/users', {
          username: value.username,
          nama: value.nama,  
          password: value.password,
        })
        if (response.data.status == 200) {
            console.log('response', response)
            
        }
    } catch (error) {
        console.log(error.message)
        ToastAndroid.show("Register Gagal", ToastAndroid.SHORT)
    }
  }
  return (
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
          placeholder="Username"
          placeholderTextColor="white"
          onChangeText={(username) => setUsername(username)}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="nama"
          placeholderTextColor="white"
          onChangeText={(nama) => setNama(nama)}
          value={nama}
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
            if ( nama == "" || username == "" || password == "" ) {
              ToastAndroid.show("Data tidak boleh kosong", ToastAndroid.SHORT);
            } else{
              await handleRegister({ username: username, nama: nama, password: password})
              ToastAndroid.show("Register Berhasil", ToastAndroid.SHORT)
              navigation.navigate('Login')
            }
          }}>
          <Text style={styles.textButton}>Register</Text>
        </TouchableOpacity>
        <Text style={styles.text}>
        <Text style={{fontStyle:'italic'}}>Already have an account? </Text>  
        <Text style={{fontWeight:'bold'}}
        onPress={() => navigation.goBack()}
        >Login</Text></Text> 
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
    }
})
export default Register