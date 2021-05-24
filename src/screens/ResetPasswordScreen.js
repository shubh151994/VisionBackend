import React, { useState } from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
//import { emailValidator } from '../helpers/emailValidator'
import { phoneNumberValidator } from '../helpers/phoneNumberValidator'

export default function ResetPasswordScreen({ navigation }) {
  //const [email, setEmail] = useState({ value: '', error: '' })
  const [phone_number, setPhoneNumber] = useState({ value: '', error: '' })

  const sendResetPasswordPhone = () => {
    //const emailError = emailValidator(email.value)
    const phoneNumberError = phoneNumberValidator(phone_number.value)
    if (phoneNumberError) {
      setPhoneNumber({ ...phone_number, error: phoneNumberError })
      return
    }
    navigation.navigate('LoginScreen')
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Restore Password</Header>
      <TextInput
        label="Phone Number"
        returnKeyType="done"
        value={phone_number.value}
        onChangeText={(text) => setPhoneNumber({ value: text, error: '' })}
        error={!!phone_number.error}
        errorText={phone_number.error}
        autoCapitalize="none"
        // autoCompleteType="email"
        // textContentType="emailAddress"
        // keyboardType="email-address"
        description="You will receive sms with password reset link."
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordPhone}
        style={{ marginTop: 16 }}
      >
        Send Instructions
      </Button>
    </Background>
  )
}
