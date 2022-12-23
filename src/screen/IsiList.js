import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useState, useEffect } from 'react';
import Logo from '../asset/logo.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'


const IsiList = () => {
  const navigation = useNavigation();

  const [Usernama, setUsernama] = useState('');
  const [Judul, setJudul] = useState('');
  const [List, setList] = useState('');
  const [Date, setDate]= useState('');


  const [data, setData] = useState({
    Usernama: '',
    Judul: '',
    List: '',
    Date: '',
  })

  useEffect(() => {
    getData()
    return () => { };
  }, []);

const getData = async () => {
    try {
        let Usernama = await AsyncStorage.getItem('Usernama')
        let Judul = await AsyncStorage.getItem('Judul')
        let List = await AsyncStorage.getItem('List')
        let Date = await AsyncStorage.getItem('Date')
        if (Usernama !== null) {
            // value previously stored
            setData({
                Usernama: Usernama,
                Judul: Judul,
                List: List,
                Date: Date,
            })
        }
    } catch (e) {
        // error reading value
    }
};

  const handleList = async (value) => {
    console.log('value', value);
    try {
        const response = await axios.post('http://192.168.43.199:3300/todo_list', {
          Usernama: value.Usernama,
          Judul: value.Judul,  
          List: value.List,
          Date: value.Date,
        })
        if (response.data.status == 200) {
            console.log('response', response)
            
        }
    } catch (error) {
        console.log(error.message)
        ToastAndroid.show("List Gagal Di buat", ToastAndroid.SHORT)
    }
  }
  return (
    <View style={styles.container}>
        <TouchableOpacity
            onPress={() => navigation.navigate('Homepage')}
            style={{top:-20}}>
                <Icon name="arrow-left" size={20} color="#fff" style={{left:-120}}/>
                <Text style={{left:-90, top: -20, color:"#fff"}}>
                Sebelumnya 
                </Text>
        </TouchableOpacity>
        <Text style={{textAlign:"right", fontSize: 25 ,top: -65, color:"#fff", left: 90}}>
            ISI LIST
        </Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Usernama"
          placeholderTextColor="white"
          onChangeText={(Usernama) => setUsernama(Usernama)}
          value={Usernama}
        />
        <TextInput
          style={styles.input}
          placeholder="Judul"
          placeholderTextColor="white"
          onChangeText={(Judul) => setJudul(Judul)}
          value={Judul}
        />
        <TextInput
          style={styles.input}
          placeholder="List"
          placeholderTextColor="white"
          onChangeText={(List) => setList(List)}
          value={List}
        />
        <TextInput
          style={styles.input}
          placeholder="Date"
          placeholderTextColor="white"
          onChangeText={(Date) => setDate(Date)}
          value={Date}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            if ( Judul == "" || Usernama == "" || List == "" || Date == "" ) {
              ToastAndroid.show("Data tidak boleh kosong", ToastAndroid.SHORT);
            } else{
              await handleList({ Usernama: Usernama, Judul: Judul, List: List, Date: Date})
              ToastAndroid.show("List Dibuat", ToastAndroid.SHORT)
            }
          }}>
          <Text style={styles.textButton}>Tambahkan</Text>
        </TouchableOpacity>
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
export default IsiList