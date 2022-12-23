import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TextInput,
  SafeAreaView
} from 'react-native';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Icon from 'react-native-vector-icons/Ionicons'


const Homepage = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  console.log("ini data movie", movies);
  useEffect(() => {
      axios
          .get(
              'http://192.168.43.199:3300/todo_list',
          )
          .then((res) => {
              // console.log('res', res);

              setMovies(res.data.data);
          });
  }, []);

  if (loading) {
      return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
              <Text>Loading</Text>
          </View>
      );
  }

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor:"#1A3150" }}>
        <TouchableOpacity onPress={() => navigation.navigate('list_noAPI')}>
          <Image  style={{width: 150,height: 53,borderRadius:20, left: 15, top: 25,}} 
            source={require('../asset/logo.png')}/>
        </TouchableOpacity>

          <TouchableOpacity>
            <Icon onPress={() => navigation.navigate('IsiList')}
                style={{
                  bottom: 30,
                  left:120,
                  alignSelf:'center',
                  fontWeight: 'bold',
                }}
                name={'add-circle'}
                color={'#FDCB5A'}
                size={50}
            />
          </TouchableOpacity>
         
          <FlatList
              data={movies}
              numColumns={2}
              keyExtractor={(item) => item.Date}
              renderItem={(e) => {
                  return (
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Detail',{ movie_id: e.item.Date })}
                          style={{
                              flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center',
                              margin: 5,
                              borderWidth: 2,
                              borderColor: '#ff471a',
                              borderRadius: 10,
                              backgroundColor: '#fff',
                              padding: 5,
                              elevation: 10,
                          }}
                          >
                          <View
                              style={{
                                  flex: 1,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                              }}>
                              <Text
                                  style={{
                                      color: '#4A90E2',
                                      textAlign: 'center',
                                      fontWeight: 'bold',
                                  }}>
                                  {e.item.Judul}
                              </Text>
                              <Text
                                  style={{
                                      color: '#4A90E2',
                                      textAlign: 'center',
                                      fontWeight: 'bold',
                                      marginTop:50,
                                      marginBottom:-70
                                  }}>
                                  {e.item.List}
                              </Text>
                          </View>
                          <Image
                              style={{
                                  height: Dimensions.get('screen').height * 0.15,
                                  width: Dimensions.get('screen').height * 0.15,
                                  borderRadius: 10,
                              }}
                              // source={{
                              //     uri: `https://image.tmdb.org/t/p/w500${e.item.poster_path}`,
                              // }}
                          />
                          <Text>Nama User:{e.item.Usernama}</Text>
                          <Text>Date:{e.item.Date}</Text>
                      </TouchableOpacity>
                  );
              }}
          />
      </SafeAreaView>
  );
}

export default Homepage