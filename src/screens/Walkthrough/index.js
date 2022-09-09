import React from 'react';
import {
    SafeAreaView,
    StatusBar, Text,
    View, TouchableOpacity, Image,
    ScrollView, Dimensions, Animated,
} from 'react-native';
import { Pages } from 'react-native-pages';
import AsyncStorage from '@react-native-community/async-storage';

import assests from '../../common/assests';
import colors from '../../utils/color';
import Page1 from './screens/Page1';
import Page2 from './screens/Page2';
import Page3 from './screens/Page3';
import styles from './styles';
import { Actions } from 'react-native-router-flux';

const Walkthrough = () => {
    // const _renderPager = (options) => {
    //     let {
    //         indicatorPosition,
    //     } = options;

    //     if ('none' === indicatorPosition) {
    //         return null;
    //     }

    //     return (
    //         <Indicator {...options} />
    //     );
    // };

    const _onDoneClick = async () => {
        try {
            await AsyncStorage.setItem('isInitial', "yes");
            Actions.loginscreen();
        } catch (error) {
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={colors.statusBar}
                barStyle="light-content"
            />

            {/* <TouchableOpacity
                style={styles.skipButtonContainer}
                onPress={() => _onDoneClick()}
            >
                <Text style={styles.skipButton}>Skip</Text>
            </TouchableOpacity> */}

            <Pages>
                {/* first page */}
                <Page1 onDoneClick={_onDoneClick} />

                {/* second page */}
                <Page2 onDoneClick={_onDoneClick} />

                {/* third page */}
                <Page3 onDoneClick={_onDoneClick} />
            </Pages>
            {/* </IndicatorViewPager> */}
        </View>
    )
}

export default Walkthrough;
