import React, { useCallback, useEffect, useState } from 'react'
import storage from '@react-native-firebase/storage'

import { Container, PhotoInfo } from './styles'
import { File, FileProps } from '../../components/File'
import { Alert, FlatList } from 'react-native'
import { Header } from '../../components/Header'
import { Photo } from '../../components/Photo'
import { useFocusEffect } from '@react-navigation/native'

export function Receipts() {
  const [photos, setPhotos] = useState<FileProps[]>([])
  const [photosSelected, setPhotoSelected] = useState('')
  const [photoInfo, setPhotoInfo] = useState('')

  const fetchImages = async () => {
    storage()
      .ref('images')
      .list()
      .then((result) => {
        const files: FileProps[] = []

        result.items.forEach((file) => {
          files.push({
            name: file.name,
            path: file.fullPath,
          })
        })

        setPhotos(files)
      })
  }

  const handleShowImage = async (path: string) => {
    const urlImage = await storage().ref(path).getDownloadURL()
    setPhotoSelected(urlImage)

    const info = await storage().ref(path).getMetadata()
    setPhotoInfo(`Upload realizado em ${info.timeCreated}`)
  }

  const handleDeleteImage = (path: string) => {
    storage()
      .ref(path)
      .delete()
      .then(() => {
        fetchImages()
        Alert.alert('Imagem excluída com sucesso!')
      })
      .catch((error) => console.log(error))
  }

  useFocusEffect(
    useCallback(() => {
      fetchImages()
    }, [])
  )

  return (
    <Container>
      <Header title="Comprovantes" />

      <Photo uri={photosSelected} />

      <PhotoInfo>{photoInfo}</PhotoInfo>

      <FlatList
        data={photos}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <File
            data={item}
            onShow={() => handleShowImage(item.path)}
            onDelete={() => handleDeleteImage(item.path)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ width: '100%', padding: 24 }}
      />
    </Container>
  )
}
