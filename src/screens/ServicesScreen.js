/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
// import { View, StyleSheet, TouchableOpacity } from 'react-native'

// import { Text } from 'react-native-paper'
import DatePicker from 'react-native-datepicker'
import DropDownPicker from 'react-native-dropdown-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Background from '../components/Background'
// import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
// import { theme } from '../core/theme'
import { siteLocationValidator } from '../helpers/siteLocationValidator'
import { workDateValidator } from '../helpers/workDateValidator'
import { amountValidator } from '../helpers/amountValidator'
import { modeOfPaymentValidator } from '../helpers/modeOfPaymentValidator'
import { vendorValidator } from '../helpers/vendorValidator'
import { remarkValidator } from '../helpers/remarkValidator'
import { workTypeValidator } from '../helpers/workTypeValidator'

// import * as SecureStore from 'expo-secure-store';

export default function ServicesScreen({ navigation }) {
  // useEffect(async () => {
  //   console.log("Inside this function ****************")
  //   // let token =  await SecureStore.getItemAsync('token')
  //   // console.log(token, "here are Token ***********")
  //   try {
  //     const value = await AsyncStorage.getItem('@storage_Key')
  //     if (value !== null) {
  //       console.log(value, "Value not null Async Storage")
  //     }
  //   } catch (e) {
  //     console.log(e, "error in Async Storage")
  //     // error reading value
  //   }
  // }, [])

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
        console.log(value, 'Value not null Async Storage')
      }
    } catch (e) {
      console.log(e, 'error in Async Storage')
      // error reading value
    }
  }

  console.log(token, 'token ****************')

  const [site_location, setSiteLocation] = useState({ value: '', error: '' })
  const [work_date, setWorkDate] = useState({ value: '', error: '' })
  const [amount, setAmount] = useState({ value: '', error: '' })
  const [mode_of_payment, setModeOfPayment] = useState({ value: '', error: '' })
  const [vendor, setVendor] = useState({ value: '', error: '' })
  const [remark, setRemark] = useState({ value: '', error: '' })
  const [work_type, setWorkType] = useState({ value: '', error: '' })

  const onServicePressed = async () => {
    const siteLocationError = siteLocationValidator(site_location.value)
    const workDateError = workDateValidator(work_date.value)
    const amountError = amountValidator(amount.value)
    const modeOfPaymentError = modeOfPaymentValidator(mode_of_payment.value)
    const vendorError = vendorValidator(vendor.value)
    const remarkError = remarkValidator(remark.value)
    const workTypeError = workTypeValidator(work_type.value)

    if (siteLocationError || workDateError || amountError || modeOfPaymentError || vendorError || workTypeError) {
      setSiteLocation({ ...site_location, error: siteLocationError })
      setWorkDate({ ...work_date, error: workDateError })
      setAmount({ ...amount, error: amountError })
      setModeOfPayment({ ...mode_of_payment, error: modeOfPaymentError })
      setVendor({ ...vendor, error: vendorError })
      setRemark({ ...remark, error: remarkError })
      setWorkType({ ...work_type, error: workTypeError })
      return
    }

    await axios
      .post(
        'https://sleepy-tundra-95635.herokuapp.com/work/add-service',
        {
          site_location: site_location.value,
          work_date: work_date.value,
          amount: parseFloat(amount.value),
          mode_of_payment: parseInt(mode_of_payment.value),
          vendor: vendor.value,
          remark: remark.value,
          work_type: work_type.value,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error.response, 'error')
        navigation.reset({
          index: 0,
          routes: [{ name: 'ServicesScreen' }],
        })
        if (error) return 'Something went wong.'
        console.log(error.response, 'error')
        console.log(error.response, 'error')
      })

    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>Add Service</Header>
      <TextInput
        label="Site Location"
        returnKeyType="next"
        value={site_location.value}
        onChangeText={(text) => setSiteLocation({ value: text, error: '' })}
        error={!!site_location.error}
        errorText={site_location.error}
      />

      <DatePicker
        style={{ width: 300 }}
        date={work_date.value}
        mode="date"
        placeholder="select work date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2022-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 7,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 36,
          },
        }}
        onDateChange={(date) => {
          setWorkDate({ value: date })
        }}
      />
      <TextInput
        label="Amount"
        returnKeyType="done"
        value={amount.value}
        onChangeText={(number) => setAmount({ value: number, error: '' })}
        error={!!amount.error}
        errorText={amount.error}
        keyboardType="numeric"
      />
      <DropDownPicker
        placeholder="Select an item"
        value={mode_of_payment}
        items={[
          { label: 'CASH', value: 1 },
          { label: 'ONLINE', value: 2, selected: true },
        ]}
        containerStyle={{ height: 60, width: 300 }}
        style={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
        dropDownStyle={{
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={(item) =>
          setModeOfPayment({
            value: item.value,
          })
        }
      />
      <TextInput
        label="Vendor"
        returnKeyType="done"
        value={vendor.value}
        onChangeText={(text) => setVendor({ value: text, error: '' })}
        error={!!vendor.error}
        errorText={vendor.error}
      />
      <TextInput
        label="Remark"
        returnKeyType="done"
        value={remark.value}
        onChangeText={(text) => setRemark({ value: text, error: '' })}
        error={!!remark.error}
        errorText={remark.error}
      />
      <TextInput
        label="Work Type"
        returnKeyType="done"
        value={work_type.value}
        onChangeText={(text) => setWorkType({ value: text, error: '' })}
        error={!!work_type.error}
        errorText={work_type.error}
      />
      <Button mode="contained" onPress={onServicePressed} style={{ marginTop: 24 }}>
        Submit
      </Button>
      {/* <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View> */}
    </Background>
  )
}

// const styles = StyleSheet.create({
//   row: {
//     flexDirection: 'row',
//     marginTop: 4,
//   },
//   link: {
//     fontWeight: 'bold',
//     color: theme.colors.primary,
//   },
// })
