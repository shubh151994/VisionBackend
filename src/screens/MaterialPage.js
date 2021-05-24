import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'

export default function MaterialPage({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Materials</Header>
      <Button mode="outlined" onPress={() => navigation.navigate('MaterialsScreen')}>
        Add Material
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('MaterialsListScreen')}>
        List of Materials
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
