import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import  Icon  from 'react-native-vector-icons/Ionicons';

import Splash from './src/screen/Splash'
import Home from './src/screen/Home';
import Login from './src/screen/Login'
import Register from './src/screen/Register' 
import Homepage from './src/screen/Homepage';
import list_noAPI from './src/screen/list_noAPI';
import IsiList from './src/screen/IsiList';
import Detail from './src/screen/Detail';
import Akun from './src/screen/Akun';
import EditAkun from './src/screen/EditAkun';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const RootHome = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      style={{ backgroundColor:'#000' }}
      screenOptions={{
        tabBarActiveTintColor: '#FDCB5A',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'black'
        },
      }}
      >
        <Tab.Screen
        name="Home"
        component={Homepage}
        options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color}) => (
            <Icon name="home" color={color} size={15} />
            ),
        }}
        />

        <Tab.Screen
        name="Account"
        component={Akun}
        options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({ color,size }) => (
            <Icon name="ios-person-circle" color={color} size={size} />
            ),
        }}
        />
    </Tab.Navigator>
     )
 }

const App = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash}/>
      <Stack.Screen name='Home' component={Home}/>
      <Stack.Screen name='Login' component={Login}/>
      <Stack.Screen name='Register' component={Register}/>
      <Stack.Screen name='Homepage' component={RootHome}/> 
      <Stack.Screen name='list_noAPI' component={list_noAPI}/>
      <Stack.Screen name='IsiList' component={IsiList}/>
      <Stack.Screen name='Detail' component={Detail}/>
      <Stack.Screen name='Akun' component={RootHome}/>
      <Stack.Screen name='EditAkun' component={EditAkun}/>
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default App