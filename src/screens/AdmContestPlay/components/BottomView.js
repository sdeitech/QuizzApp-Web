import React from 'react';
import {
    StyleSheet, View, TouchableOpacity,
    Image,
} from 'react-native';

import assets from './../../../common/assests';
import color from './../../../utils/color';

const BottomView = (props) => {
    return (
        <View style={styles.container}>
            {
                !props.isSinglePlayer &&
                <>
                    <TouchableOpacity
                        onPress={props.onInvitePress}
                        style={[styles.iconContainer]}
                    >
                        <Image
                            source={assets.invitePerson}
                            style={styles.icon}
                            resizeMode={"stretch"}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.iconContainer]}
                    >
                        <Image
                            source={assets.speaker}
                            style={styles.icon}
                            resizeMode={"stretch"}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={props.onCoinsPress}
                        style={[styles.iconContainer]}
                    >
                        <Image
                            source={assets.coin}
                            style={styles.icon}
                            resizeMode={"stretch"}
                        />
                    </TouchableOpacity>
                </>
            }

            <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => props.onExitClick()}
            >
                <Image
                    source={assets.end}
                    style={styles.icon}
                    resizeMode={"stretch"}
                />
            </TouchableOpacity>
        </View>
    )
}

export default BottomView;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignSelf: 'center',
        width: "60%",
        marginTop: 6,
        // marginBottom: 18,
        bottom: 18,
        position: 'absolute',
    },
    iconContainer: {
        height: 40,
        width: 40,
        borderRadius: 25,
        backgroundColor: color.subBordorColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        height: "43%",
        width: "43%",
    },
})
