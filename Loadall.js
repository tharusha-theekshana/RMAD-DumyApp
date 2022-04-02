import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';


export default function Loadall() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const subscriber = firestore()
            .collection('RMAD')
            .onSnapshot(querySnapshot => {
                const users = [];

                querySnapshot.forEach(documentSnapshot => {
                    users.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setUsers(users);
            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);

    return (
        <View>
            <FlatList
                data={users}
                renderItem={({ item }) => (
                    <View style={{ height: 100, flex: 1, alignItems: 'center', justifyContent: 'center' , fontSize: 30}}>
                        <Text>User Name : {item.name}</Text>
                        <Text>Address : {item.address}</Text>
                        <Text>E mail : {item.email}</Text>
                        <Text>phone : {item.phone}</Text>
                        <Text> --------------------------------------------------------------- </Text>
                    </View>
                )}
            />
        </View>
    )
}