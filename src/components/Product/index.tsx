import React from 'react'
import firestore from '@react-native-firebase/firestore'

import { Container, Info, Title, Quantity, Options } from './styles'
import { ButtonIcon } from '../ButtonIcon'

export type ProductProps = {
  id: string
  description: string
  quantity: number
  done: boolean
}

type Props = {
  data: ProductProps
}

export function Product({ data }: Props) {
  const toggleDoneProduct = () => {
    firestore().collection('products').doc(data.id).update({
      done: !data.done,
    })
  }

  const handleDeleteProduct = () => {
    firestore().collection('products').doc(data.id).delete()
  }

  return (
    <Container>
      <Info>
        <Title done={data.done}>{data.description}</Title>

        <Quantity>Quantidade: {data.quantity}</Quantity>
      </Info>

      <Options>
        <ButtonIcon
          icon={data.done ? 'undo' : 'check'}
          onPress={toggleDoneProduct}
        />

        <ButtonIcon icon="delete" color="alert" onPress={handleDeleteProduct} />
      </Options>
    </Container>
  )
}
