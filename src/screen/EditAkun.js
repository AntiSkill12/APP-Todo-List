import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid, ScrollView} from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

const EditAkun = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('')
    const [nama, setNama] = useState('')
    const [passwordLama, setPasswordLama] = useState('')
    const [passwordBaru, setPasswordBaru] = useState('')
    const [konfirmasiSandi, setKonfirmasiSandi] = useState("");

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

    const resetPassword = async (value) => {
        console.log('value', value);
        try {
            const response = await axios.put('http://192.168.43.199:3300/users', {
                username: value.username,
                nama: value.nama,
                password: value.passwordLama,
                passwordBaru: value.passwordBaru,
            })
            if (response.data.status == 200) {
                console.log('response', response)
                
            }
        } catch (error) {
            console.log(error.message)
            ToastAndroid.show("Cek kembali username dan password", ToastAndroid.SHORT)
        }
    }

    return (
      <ScrollView>
        <View style={styles.home}>
            <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{top:20}}>
                <Icon name="arrow-left" size={20} color="#fff" style={{paddingTop:15,left:25}}/>
                <Text style={{left:60, top: -20, color:"#fff"}}>
                Sebelumnya 
                </Text>
            </TouchableOpacity>
            <Text style={{textAlign:"right", right: 30, fontSize: 25 ,top: -30, color:"#fff"}}>
                EditAkun
            </Text>
            <View style={styles.container}>
                <Text style={styles.text}>UserName</Text>
                <TextInput
                    style={styles.input}
                    placeholder="UserName"
                    placeholderTextColor="white"
                    onChangeText={(username) => setUsername(username)}
                    value={username}
                />
                <Text style={styles.text}>Nama</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nama"
                    placeholderTextColor="white"
                    onChangeText={(nama) => setNama(nama)}
                    value={nama}
                />
                <Text style={styles.text}>Password Lama</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Masukkan Password Lama"
                    placeholderTextColor="white"
                    // secureTextEntry={true}
                    onChangeText={(password) => setPasswordLama(password)}
                    value={passwordLama}
                />
                <Text style={styles.text}>Password Baru</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Masukkan Password Baru"
                    placeholderTextColor="white"
                    // secureTextEntry={true}
                    onChangeText={(password) => setPasswordBaru(password)}
                    value={passwordBaru}
                />
                <Text style={styles.text}>Konfirmasi Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Konfirmasi Password"
                    placeholderTextColor="white"
                    // secureTextEntry={true}
                    onChangeText={(password) => setKonfirmasiSandi(password)}
                    value={konfirmasiSandi}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                        if (username == "" || passwordLama == "" || passwordBaru == "" || konfirmasiSandi == "") {
                            ToastAndroid.show("Data tidak boleh kosong", ToastAndroid.SHORT);
                        } else if (username !== data.username || passwordLama !== data.password) {
                            ToastAndroid.show('username atau Password Salah', ToastAndroid.SHORT);
                        } else if (passwordBaru !== konfirmasiSandi) {
                            ToastAndroid.show('Password Baru dan Konfirmasi Password Tidak Sama', ToastAndroid.SHORT);
                        } else {
                            resetPassword({ username: username, nama: nama, passwordLama: passwordLama, passwordBaru: passwordBaru })
                            ToastAndroid.show("Password berhasil diubah", ToastAndroid.SHORT)
                        }
                    }}>
                    <Text style={styles.textButton}>Reset Password</Text>
                </TouchableOpacity>
            </View>      
        </View>
      </ScrollView>  
    )
}

const styles = StyleSheet.create({
  home: {
    backgroundColor: '#004080',
    paddingBottom:100,

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

export default EditAkun