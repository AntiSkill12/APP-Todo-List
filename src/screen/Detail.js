import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid, ScrollView} from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

const Detail = () => {
    const navigation = useNavigation();

    const [Usernama, setUsernama] = useState('')
    const [Judul, setJudul] = useState('')
    const [List, setList] = useState('')
    const [Date, setDate] = useState('')

    const [data, setData] = useState({
        Usernama: '',
        Judul: '',
        List: '',
        Date: '',
    })

    console.log('Usernama', data.Usernama)
    console.log('Judul', data.Judul);
    console.log('List', data.List);
    console.log('Date', data.Date);
    
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
    }

    const resetPassword = async (value) => {
        console.log('value', value);
        try {
            const response = await axios.put('http://192.168.43.199:3300/todo_list', {
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
            ToastAndroid.show("Cek kembali Usernama dan password", ToastAndroid.SHORT)
        }
    }

    return (
      <ScrollView>
        <View style={styles.home}>
        
            <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{top:20}}>
                <Icon name="arrow-left" size={20} color="#fff" style={{paddingTop:15,left: 20}}/>
                <Text style={{left:55, top: -20, color:"#fff"}}>
                Sebelumnya 
                </Text>
            </TouchableOpacity>
            <Text style={{textAlign:"right", right: 30, fontSize: 25 ,top: -30, color:"#fff"}}>
                Edit List
            </Text>
            <View style={styles.container}>
                <Text style={styles.text}>Usernama</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Usernama"
                    placeholderTextColor="white"
                    onChangeText={(Usernama) => setUsernama(Usernama)}
                    value={Usernama}
                />
                <Text style={styles.text}>Judul</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Judul"
                    placeholderTextColor="white"
                    onChangeText={(Judul) => setJudul(Judul)}
                    value={Judul}
                />
                <Text style={styles.text}>List</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Masukkan List"
                    placeholderTextColor="white"
                    // secureTextEntry={true}
                    onChangeText={(List) => setList(List)}
                    value={List}
                />
                <Text style={styles.text}>Date</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Masukkan Date"
                    placeholderTextColor="white"
                    // secureTextEntry={true}
                    onChangeText={(Date) => setDate(Date)}
                    value={Date}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                        if (Usernama == "" || Judul == "" || List == "" || Date == "") {
                            ToastAndroid.show("Data tidak boleh kosong", ToastAndroid.SHORT);
                        } else {
                            resetPassword({ Usernama: Usernama, Judul: Judul, List: List, Date: Date })
                            ToastAndroid.show("List berhasil diubah", ToastAndroid.SHORT)
                        }
                    }}>
                    <Text style={styles.textButton}>Edit List</Text>
                </TouchableOpacity>
            </View>      
        </View>
      </ScrollView>  
    )
}

const styles = StyleSheet.create({
  home: {
    backgroundColor: '#004080',
    paddingBottom:200,

  },
    container: {
        paddingHorizontal:20,
        flex: 1,
        justifyContent: 'center',
        paddingTop:40,
    },
    input: {
        width: 300,
        height: 50,
        backgroundColor: '#333',
        borderRadius: 10,
        color: 'white',
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
      color: '#FDCB5A'
    },
})

export default Detail