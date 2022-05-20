import React, { useState } from 'react';
import { AuthenticationService } from '../shared/AuthenticationService';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

export default function Login(props) {
  const navigation = useNavigation();

  const [errorMessages, setErrorMessages] = useState({});
  const [username, onUsernameChange] = useState('');
  const [password, onPasswordChange] = useState('');

  function doLogin() {
    if (username === '' || password === '') return;
    AuthenticationService.instance.login(
      username,
      password,
      (result) => {
        if (result.succes) {
          navigation.navigate("CustomerList");
        } else {
          setErrorMessages({ name: "credentials", message: result.message });
        }
      });
  }

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <Text style={loginStyles.error}>{errorMessages.message}</Text>
    );

  return (
    <View>
      <View style={loginStyles.wrapper}>
        <View style={loginStyles.inputView}>
          <TextInput
            style={loginStyles.inputText}
            placeholder='Username...'
            onChangeText={onUsernameChange}
            value={username}
          />
        </View>
        <View style={loginStyles.inputView}>
          <TextInput
            style={loginStyles.inputText}
            placeholder='Password...'
            onChangeText={onPasswordChange}
            value={password}
            secureTextEntry={true}
          />
        </View>
        <View>
          {renderErrorMessage("credentials")}
        </View>
        <Button onPress={() => doLogin()}
          title='Inloggen'
        />
      </View>
    </View>
  );
}

const loginStyles = StyleSheet.create({
  wrapper: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputText: {
    height: 50,
    color: "black"
  },
  inputView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  error: {
    color: 'red'
  }
});