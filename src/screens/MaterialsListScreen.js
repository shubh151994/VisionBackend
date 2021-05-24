/* eslint-disable no-shadow */
/* eslint-disable func-names */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text } from 'react-native-paper'
import axios from 'axios'

// import * as SecureStore from 'expo-secure-store';

let result
export default function MaterialsListScreen({ navigation }) {
  const [token, setToken] = useState('')

  useEffect(() => {
    console.log('Inside Use Effect')
    getToken()
  }, [])

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      console.log(value, 'Value of Async Storage')
      if (value !== null) {
        setToken(value)
        getItemAPI(value)
        console.log(value, 'Value not null Async Storage')
      }
    } catch (e) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      })
      console.log(e, 'error in Async Storage')
      // error reading value
    }
  }

  const getItemAPI = (token) => {
    console.log('inside second use effect')
    axios
      .get('https://sleepy-tundra-95635.herokuapp.com/work/materials', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          // 'Authorization': 'Bearer ' + await SecureStore.getItemAsync('token')
        },
      })
      .then(function (response) {
        result = response.data
        console.log(response, 'here is Response *************')
      })
      .catch(function (error) {
        console.log(error, error.response, 'error')
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        })
      })
  }

  const ListHeader = () => {
    // View to set in Header
    return (
      <View style={styles.headerFooterStyle}>
        <Text style={styles.textStyle}>LIST OF MATERIALS</Text>
      </View>
    )
  }

  return (
    <FlatList
      style={{ marginTop: 40 }}
      data={result}
      ListHeaderComponent={ListHeader}
      renderItem={({ item }) => (
        <View style={{ justifyContent: 'center', marginBottom: 10 }}>
          <Text style={{ backgroundColor: 'purple', color: 'white', padding: 15, width: 411 }}>{item.work_type}</Text>
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
})
