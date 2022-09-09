import { StyleSheet } from 'react-native';

import { dynamicSize } from '../../utils/responsive';
import color from '../../utils/color';

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#22343C'
    },
    parentScrollView: {
        flex: 1,
        backgroundColor: '#22343C',
    },
    upperView: {
        width: "100%",
        padding: 18,
        backgroundColor: "#324B55"
    },
    image: {
        height: 180,
        width: "100%",
        borderRadius: 4,
        resizeMode: 'cover'
    },
    title: {
        marginTop: 16,
        color: '#fff',
        fontSize: 30,
    },
    desc: {
        marginTop: 16,
        color: '#fff',
        fontSize: 16
    },
    viewRoundText: {
        marginTop: 16,
        color: '#c4a962',
        fontWeight: 'bold',
},
    headerRightContainer:{
		position:'absolute',
        right:dynamicSize(0),
        padding: dynamicSize(10),
        // backgroundColor: "blue",
    },
    playButton: {
		marginTop: dynamicSize(40),
		// marginBottom: dynamicSize(45),
        backgroundColor: '#88D8B8',
        marginHorizontal: 30,
	},
    publishButton: {
		marginTop: dynamicSize(20),
        backgroundColor: color.goldenColor,
        marginHorizontal: 30,
	},
    removeButton: {
		marginTop: dynamicSize(20),
		marginBottom: dynamicSize(45),
        backgroundColor: color.fadeRedColor,
        marginHorizontal: 30,
	},
});
