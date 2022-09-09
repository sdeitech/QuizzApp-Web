import { StyleSheet, Dimensions } from 'react-native'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import color from '../../utils/color'
import * as fontFamily from '../../utils/fontFamily'
import appConstants from '../../common/appConstants'
const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
    safeArea:{
        flex: 1, 
        backgroundColor: '#22343C' 
    },
    renderItem: {
        width: "100%",
        flexDirection: 'row',
        paddingVertical: 14,
        borderBottomWidth: 0.4,
        borderColor: color.textLightGray,
        // alignItems: 'center',
    },
    renderItemImage: {
        height: 60,
        width: 60,
        borderRadius: 30,
    },
    rightContainer: {
        flex: 1,
    },
    flatList: {
        padding: 20,
    },
    renderText: {
        color: color.white,
        fontSize: 16,
    },

    boxContainer: {
        marginTop: dynamicSize(15),
        flexDirection: 'row',
        width: "46%",
        height: 'auto',
    },
    boxImage: {
        width: '100%',
        height: dynamicSize(80),
        resizeMode: 'cover',
        borderTopLeftRadius: dynamicSize(10),
        borderTopRightRadius: dynamicSize(10),
        shadowColor: '#0000003B',
        elevation: 1,
        shadowOffset: { width: 0, height: dynamicSize(10) },
    },
    innerBox: {
        borderWidth: 1,
        borderColor: '#68C1D2',
        alignItems: 'center',
        borderRadius: dynamicSize(10),
        width: '100%',
        shadowColor: '#000000A6',
        elevation: 1,
        marginRight: dynamicSize(10),
        shadowColor: '#0000003B',
        shadowOffset: {
            width: 0,
            height: 14
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    questionText: {
        fontSize: getFontSize(16),
        marginHorizontal: dynamicSize(8),
        letterSpacing: 0.8,
        marginVertical: dynamicSize(4),
        fontFamily: appConstants.fontBold,
        fontWeight: '800',
        textAlign: 'center'
    },
    gamename: {
        fontSize: 16,
        color: '#fff',
        marginTop: 4,
        fontFamily: appConstants.fontReqular,
        textAlign: 'center'
    },
    emptyViewLabel: {
        fontSize: 20,
        marginLeft: 13,
        marginTop: dynamicSize(300),
        color: '#ADBAC1',
        justifyContent: 'center',
        alignSelf: 'center',
        fontFamily: appConstants.AirbnbCerealAppLight
    },
});
