/* eslint-disable max-len */
/* eslint-disable no-console */
// import React, { useState } from 'react'
// import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
// import axios from 'axios'
// import { Card, ListItem, Icon } from 'react-native-elements'
// import * as SecureStore from 'expo-secure-store'
// import Background from '../components/Background'
// import Logo from '../components/Logo'
// import Header from '../components/Header'
// import Button from '../components/Button'
// import TextInput from '../components/TextInput'
// import BackButton from '../components/BackButton'
// import { theme } from '../core/theme'

export default function ServiceDetailsScreen({ route, navigation }) {
  console.log('naviagatio2n', route.params.item.site_location)
  console.log('naviagatio2n', route.params.item.work_date)
  const { site_location } = route.params.item
  console.log('naviagatio2n', site_location)
  return (
    <Background style={styles.backgroundColor}>
      <View style={styles.headerFooterStyle}>
        <Text style={styles.textStyle}>Site Location - {route.params.item.site_location} </Text>
      </View>
      <View style={styles.headerFooterStyle}>
        <Text style={styles.textStyle}>Work Date - {route.params.item.work_date} </Text>
      </View>
      <View style={styles.headerFooterStyle}>
        <Text style={styles.textStyle}>Amount - {route.params.item.amount} </Text>
      </View>
      <View style={styles.headerFooterStyle}>
        <Text style={styles.textStyle}>Mode of Payment - {route.params.item.mode_of_payment} </Text>
      </View>
      <View style={styles.headerFooterStyle}>
        <Text style={styles.textStyle}>Vendor - {route.params.item.vendor} </Text>
      </View>
      <View style={styles.headerFooterStyle}>
        <Text style={styles.textStyle}>Remark - {route.params.item.remark} </Text>
      </View>
      <View style={styles.headerFooterStyle}>
        <Text style={styles.textStyle}>Work Type - {route.params.item.work_type} </Text>
      </View>
    </Background>
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
    width: '150%',
    height: 50,
    backgroundColor: '#00008B',
  },
  textStyle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    padding: 7,
  },

  backgroundColor: {
    textAlign: 'center',
    color: '#00008B',
    fontSize: 18,
    padding: 7,
  },
})
