import { StyleSheet, Dimensions, Platform } from 'react-native';
import appConstants from '../../common/appConstants';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: appConstants.AppTheamColor
	},

});
export default styles