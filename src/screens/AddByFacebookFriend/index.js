import React from 'react';
import {
    SafeAreaView, StatusBar, Text,
    View, TouchableOpacity, Image,
} from 'react-native';

import assests from '../../common/assests';
import styles from './styles';
import MaineHeader from '../../common/headerWithText';

const AddByFacebookFriend = () => {

    const headerRight = () => {
        return (
            <TouchableOpacity onPress={() => { }} style={[styles.crossLogo]}>
                <Image source={assests.dot} />
            </TouchableOpacity>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor={colors.statusBar}
                barStyle="light-content"
            />
            <MaineHeader
                isBack
                subHeaderTextS={{ color: '#fff' }}
                title={'Facebook Friend'}
                // right={headerRight()}
            />
            <View style={styles.innerContainer}>
                {/* <Image
                    style={styles.bgImageIcon}
                    resizeMode={'contain'}
                    source={assests.backLogo}
                /> */}
            </View>
        </SafeAreaView>
    )
}

export default AddByFacebookFriend;
