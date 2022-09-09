import React from 'react';
import {
	View, Text, FlatList,
	StyleSheet, Image, TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { dynamicSize, getFontSize } from '../../../utils/responsive'
import appConstants from '../../../common/appConstants';
import assests from '../../../common/assests';



const GameList = (props) => {
	/**
	 * Render List Row
	 */
	const renderListRow = ({ item, index }) => {
		const roundTitle = () => {
			if (item.totalRound > 1) {
				return `${item.totalRound} Rounds`;
			}
			return `${item.totalRound} Round`;
		};

		return (
			<TouchableOpacity
				style={[
					styles.boxContainer,
					{
						marginLeft: (index) % 2 ? "8%" : undefined,
						// backgroundColor:  (index) % 2 ? "blue" : "red"
					}
				]}
				onPress={() => Actions.contestInfo({ contestInfo: item })}
			>
				<View style={[styles.innerBox, { borderColor: '#68C1D2', height: '100%' }]}>
					{
						item.image
							?
							<Image style={styles.boxImage} source={{ uri: item.image }} resizeMode="cover" />
							:
							<Image style={styles.boxImage} source={assests.smallPlaceholder} resizeMode="cover" />
					}
					{/* <View style={{ alignSelf: 'center', alignItems: 'center'}}> */}
					<Text numberOfLines={1} style={[styles.questionText, { color: '#68C1D2' }]}>{item.title}</Text>
					<Text numberOfLines={1} style={styles.gamename}>{roundTitle() || ""}</Text>
					<Text numberOfLines={1} style={styles.gameCreator}>{item.userName || ""}</Text>
					{/* </View> */}
				</View>
			</TouchableOpacity>
		)
	}

	const retrieveMore = () => {
		console.log("Called")
		props.retrieveMore && props.retrieveMore()
	}

	return (
		<View style={{ marginHorizontal: 30, backgroundColor: '', flex: 1 }}>
			<FlatList
				numColumns={2}
				data={props.data}
				renderItem={renderListRow}
				keyExtractor={(item, index) => index.toString()}
				onEndReached={retrieveMore}
				onEndReachedThreshold={0.3}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	)
}


export default GameList;


const styles = StyleSheet.create({

	boxContainer: {
		marginTop: dynamicSize(15),
		flexDirection: 'row',
		// width: dynamicSize(158),
		width: "46%",
		height: 'auto',
		// backgroundColor: 'red',
		//	aspectRatio: 1 / 1,
		// marginHorizontal: dynamicSize(10),
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

	questionText: {
		fontSize: getFontSize(16),
		letterSpacing: 0.8,
		marginTop: dynamicSize(10),
		marginHorizontal: dynamicSize(8),
		fontFamily: appConstants.fontBold,
		fontWeight: '800',
	},
	gamename: {
		fontSize: 14,
		color: '#ADBAC1',
		marginTop: dynamicSize(6),
		fontFamily: appConstants.fontReqular,
		paddingHorizontal: 5,
		textAlign: 'center',
	},
	gameCreator: {
		marginBottom: 10,
		fontSize: 13,
		color: '#ADBAC1',
		marginTop: 6,
		fontFamily: appConstants.fontReqular,
		paddingHorizontal: 5,
		textAlign: 'center',
	},
	autherText: {
		fontSize: getFontSize(12),
		color: '#C0C9CE',
		marginTop: dynamicSize(4),
		marginBottom: dynamicSize(10),
		fontFamily: appConstants.fontReqular,
	},
	authorTextSel: {
		fontSize: getFontSize(12),
		color: '#FFFFFF',
		marginTop: dynamicSize(4),
		marginBottom: dynamicSize(10),
		fontFamily: appConstants.fontReqular,
		backgroundColor: '#FF5485',
		padding: 5,
		borderRadius: 5,
		overflow: 'hidden'
	},

})