import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

const Profile = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>This is Profile</Text>
      <View style={styles.button} >
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')}/>
    </View>
    </View>
  )
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    width: 200,
  }
})