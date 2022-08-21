import React from 'react'
import firestore from '@react-native-firebase/firestore'

import { Product, ProductProps } from '../Product'
import { FlatList } from 'react-native'
import { styles } from './styles'

export function ShoppingList() {
  const [products, setProducts] = React.useState<ProductProps[]>([])

  // Leitura única

  // React.useEffect(() => {
  //   firestore()
  //     .collection('products')
  //     .get()
  //     .then(({ docs }) => {
  //       const data = docs.map((doc) => {
  //         return {
  //           id: doc.id,
  //           ...doc.data(),
  //         }
  //       }) as ProductProps[]

  //       setProducts(data)
  //     })
  //     .catch((error) => console.log(error))
  // }, [])

  // Realtime

  // React.useEffect(() => {
  //   const subscribe = firestore()
  //     .collection('products')
  //     .onSnapshot((querySnapshot) => {
  //       const data = querySnapshot.docs.map((doc) => {
  //         return {
  //           id: doc.id,
  //           ...doc.data(),
  //         }
  //       }) as ProductProps[]

  //       setProducts(data)
  //     })

  //   return () => subscribe()
  // }, [])

  // Usando filtro

  React.useEffect(() => {
    const subscribe = firestore()
      .collection('products')
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        }) as ProductProps[]

        setProducts(data)
      })

    return () => subscribe()
  }, [])

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  )
}
