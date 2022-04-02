import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth';
import { TextInput } from 'react-native-paper';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
  webClientId: '818555076337-jhnqatvfncl4gkbmq9u305d7vhj3eutf.apps.googleusercontent.com',
});

export default function Authentication() {

  const [username, SetUsername] = useState('');
  const [email, SetEmail] = useState('');
  const [phone, SetPhone] = useState('');
  const [password, SetPassword] = useState('');

  const register = async () => {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        await auth().currentUser.updateProfile({
          displayName: username,
          phoneNumber: phone
        })
        console.log('User account created & signed in!');
        clear();
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }
  const login = () => {
    auth().signInWithEmailAndPassword('theenu@example.com', 'SuperSecretPassword!')
      .then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log("Details incorrect !");
      })

  }

  const googlein = async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  const clear = () => {
    SetPassword(''),
      SetEmail(''),
      SetPhone(''),
      SetUsername('')
  }

  return (
    <View>
      <Text>App</Text>
      <TextInput
        label="User Name"
        value={username}
        onChangeText={text => SetUsername(text)}
      />
      <TextInput
        label="E mail"
        value={email}
        onChangeText={text => SetEmail(text)}
      />
      <TextInput
        label="Phone Number"
        value={phone}
        onChangeText={text => SetPhone(text)}
      />
      <TextInput
        label="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => SetPassword(text)}
      />
      <Button
        title='Register'
        color={'red'}
        onPress={register}
      ></Button>
      <Button
        title='Login'
        color={'blue'}
        onPress={login}
      ></Button>
      <GoogleSigninButton
        style={{ width: 192, height: 54 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={googlein}
      />
    </View>
  )

}