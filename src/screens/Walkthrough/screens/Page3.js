import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';

import assests from '../../../common/assests';
import appConstants from '../../../utils/appConstants';
import styles from './page.styles';

const Page3 = (props) => {
    return (
        <View style={styles.container}>

            <View style={styles.topView} />
            <Text
                style={styles.title}
            >
                {appConstants.WALK_SCREEN_TITLE_3}
            </Text>

            <Image
                source={assests.walkthrow2}
                style={styles.centerImage}
                resizeMode={"contain"}
            />

            <View>
                <Text
                    style={styles.subTitle}
                >
                    {appConstants.WALK_SCREEN_SUB_TITLE_3}
                </Text>

                <View height={30} />

                <Text
                    style={styles.desc}
                >
                    {appConstants.WALK_SCREEN_DESC_3}
                </Text>

                <View height={30} />
            </View>


            <TouchableOpacity
                style={styles.doneButtonContainer}
                onPress={() => props.onDoneClick()}
            >
                <Text style={styles.skipButton}>Done</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Page3;
