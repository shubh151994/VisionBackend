import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  ServicesScreen,
  ServicesListScreen,
  MaterialsScreen,
  MaterialsListScreen,
  ServicePage,
  MaterialPage,
} from './src/screens'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="ServicesScreen" component={ServicesScreen} />
          <Stack.Screen name="MaterialsScreen" component={MaterialsScreen} />
          <Stack.Screen name="ServicesListScreen" component={ServicesListScreen} />
          <Stack.Screen name="MaterialsListScreen" component={MaterialsListScreen} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
          <Stack.Screen name="ServicePage" component={ServicePage} />
          <Stack.Screen name="MaterialPage" component={MaterialPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
