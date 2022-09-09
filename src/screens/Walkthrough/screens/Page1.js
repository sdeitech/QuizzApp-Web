import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

import assests from '../../../common/assests';
import appConstants from '../../../utils/appConstants';
import styles from './page.styles';

const Page1 = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.topView} />
            <Text
                style={styles.title}
            >
                {appConstants.WALK_SCREEN_TITLE_1}
            </Text>

            <Image
                source={assests.walkthrow0}
                style={styles.centerImage}
                resizeMode={"contain"}
            />

            <View>
                <Text
                    style={styles.subTitle}
                >
                    {appConstants.WALK_SCREEN_SUB_TITLE_1}
                </Text>

                <View height={30} />

                <Text
                    style={styles.desc}
                >
                    {appConstants.WALK_SCREEN_DESC_1}
                </Text>

                <View height={30} />
            </View>

            <TouchableOpacity
                style={styles.skipButtonContainer}
                onPress={() => props.onDoneClick()}
            >
                <Text style={styles.skipButton}>Skip</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Page1
