/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
// import { View, StyleSheet, TouchableOpacity } from 'react-native'
// import { Text } from 'react-native-paper'
import DropDownPicker from 'react-native-dropdown-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { View } from 'react-native'
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
// import { theme } from '../core/theme'
import { rateValidator } from '../helpers/rateValidator'
import { unitValidator } from '../helpers/unitValidator'
import { amountValidator } from '../helpers/amountValidator'
import { modeOfPaymentValidator } from '../helpers/modeOfPaymentValidator'
import { vendorValidator } from '../helpers/vendorValidator'
import { remarkValidator } from '../helpers/remarkValidator'
import { workTypeValidator } from '../helpers/workTypeValidator'

// import * as SecureStore from 'expo-secure-store';

export default function MaterialsScreen({ navigation }) {
  console.log(navigation, 'here are navigation')

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

  const [work_type, setWorkType] = useState({ value: '', error: '' })
  const [vendor, setVendor] = useState({ value: '', error: '' })
  const [amount, setAmount] = useState({ value: '', error: '' })
  const [mode_of_payment, setModeOfPayment] = useState({ value: '', error: '' })
  const [remark, setRemark] = useState({ value: '', error: '' })
  const [rate, setRate] = useState({ value: '', error: '' })
  const [unit, setUnit] = useState({ value: '', error: '' })

  const onMaterialPressed = async () => {
    const rateError = rateValidator(rate.value)
    const unitError = unitValidator(unit.value)
    const amountError = amountValidator(amount.value)
    const modeOfPaymentError = modeOfPaymentValidator(mode_of_payment.value)
    const vendorError = vendorValidator(vendor.value)
    const remarkError = remarkValidator(remark.value)
    const workTypeError = workTypeValidator(work_type.value)

    if (rateError || unitError || amountError || modeOfPaymentError || vendorError || workTypeError) {
      setRate({ ...rate, error: rateError })
      setUnit({ ...unit, error: unitError })
      setAmount({ ...amount, error: amountError })
      setModeOfPayment({ ...mode_of_payment, error: modeOfPaymentError })
      setVendor({ ...vendor, error: vendorError })
      setRemark({ ...remark, error: remarkError })
      setWorkType({ ...work_type, error: workTypeError })
      return
    }

    axios
      .post(
        'https://sleepy-tundra-95635.herokuapp.com/work/add-material',
        {
          rate: parseFloat(rate.value),
          unit: parseInt(unit.value),
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
            // 'Authorization': 'Bearer ' + await SecureStore.getItemAsync('token')
          },
        }
      )
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MaterialsScreen' }],
        })
        if (error) return 'Something went wong.'
        console.log(error.response, 'error')
      })
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }

  // this.state = {
  //   mode_of_payment: 1
  // }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>Add Material</Header>
      <TextInput
        label="Work Type"
        returnKeyType="done"
        value={work_type.value}
        onChangeText={(text) => setWorkType({ value: text, error: '' })}
        error={!!work_type.error}
        errorText={work_type.error}
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
        label="Amount"
        returnKeyType="done"
        value={amount.value}
        onChangeText={(number) => setAmount({ value: number, error: '' })}
        error={!!amount.error}
        errorText={amount.error}
        keyboardType="numeric"
      />
      {/* <TextInput
        label="Mode Of Payment"
        returnKeyType="next"
        value={mode_of_payment.value}
        onChangeText={(number) => setModeOfPayment({ value: number, error: '' })}
        error={!!mode_of_payment.error}
        errorText={mode_of_payment.error}
        keyboardType ="numeric"
      /> */}
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
        // eslint-disable-next-line react/jsx-boolean-value
        selectedLabelLength={100}
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
        label="Remark"
        returnKeyType="done"
        value={remark.value}
        onChangeText={(text) => setRemark({ value: text, error: '' })}
        error={!!remark.error}
        errorText={remark.error}
      />
      <TextInput
        label="Rate"
        returnKeyType="next"
        value={rate.value}
        onChangeText={(text) => setRate({ value: text, error: '' })}
        error={!!rate.error}
        errorText={rate.error}
      />
      <TextInput
        label="Unit"
        returnKeyType="done"
        value={unit.value}
        onChangeText={(text) => setUnit({ value: text, error: '' })}
        error={!!unit.error}
        errorText={unit.error}
      />
      <Button mode="contained" onPress={onMaterialPressed} style={{ marginTop: 24 }}>
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
