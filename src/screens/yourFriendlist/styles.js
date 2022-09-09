import { Dimensions } from 'react-native';
import appConstants from '../../common/appConstants';
import color from '../../utils/color';
import { dynamicSize, getFontSize } from '../../utils/responsive'
const { width, height } = Dimensions.get('window')
import * as fontFamily from '../../utils/fontFamily';


export const styles = {
	safeArea: {
		flex: 1,
		backgroundColor: '#324B55'
	},
	container: {
		flex: 1,
		backgroundColor: '#22343C'
	},
	
	bottomBoxContainer:{
		flexDirection:'row',
		justifyContent:'space-between',
	},
	bottomButtonsView: {
		marginBottom: 10,
		marginHorizontal: 30,
		flexDirection: "row",
	},
	container: {
        flex: 1,
        backgroundColor: '#324B55',
    },
    bottomList: {
        backgroundColor: '#22343C',
        paddingHorizontal: "6%",
        paddingVertical: 18,
        flex: 1,
    }, 
    loadingText: {
        color: color.goldenColor,
        fontSize: 20,
        display: 'flex',
        margin:15,
        alignSelf:'center'
    },

    renderItemView: {
        borderWidth: 1.2,
        borderRadius: 6,
        paddingHorizontal: 18,
        paddingVertical: 8,
        marginTop: 18,
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: color.hangmanColor,
    },
    leaderBoardNumber: {
        fontFamily: fontFamily.avenirSemiBold,
        fontSize: 32,
        color: color.hangmanColor,
        width: "14%",
        textAlign: 'center',
    },
    renderListImage: {
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    renderTextContainer: {
        width: "80%",
        flex: 1,
        // justifyContent: 'flex-end',
        flexDirection: 'row',
        // backgroundColor: "red",
    },
    renderName: {
        fontFamily: fontFamily.avenirSemiBold,
        fontSize: 20,
        color: color.hangmanColor,
    },
    renderPoints: {
        fontFamily: fontFamily.avenirLight,
        fontSize: 15,
        color: '#fff',
    },
    emptyViewLabel: {
        fontSize: 20,
        marginLeft: 13,
        marginTop: dynamicSize(30),
        color: '#ADBAC1',
        justifyContent: 'center',
        alignSelf: 'center',
        fontFamily: appConstants.AirbnbCerealAppLight
    },
};
export default styles;