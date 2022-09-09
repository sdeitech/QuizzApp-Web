import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    ImageBackground,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import styles from './styles'
const { width, height } = Dimensions.get('window');
import assests from './assests'



export const IntroductionCheck = (props) => {
    selectOption = (type) => props.selectOptions(type)
    return (
        <View style={[styles.bottomSubView]}>
            <Image resizeMode='contain' source={assests.check} />
            <Text style={styles.subHeaderText}>{props.title}</Text>
        </View>
    )
}
export const BottomTab = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
    	<ImageBackground style={styles.iconView}
				source={props.icon}
			>
				<Image style={styles.tabIcon}
					source={props.image}
				/>
			</ImageBackground>
            </TouchableOpacity>
    )
}
export const HeartTab = (props) =>{
    return(
        <TouchableOpacity onPress={props.onPress}>
    <View style={styles.middleButtonView}>
				<Image style={{ margin: 15 }}
					source={assests.heart_main_tab} />
			</View>
            </TouchableOpacity>
    )
}

