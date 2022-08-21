import React from 'react'

import { ShoppingList } from '../../components/ShoppingList'
import { Container } from './styles'
import { FormBox } from '../../components/FormBox'
import { Header } from '../../components/Header'

export function Products() {
  return (
    <Container>
      <Header title="Lista de compras" showLogoutButton />
      <FormBox />
      <ShoppingList />
    </Container>
  )
}
