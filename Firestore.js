import { View, Text, Button , Alert} from 'react-native'
import React from 'react'
import firestore from '@react-native-firebase/firestore';

export default function Firestore() {
    const addData = () => {
        firestore()
            .collection('RMAD')
            .add({
                name: " Kamal",
                address: "Colombo",
                email: "kamal@gmail.com",
                phone: "0715566123"
            })
            .then(() => {
                console.log('User added!');
                Alert.alert('Data Saved ! ' , 'Student Save Successfully ! ')
            });
    }

    const getData = () => {
        firestore().collection("RMAD").get().then((res) => {
            console.log(res.docs);
        })
    }

    const deleteData = () => {
        firestore()
            .collection('RMAD')
            .doc('a3ZymELrPojMpBMnwd1g')
            .delete()
            .then(() => {
                console.log('User deleted!');
            });
    }

    const updateData = () => {
        firestore()
            .collection('RMAD')
            .doc('Om56FN3SpPKDcP3V4wRg')
            .update({
                name : "Eshara"
            })
            .then(() => {
                console.log('User updated!');
            });
    }

    return (
        <View>
            <Text>Firestore</Text>
            <Button
                title='Add Data'
                onPress={addData} />
            <Button
                title='Get Data'
                onPress={getData} />
            <Button
                title='Update Data'
                onPress={updateData} />
            <Button
                title='Delete Data'
                onPress={deleteData} />
        </View>
    )
}