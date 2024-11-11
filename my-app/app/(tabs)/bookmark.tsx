import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Bookmark = () => {
  return (
    <View style={styles.container}>
      <Text>Bookmark</Text>
    </View>
  )
}

export default Bookmark

const styles = StyleSheet.create({
    container :{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})