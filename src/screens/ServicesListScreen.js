import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { Text } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import axios from 'axios';
// import * as SecureStore from 'expo-secure-store';
import { Card, ListItem, Icon } from 'react-native-elements'

// let result;

export default function ServicesListScreen({ navigation }) {

  const [token, setToken] = useState('')
  const [result, setResult] = useState([])

  useEffect(() => {
    console.log("Inside Use Effect")
    getToken()
  }, [])

  const getToken = async() => {
    console.log("Inside this Func")
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      console.log(value, "Value of Async Storage")
      if (value !== null) {
        setToken(value)
        getSerive(value)
        console.log(value, "Value not null Async Storage")
      }
    } catch (e) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      })
      console.log(e, "error in Async Storage")
      // error reading value
    }
  }

  const getSerive = (token) => {
      console.log(token, "here is Token *****************")
        axios.get('https://sleepy-tundra-95635.herokuapp.com/work/services', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/ ',
            'Authorization': `Bearer ${token}`
            // 'Authorization': 'Bearer ' + await SecureStore.getItemAsync('token')
          }
        }).then(function (response) {
          console.log(response, response.data, "Response *********")
         let result = response.data
          setResult(result)
        })
          .catch(function (error) {
            console.log(error, "error *********")
            navigation.reset({
              index: 0,
              routes: [{ name: 'Dashboard' }],
            })
            if (error) return "Something went wong."
          });
      }

       const ListHeader = () => {
        //View to set in Header
        return (
          <View style={styles.headerFooterStyle}>
            <Text style={styles.textStyle}>
                LIST OF SERVICES
            </Text>
          </View>
        );
      };
       
       return (
        <FlatList
        style={{marginTop:40}}
        data={result}
        ListHeaderComponent={ListHeader}
        renderItem={({item})=>(
        <View style={{justifyContent:'center',marginBottom:10}}>
        <Text style={{backgroundColor:'purple',color:'white',padding:15,width : 411}}>
        {item.site_location}
        </Text>
        </View>
        )}
        />
       )
}

const styles = StyleSheet.create({
    emptyListStyle: {
      padding: 10,
      fontSize: 18,
      textAlign: 'center',
    },
    itemStyle: {
      padding: 10,
    },
    headerFooterStyle: {
      width: '100%',
      height: 45,
      backgroundColor: '#606070',
    },
    textStyle: {
      textAlign: 'center',
      color: '#fff',
      fontSize: 18,
      padding: 7,
    },
  });