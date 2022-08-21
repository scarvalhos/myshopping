import React, { useState } from 'react'
import auth from '@react-native-firebase/auth'

import { Container, Account, Title, Subtitle } from './styles'
import { ButtonText } from '../../components/ButtonText'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Alert } from 'react-native'

export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // const handleSignInAnonymously = async () => {
  //   const { user } = await auth().signInAnonymously()
  //   console.log(user)
  // }

  const handleSignInWithEmailAndPassword = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => user)
      .catch((error) => {
        if (
          error.code === 'auth/user-not-found' ||
          error.code === 'auth/wrong-password'
        ) {
          return Alert.alert(
            'Usuário não encontrado!',
            'E-mail ou senha inválida!'
          )
        }
      })
  }

  const handleCreateUserAccount = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => Alert.alert('Usuário criado com sucesso'))
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          return Alert.alert(
            'E-mail não disponível',
            'Escolha outro e-mail para cadastrar.'
          )
        }

        if (error.code === 'auth/invalid-email') {
          return Alert.alert('E-mail inválido', 'Verifique o e-mail digitado.')
        }

        if (error.code === 'auth/weak-password') {
          return Alert.alert(
            'Senha fraca',
            'Sua senha deve ter no mínimo 06 digitos.'
          )
        }
      })
  }

  const handleResetPassword = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() =>
        Alert.alert(
          'E-mail enviado com sucesso',
          'Em alguns instantes você irá receber um link em seu e-mail para a redefinição da sua senha.'
        )
      )
      .catch((error) => console.log(error))
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input placeholder="senha" secureTextEntry onChangeText={setPassword} />

      <Button title="Entrar" onPress={handleSignInWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleResetPassword} />
        <ButtonText
          title="Criar minha conta"
          onPress={handleCreateUserAccount}
        />
        {/* <ButtonText title="Anônimo" onPress={handleSignInAnonymously} /> */}
      </Account>
    </Container>
  )
}
