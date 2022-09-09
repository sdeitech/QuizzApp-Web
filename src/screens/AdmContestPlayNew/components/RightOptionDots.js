import React from 'react';
import {
    StyleSheet, Text, TouchableOpacity,
    View, Platform,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import appConstants from '../../../common/appConstants';

const RightOptionDots = (props) => {

    console.log(props, 'lets play the game')
    const _onMuteAllPress = () => {
        props.toggleModeratorOption(false);
    }

    const _onGiveScorePress = () => {
        props.toggleModeratorOption(false);
        Actions.giveScore({ roomId: props.roomId, gameId: props.gameId });
    }

    const _onInviteUsersPress = () => {
        props.toggleModeratorOption(false);
        props.onInviteUsersClick();
    }

    const _onReportClick = () => {
        props.toggleModeratorOption(false);
        props.onReportClick();
    }

    console.log(props, 'what is current scene')
    return (
        <View style={[styles.container, {
            // top: props.isModerator ? 40 : 70,
            top: Platform.OS === 'android' ? 20 : 40,
        }]}>
            {/* // ! if not moderator then unable to see following scene */}
            {
                props.isModerator &&
                <>
                    <TouchableOpacity
                        onPress={() => { _onMuteAllPress() }}
                        style={[styles.optionButtons]}
                    >
                        <Text style={styles.lableText}>Mute All</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => { _onGiveScorePress() }}
                        style={[styles.optionButtons, { marginTop: 14 }]}
                    >
                        <Text style={styles.lableText}>Give Score</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => { _onInviteUsersPress() }}
                        style={[styles.optionButtons, { marginVertical: 14 }]}
                    >
                        <Text style={styles.lableText}>Invite users</Text>
                    </TouchableOpacity>
                </>
            }


            <TouchableOpacity
                onPress={() => { props?._onMembersPress() }}
                style={[styles.optionButtons, { marginBottom: 14 }]}
            >
                <Text style={styles.lableText}>Members</Text>
            </TouchableOpacity>

            {
                !props?.isCreator &&
                <TouchableOpacity
                    onPress={() => { _onReportClick() }}
                    style={[styles.optionButtons]}
                >
                    <Text style={styles.lableText}>Report</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

export default RightOptionDots;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 10,
        backgroundColor: '#324B55',
        borderRadius: 5,
        // width: 110,
        paddingRight: 22,
        paddingLeft: 6,
        paddingVertical: 10,
        zIndex: 1000,
    },
    optionButtons: {
        flexDirection: 'row',
        marginLeft: 10,
        alignItems: 'center',
    },
    lableText: {
        color: '#FAFAFA',
        fontFamily: appConstants.AirbnbCerealAppLight,
        fontSize: 18
    },
});
