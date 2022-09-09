import React, { useEffect, useState } from 'react'
import Animated, { Easing } from 'react-native-reanimated'
import { consoleLog } from './helper'

const Fade = (props) => {
    const [visible, setVisible] = useState(props.visible)
    const visibility = new Animated.Value(props.visible ? 1 : 0)
    useEffect(() => {
        if (visible) {
        setVisible(true)
        }
        Animated.timing(visibility, {
            toValue: visible ? 1 : 0,
            duration: 1000,
            easing: Easing.ease
        }).start(() => {
            setVisible(visible)
        });
    }, [props])

    const containerStyle = {
        opacity: visibility.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        }),
        transform: [
            {
                scale: visibility.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1.1, 1],
                }),
            },
        ],
    };


    return (
        <Animated.View style={visible ? [containerStyle, props.style] : containerStyle} >
            {visible ? props.children : null}
            {/* {props.children} */}
        </Animated.View>
    )
}

export default Fade