import { StyleSheet, Dimensions } from 'react-native'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import color from '../../utils/color'
import appConstants from '../../common/appConstants'
const { width, height } = Dimensions.get('window')

export const styles = {
    safeArea:{
        flex: 1, 
        backgroundColor: '#22343C' 
    },
    imageStyle: {
        marginTop:Dimensions.get('window').height/6,
        width:Dimensions.get('window').width/2,
        marginBottom:Dimensions.get('window').height/10
    },
	crossLogo:{
		position:'absolute',
        right:dynamicSize(0),
        top:dynamicSize(0),
        padding: dynamicSize(10),
        // backgroundColor: "blue",
	},
}