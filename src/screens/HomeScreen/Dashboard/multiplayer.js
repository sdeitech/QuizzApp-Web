import React from 'react';
import { View, Text, Image, FlatList, Dimensions } from 'react-native';
import styles from './styles'
import assests from '../../../common/assests';

const Multiplayer = (props) => {
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
                renderItem={({ item }) => {
                    return (
                        <View style={styles.multiview}>
                            <View style={{ width: '100%', height: 70, borderTopLeftRadius: 10, borderTopRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Image style={styles.boxImage} source={{ uri: item.image }} />
                            </View>
                            <Text style={{ fontSize: 16, color: '#68C1D2', letterSpacing: 0.8, marginTop: 8, fontFamily: appConstants.fontBold, fontWeight: '800' }}>{item.title}</Text>
                            <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontSize: 12, color: '#fff', marginTop: 1, paddingHorizontal: 5, textAlign: 'center', marginBottom: 10 }} >{item.description}</Text>
                            {/* <Text style={{ fontSize: 12, color: '#C0C9CE', marginTop: 4, marginBottom: 10 }}>Michael</Text> */}
                        </View>
                    )
                }}
            />


        </View>
    )
}


export default Multiplayer;