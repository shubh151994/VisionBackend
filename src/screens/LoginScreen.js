/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { phoneNumberValidator } from '../helpers/phoneNumberValidator'
import { passwordValidator } from '../helpers/passwordValidator'
// import * as SecureStore from 'expo-secure-store';

export default function LoginScreen({ navigation }) {
  const [phoneNo, setPhoneNumber] = useState({ value: '', error: '' })
  const [hash, setPassword] = useState({ value: '', error: '' })

  const onLoginPressed = () => {
    const phoneNumberError = phoneNumberValidator(phoneNo.value)
    const passwordError = passwordValidator(hash.value)
    if (phoneNumberError || passwordError) {
      setPhoneNumber({ ...phoneNo, error: phoneNumberError })
      setPassword({ ...hash, error: passwordError })
      return
    }

    axios
      .post('https://sleepy-tundra-95635.herokuapp.com/user/login', {
        phoneNo: phoneNo.value,
        hash: hash.value,
      })
      .then(function (response) {
        AsyncStorage.setItem('@storage_Key', response.data.token)
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        })
        // saving error
        // console.log(response.data.token);
        // SecureStore.setItemAsync('token',response.data.token);
      })
      .catch((error) => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        })
        if (error) return 'Invalid Login Credentials.'
        console.log(error, 'error')
      })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Phone Number"
        returnKeyType="next"
        value={phoneNo.value}
        onChangeText={(text) => setPhoneNumber({ value: text, error: '' })}
        error={!!phoneNo.error}
        errorText={phoneNo.error}
        autoCapitalize="none"
        // autoCompleteType="phone Number"
        // textContentType="PhoneAddress"
        // keyboardType="phone-number-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={hash.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!hash.error}
        errorText={hash.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity onPress={() => navigation.navigate('ResetPasswordScreen')}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
