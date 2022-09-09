import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import styles from './styles'
import assests from '../../common/assests';
import { dynamicSize } from '../../utils/responsive';
import * as validation from '../../utils/validation';
import isUserAuthorizedItem from '../../utils/helpers/isUserAuthorizedItem';
import color from '../../utils/color';

const BoxView = (props) => {
console.log(props,'props shown')
  const [selCategory, setSelCategory] = useState('')
  const [categoryList, setCategoryList] = useState([
    { key: 'Android1', isSelected: false, icon: assests.candy, },
    { key: 'Android2', isSelected: false, icon: assests.candy, },
  ]);
  const imageData = [
    { key: 'Android1', isSelected: false, icon: assests.candy, },
    { key: 'Android2', isSelected: false, icon: assests.candy, },
  ]
  const [metaData, setMetaData] = useState(false);

  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps={"always"}
        data={props.categoryData}
        numColumns={3}
        // horizontal={true}
        renderItem={({ item, index }) => {
          // const selected = props.categorySeleList.map(cat => cat._id).includes(item._id);
          // <TouchableWithoutFeedback onPress={() => setSelCategory(item.key)}>
          // <View style={{ flex: 1, marginRight: 20, marginTop: 10, alignItems: 'center', width: "33%" }}>
          return (
            <View style={{ marginTop: 10, width: "33%" }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  props.onClick(index, item)
                }}
              >
                <View
                  style={[{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    height: dynamicSize(94),
                    width: dynamicSize(94),
                    borderRadius: 10,
                    opacity: isUserAuthorizedItem(item?.subscriptionType) ? 1 : 0.4
                  }]}
                >
                  {
                    item.image != ""
                      ?
                      <Image resizeMode={'cover'} style={{ height: '100%', width: '100%', borderRadius: 10, borderWidth: (item.isSelected) ? 4 : 4, borderColor: (item.isSelected) ? '#FCD274' : '#324B55' }} source={{ uri: item.image }} />
                      :
                      <Image resizeMode={'cover'} style={{ height: '100%', width: '100%', borderRadius: 10, borderWidth: (item.isSelected) ? 4 : 4, borderColor: (item.isSelected) ? '#FCD274' : '#324B55' }} source={assests.candy} />
                  }

                </View>
              </TouchableWithoutFeedback>

              {
                !isUserAuthorizedItem(item?.subscriptionType) &&
                <View
                  style={{
                    backgroundColor: color.white,
                    paddingHorizontal: 3,
                    paddingVertical: 2,
                    position: 'absolute',
                    // top: -15,
                    // left: -4.3,
                    top: 70,
                    borderRadius: 10,
                    width: "75%",
                    alignSelf: 'center',
                    justifyContent: 'space-evenly',
                    flexDirection: 'row',
                  }}
                >

                  <Image
                    resizeMode={'stretch'}
                    style={{
                      height: 12,
                      width: 12
                    }}
                    source={assests.pro}
                  />

                  <Text
                    style={{
                      color: color.black,
                      textAlign: 'center',
                      fontSize: 10,
                      // fontWeight: 'bold',
                    }}
                  >
                    {item?.subscriptionType.slice(0,1) + item?.subscriptionType.slice(1).toLowerCase()}
                  </Text>
                </View>
              }


              <Text style={[{
                fontSize: 14,
                textAlign: 'center',
                marginTop: 4,
                fontFamily: appConstants.AirbnbCerealAppMedium,
                color: (item.isSelected) ? '#FCD274' : '#9CA3A5',
                // right: 6,
                width: "90%"
              }]}>{item.name}</Text>
            </View>
          );
        }}
      // ListEmptyComponent={EmptyListMessage}

      // </TouchableWithoutFeedback>
      // )}
      />
    </View>
  )


  /**
     * Handle Row Click
     */
  function handleRowClick(selectedIndex) {
    let arrList = categoryList
    arrList[selectedIndex].isSelected = !arrList[selectedIndex].isSelected
    setCategoryList(arrList)
    setMetaData(!metaData)
  }

}


export default BoxView;


/**
 *
 * {/* <View style={styles.boxContainer}>
              <View style={[styles.innerBox, { borderWidth: selCategory == item.key ? 3 : 1, borderColor: selCategory == item.key ? '#FCD274' : '#68C1D2' }]}>
                <Image resizeMode={'cover'} style={styles.boxImage} source={assests.candy} />
                <Text style={[styles.questionText, { color: '#68C1D2' }]}>Canday</Text>
              </View>
            </View>
 */