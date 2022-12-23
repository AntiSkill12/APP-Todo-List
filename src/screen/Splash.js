import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Logo from '../asset/logo.png'
import { Grid } from 'react-native-animated-spinkit'


const Splash = ({navigation}) => {
    setTimeout(() => {
        navigation.replace('Home');
    }, 4000);
  return (
    <View style={styles.container}>
        <Image source={Logo} style={styles.logo}/>
      <Text style={styles.text}>Time List</Text>
      <Grid size={48} color="#fff"/>
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
      text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: 80,
        paddingBottom: 20,
      },
})

export default Splash