import React from 'react';
import { View, Text, Image, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import appConstants from './appConstants';
import assests from './assests';

const Header = (props) => {
    return (
        <View style={[styles.header, props.style]}>
            {props.isBack ?
                <TouchableOpacity style={{ position: 'absolute', left: 30 }} onPress={() => { typeof props.onBack === "function" ? props.onBack() : Actions.pop() }} >
                    <Image source={assests.backArrow} resizeMode='contain' />
                </TouchableOpacity>
                : null}
            <View>
                <Text style={[styles.headerText, props.titleStyle]}>{props.title}</Text>
                {
                    !!props.subTitle &&
                    <Text style={[styles.headerSubText, props.subTitleStyle]}>{props.subTitle}</Text>
                }
            </View>

            {props.right ? props.right : null}
        </View>
    )
}

// Header.prototype = {
//     onBack: PropType
// }

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#324B55'
    },
    title: {
        flex: 1,
        alignItems: 'center',
        marginLeft: 38
    },
    headerText: {
        fontSize: 26,
        marginLeft: 13,
        color: appConstants.white,
        fontFamily: appConstants.AirbnbCerealAppLight
    },
    headerSubText: {
        fontSize: 12,
        marginLeft: 13,
        color: appConstants.white,
        fontFamily: appConstants.AirbnbCerealAppLight,
        textAlign: 'center',
    },
})

export default Header;