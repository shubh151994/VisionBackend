import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { passwordValidator } from '../helpers/passwordValidator'
import { phoneNumberValidator } from '../helpers/phoneNumberValidator'
import { nameValidator } from '../helpers/nameValidator'

import axios from 'axios';

export default function RegisterScreen({ navigation }) {
  const [phoneNo, setPhoneNumber] = useState({ value: '', error: '' })
  const [hash, setPassword] = useState({ value: '', error: '' })
  const [name, setName] = useState({ value: '', error: '' })

  const onSignUpPressed = async () => {
    const phoneNumberError = phoneNumberValidator(phoneNo.value)
    const passwordError = passwordValidator(hash.value)
    const nameError = nameValidator(name.value)
    if (passwordError || nameError || phoneNumberError) {
      setPhoneNumber({ ...phoneNo, error: phoneNumberError })
      setPassword({ ...hash, error: passwordError })
      setName({ ...name, error: nameError })
      return
    }
   
    axios.post('https://sleepy-tundra-95635.herokuapp.com/user/register', {
          phoneNo: phoneNo.value,
          hash: hash.value,
          name: name.value
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'RegisterScreen' }]
      })
      if(error) return "Something went wrong."
      console.log(error,'error');
    });

    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }]
    })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Phone Number"
        returnKeyType="next"
        value={phoneNo.value}
        onChangeText={(text) => setPhoneNumber({ value: text, error: '' })}
        error={!!phoneNo.error}
        errorText={phoneNo.error}
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
        <TextInput
        label="Name"
        returnKeyType="done"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
