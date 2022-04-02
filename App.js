import { View, Text } from 'react-native'
import React from 'react'
import Authentication from './Authentication'
import Firestore from './Firestore'
import Loadall from './Loadall'
import Upload from './Upload'

export default function App() {
  return (
    <View>
     <Upload />
    </View>
  )
}