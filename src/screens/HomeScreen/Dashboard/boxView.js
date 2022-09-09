import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import styles from './styles'
import assests from '../../../common/assests';

const BoxView = (props) => {
  const imageData = [
    { key: 'Android' },
    { key: 'Android' },
    { key: 'Android' },

  ]
  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={props.data}
        horizontal={true}
        renderItem={({ item }) => (
          <View style={styles.boxContainer}>
            <View style={[styles.innerBox, { borderColor: '#68C1D2' }]}>
              <Image style={styles.boxImage} source={{ uri: item.image }} resizeMode="cover" />
              <Text style={[styles.questionText, { color: '#68C1D2' }]}>{item.title}</Text>
              <Text numberOfLines={2} ellipsizeMode='tail' style={styles.gamename} >{item.description}</Text>
              {/* <Text style={styles.autherText}>Michael</Text> */}
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />


    </View>
  )
}


export default BoxView;