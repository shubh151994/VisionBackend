/* eslint-disable no-undef */
/* eslint-disable no-console */
const axios = require('axios').default

callSignup = async () => {
  console.log(this.state.phone_number)
  console.log(this.state.email)
  console.log(this.state.password)

  if (this.state.username && this.state.email && this.state.password) {
    this.setState({ isShowingLoader: true })

    try {
      const dop = await axios.post('https://register-auth-project.herokuapp.com/register', {
        name: this.state.username,
        email: this.state.email,
        pass: this.state.password,
      })
      console.log(dop.data)
      Alert.alert('Message', dop.data.data, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false })
      this.setState({ isShowingLoader: false })
    } catch (error) {
      console.log(error)
      this.setState({ isShowingLoader: false })
      Alert.alert('Error', 'Something went wrong!', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false })
    }
  } else {
    Alert.alert('Error', 'Please enter required fields!', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false })
  }
}
