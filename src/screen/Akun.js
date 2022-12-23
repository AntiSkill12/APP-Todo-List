import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ToastAndroid, ScrollView} from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/FontAwesome5'


const Akun = () => {
  const navigation = useNavigation();
  const [username] = useState('')
  const [nama] = useState('')
  const [password] = useState('')
  
  const [data, setData] = useState({
        username: '',
        nama: '',
        password: '',
    })

    console.log('username', data.username)
    console.log('nama', data.nama);
    console.log('password', data.password);
    
    useEffect(() => {
        getData()
        return () => { };
    }, []);

    const getData = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let nama = await AsyncStorage.getItem('nama')
            let password = await AsyncStorage.getItem('password')
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
    }

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.container1}>
         <Image style={{width: 150,height: 53,borderRadius:20, left: 15, top: 25,}} 
            source={require('../asset/logo.png')}/>
          <Text style={{
            color: '#FDCB5A',
            fontSize: 20,
            bottom: 15,
            left:120,
            alignSelf:'center',
            fontWeight: 'bold',
          }}>
            PROFILE
          </Text>

          <TouchableOpacity style={{
            height:175, backgroundColor: "#fff", top: 60, marginHorizontal: 13, 
            flexDirection:'row', borderTopColor: "#fff", 
            borderBottomColor:"#1A3150", borderLeftColor:"#1A3150", borderRightColor:"#1A3150", elevation:10
          }} onPress={() => navigation.navigate('EditAkun')}>
           
            <Text style={{
              fontWeight: 'bold', color:"#000", left: 43, top: 25, fontSize: 20, position:"absolute"
            }}>
              UserName  =  {data.username}
            </Text>
            <Icon2 onPress={() => navigation.navigate('EditAkun')} name='pen' size={17} color="#000"
                style={{position: 'absolute',left:290, top:20}}/>

            {/* <Text style={{
              color:"#000",top: 65,fontWeight: 'bold', right:105, fontSize: 20, position:"absolute" }}>
              <Text >Nama           = {data.nama}</Text>
            </Text> */}

            <Text style={{
              fontWeight: 'bold', color:"#000", top: 100, right: 128, fontSize:20, position:"absolute"
            }}>password     = {data.password}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            height:55, backgroundColor: "#fff", top: 110, elevation: 10, marginHorizontal: 13, 
            flexDirection:'row',}}
            onPress={() => navigation.navigate('Login')}>
          <Icon name='logout' size={25} color="#1A3150"
                style={{position: 'absolute',top:17, right:271,}}/>
          <Text style={{
            left:70, top: 17, color:"#000", fontSize:17
          }}>Logout</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: "#fff",
    flex: 1,
  },
  container1:{
        backgroundColor:'#1A3150',
        height: 90
  },
})

export default Akun