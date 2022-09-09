import React from 'react'
import {
    StyleSheet, Text, View,
    TouchableOpacity,
    Image
} from 'react-native'

import styles from './../styles';
import assests from './../../../common/assests';

const TopImagesView = () => {
    return (
        <View style={styles.topImageContainer}>
            {/* left image component */}
            <TouchableOpacity
                onPress={() => { }}
                style={styles.topMainImageContainer}
            >
                <View>
                    <Image style={{ alignSelf: 'center' }} source={assests.upload} />
                </View>
            </TouchableOpacity>

            <View style={styles.rightComponents}>
                <TouchableOpacity style={styles.rightTops}>
                    <Image style={styles.rightSmallImages} source={assests.upload} resizeMode={'stretch'} />
                </TouchableOpacity>

                {/* seperator */}
                <View height={18} />

                <TouchableOpacity style={styles.rightTops}>
                    <Image style={styles.rightSmallImages} source={assests.upload} resizeMode={'stretch'} />
                </TouchableOpacity>

                {/* seperator */}
                <View height={18} />

                <TouchableOpacity style={styles.rightTops}>
                    <Image
                        style={[styles.rightSmallImages, { top: -6 }]}
                        source={assests.upload}
                        resizeMode={'stretch'}
                    />

                    <Text style={styles.addMore}>Add More</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TopImagesView;
