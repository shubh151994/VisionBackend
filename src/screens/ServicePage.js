import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'

export default function ServicePage({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Services</Header>
      <Button mode="outlined" onPress={() => navigation.navigate('ServicesScreen')}>
        Add Service
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('ServicesListScreen')}>
        List of Services
      </Button>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }
      >
        Logout
      </Button>
    </Background>
  )
}
