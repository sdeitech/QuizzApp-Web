import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import styles from './styles'
import assests from '../../common/assests';
import BoxView from './boxView'
import appConstants from '../../common/appConstants';

const BoxScreenView = (props) => {
  return (
    <View style={styles.innerContainer}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 24, }}>
        <Text style={{ fontSize: 22, color: '#FFFFFF', fontFamily: appConstants.AirbnbCerealAppBook }}>{props.title} </Text>
      </View>
      <BoxView
        categoryData={props.data}
        onClick={props.handleClick}
        search={props.search}
      />
    </View>
  )
}


export default BoxScreenView;