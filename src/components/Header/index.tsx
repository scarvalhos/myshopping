import React from 'react'
import auth from '@react-native-firebase/auth'

import { Container, Title } from './styles'
import { ButtonIcon } from '../ButtonIcon'

type Props = {
  title: string
  showLogoutButton?: boolean
}

export function Header({ title, showLogoutButton = false }: Props) {
  const handleSignOut = () => {
    auth().signOut()
  }

  return (
    <Container showLogoutButton={showLogoutButton}>
      <Title>{title}</Title>

      {showLogoutButton && (
        <ButtonIcon
          icon="logout"
          color="alert"
          style={{ marginTop: 20 }}
          onPress={handleSignOut}
        />
      )}
    </Container>
  )
}
