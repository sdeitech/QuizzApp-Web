/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useRef } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	StatusBar, Image, TextInput,
	TouchableOpacity,
	Keyboard
} from 'react-native';

import {
	Header,
	LearnMoreLinks,
	Colors,
	DebugInstructions,
	ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import assests from '../../../common/assests';
import appConstants from '../../../common/appConstants';
import GameList from '../Search/GameList';
import FilterModel from '../Search/FilterModel';
import color from '../../../utils/color';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as actionType from '../../../redux/action';
import * as commonApi from '../../../ServiceRequests/serviceContest'
import { LoaderAction } from '../../../redux/action'
import { PopUpScreen } from '../../../common/alertPop'
import { dynamicSize, getFontSize } from '../../../utils/responsive'
import { log } from 'react-native-reanimated';
import { Loader } from '../../../components/customComponent';


function Search(props) {
	const searchtimeRef = useRef(null);
	const dispatch = useDispatch();

	const loader = useSelector(state => state.authReducer.loader);

	const [searchKeyword, setSearchKeyword] = useState('')
	const [isFilterModelVisible, setFilterModelVisible] = useState(false)

	// filter object will be use for pagination
	const [filterObject, setfilterObject] = useState({});

	const [isIconShow, setIconShow] = useState(false)
	const [params, setParams] = useState(null)
	const [visible, setVisible] = useState(false)
	// const [errorMsgText, setErrorMsgText] = useState('')
	const [pageNos, setPageNos] = useState(0)

	const [search, setSearch] = useState('')//Search
	const [searchdata, setSearchData] = useState([]);
	const [gamesList, setGameList] = useState([])

	const [dynamicCategory, setdynamicCategory] = useState([]);

	//Error Dialog
	const [isDialogVisible, setDialogVisible] = useState(false);
	const [errorMsgText, setErrorMsgText] = useState('');
	const [visiblerror, setVisibleError] = useState(false);
	const [show, setShow] = useState(false);
	const [count, setCount] = useState(0);


	// const gamesList = [
	// 	{ title: '1', image: assests.candy, gamename: "Candy Crush Saga", isBoarder: false, autherText: 'Michael' },
	// 	{ title: '2', image: assests.pubg, gamename: "Hangman", isBoarder: false, autherText: 'Michael' },
	// 	{ title: '3', image: assests.counter, gamename: "Silentmen", isBoarder: false, autherText: 'Michael' },
	// 	{ title: '4', image: assests.candy, gamename: "Hangman", isBoarder: false, autherText: 'Michael' },
	// 	{ title: '5', image: assests.candy, gamename: "Candy Crush Saga", isBoarder: false, autherText: 'Michael' },
	// 	{ title: '6', image: assests.candy, gamename: "Silentmen", isBoarder: false, autherText: 'Michael' },
	// ]

	// const { gamesList } = useSelector(state => ({
	// 	gamesList: state.dashboardReducer.gamesList,
	// }), shallowEqual);


	useEffect(() => {
		// console.log("search call => didmount");
		setShow(false)
		setCount(0)
		setSearchData([])
		getTredContests();
		// if (gamesList.length == 0) {
		// 	// getSearchListData('', 0, null)
		// } else {
		// 	let arrList = gamesList
		// 	console.log("arrList===", gamesList)
		// }
	}, [])

	const getTredContests = async () => {
		// console.log("search call => getTredContests");
		dispatch(LoaderAction(true))
		const response = await commonApi.getGamesList('', '', '', '', '', 0, dispatch);

		// get only for display category from server
		let categoryResponse = await commonApi.getCategoryList(dispatch);
		if (categoryResponse['status']) {
			// console.log("categoryResponse => ", JSON.stringify(categoryResponse.data));
			const categoryNewMap = categoryResponse.data.map(x => ({ title: x.name, id: x._id, isSelected: false }));
			setdynamicCategory(categoryNewMap);
		}

		if (response['status']) {
			const arrData = response.data;
			console.log("my new data of object => index : ", pageNos);
			console.log("my new data of object => ", arrData);
			setGameList(arrData);
		}
		else {
			setTimeout(() => {
				// setErrorMsgText('No data available');
				// setVisible(true);
				setGameList([]);
				// setTrendContests([]);
			}, 1000);
		}
	}

	/**
	 * 
	 * call api for search data
	 *  
	 */
	const getContestForSearch = async (language = '', playerType = '', categoryIds = '', searchKey = '') => {
		dispatch(LoaderAction(true));
		const response = await commonApi.getGamesList(language, playerType, categoryIds, searchKey, 'no', 0, dispatch);
		if (response['status']) {
			const arrData = response.data;
			console.log("my new data of object => opps", arrData);
			// setSearchData([...searchdata, arrData]);
			setGameList([...searchdata, ...arrData]);
		}
		else {
			setTimeout(() => {
				// setErrorMsgText('No data available')
				// setVisible(true)
				setTrendContests([]);
			}, 1000);
		}
	}

	/**
	 * Search Keyword
	 */
	const handleOnSeachKeyword = (searchStr) => {
		if (searchStr.length > 0) {
			setIconShow(true);
		} else {
			setIconShow(false);
		}
		if (searchStr != '') {
			setSearchKeyword(searchStr);
		} else {
			setSearchKeyword('');
		}
	}

	// logic for search on write
	// useEffect(() => {
	// 	if (searchtimeRef.current !== null) { // IF THERE'S A RUNNING TIMEOUT
	// 		clearTimeout(searchtimeRef.current);         // THEN, CANCEL IT
	// 	}

	// 	searchtimeRef.current = setTimeout(() => { // SET A TIMEOUT
	// 		searchtimeRef.current = null; // RESET REF TO NULL WHEN IT RUNS
	// 		// getSearchListData(searchKeyword, 0, null);
	// 		searchKeyword !== '' ? getSearchListData(searchKeyword, 0, null) : null; // VALIDATE ANY NON-EMPTY VALUE
	// 	}, 500);
	// }, [searchKeyword])

	const clickOnEnter = () => {
		setPageNos(0);
		if (searchKeyword) {
			getSearchListData(searchKeyword, 0, null);
		}
	}

	/**
	 * search cross click
	 */
	const handleCloseClick = () => {
		Keyboard.dismiss()
		setPageNos(0);
		setIconShow(false)
		setSearchKeyword('');
		setSearchData([])
		setTimeout(function () {
			getTredContests();
		}, 1000);
	}

	/**
	 * Filter
	 */
	if (params != null) {
		console.log("vagar kamnu calling => ", JSON.stringify(params))
		setShow(false)
		setCount(0)

		let languageFilter = '';
		let playerTypeFilter = '';
		let categoryIdsFilter = '';
		let gameTypeIdsFilter = '';

		if (params.language) {
			setCount(prevCount => prevCount + 1);
			languageFilter = params.language.join(',')
		}

		if (params.playerType) {
			setCount(prevCount => prevCount + 1);
			playerTypeFilter = params.playerType;
		}

		if (params.categoryIds) {
			setCount(prevCount => prevCount + 1);
			categoryIdsFilter = params.categoryIds.join(',');
		}

		if (params.gameTypeIds) {
			setCount(prevCount => prevCount + 1);
		}

		if (!params.language && !params.playerType && !params.categoryIds && !params.gameTypeIds) {
			getTredContests()
			setShow(false)
		} else {
			getContestForSearch(languageFilter, playerTypeFilter, categoryIdsFilter, '');
		}
		setParams(null)
	}

	const _applyAction = () => {
		// setDialogVisible(false)
		setVisibleError(false),
			errorMsgText ? null : Actions.pop()
	}


	/**
	 * Get Games Data
	*/
	const getSearchListData = async (searchKeywords, pageNo, paramsObj) => {
		try {
			console.log("calling bad search function => ");

			if (paramsObj || searchKeywords.length > 0) {
				// dispatch(LoaderAction(true));
			}
			// console.log("search call => search list data");
			// console.log("search call => paramsobj in search => ", JSON.stringify(paramsObj));
			//console.log("searchKeyword====>", paramsObj)
			// alert('calling now');
			const response = await commonApi.getGamesList(
				paramsObj != null && paramsObj.languageFilter ? paramsObj.languageFilter : '',
				paramsObj != null && paramsObj.playerTypeFilter ? paramsObj.playerTypeFilter : '',
				paramsObj != null && paramsObj.categoryIdsFilter ? paramsObj.categoryIdsFilter : '',
				searchKeywords,
				'',
				pageNo,
				dispatch
			);

			console.log("search call => search list data 1.0 => ", JSON.stringify(response.data));

			if (response['status']) {
				// const arrData = response.data
				console.log('response.data:: new pagination::', response.data);
				console.log('response.data:: page no::', pageNo);
				console.log('response.data:: page no:: searchdata', searchdata);

				// const newData = response.data.map((data) => gamesList.push(data));

				if (searchKeywords.length > 0) {
					if (pageNo === 0) {
						setSearchData(response.data);
					} else {
						setSearchData([...searchdata, ...response.data]);
					}
				} else {
					setGameList([...gamesList, ...response.data]);
				}

				// dispatch(actionType.getGamesDataAction(response.data));
			}
			else {
				setTimeout(() => {
					// setErrorMsgText('No data available')
					// setVisible(true)
					// dispatch(actionType.getGamesDataAction([]))
				}, 1000);
			}
		} catch (error) {
			// alert(error);
		}
	}


	/**
	 * Render Header View
	 */
	const renderHeaderView = () => {
		return (
			<View style={{ flexDirection: 'row', marginBottom: 20 }}>
				<View style={[styles.bottomBorder, { backgroundColor: '#324B55', marginHorizontal: 15, flexDirection: 'row', flex: 1 }]}>
					<Image source={assests.search} resizeMode='contain' style={{ alignSelf: 'center' }} />
					<TextInput
						placeholder={'Keyword of games'}
						placeholderTextColor={'#ADBAC1'}
						style={[styles.textInputSty, {}]}
						value={searchKeyword}
						onChangeText={text => [handleOnSeachKeyword(text), setParams(null)]}
						onSubmitEditing={clickOnEnter}
						returnKeyType={"search"}
					/>
					{
						isIconShow ?
							<TouchableOpacity onPress={() => handleCloseClick()}
								style={{ alignSelf: 'center', }}>
								<Image source={assests.close_pink} resizeMode='contain' style={{ alignSelf: 'center' }} />
							</TouchableOpacity>
							: null
					}
				</View>
				<TouchableOpacity onPress={() => [setFilterModelVisible(true), setSearchData([])]}
					style={{ alignSelf: 'center', marginTop: 10 }}>
					<Image source={assests.filter} resizeMode='contain' style={{ alignSelf: 'center', marginEnd: 20, }} />
					{count == 0 ? null : <Text style={styles.countTxtSty}>{count}</Text>}
				</TouchableOpacity>
			</View>
		)
	}

	return (
		<SafeAreaView style={styles.safeArea}>
			<StatusBar backgroundColor={color.statusBar} barStyle="light-content" />
			{/** Searh Header */}
			<PopUpScreen
				isModalVisible={visible}
				msgText={errorMsgText}
				isError={true}
				onCloseModal={() => setVisible(false)}
				_applyAction={() => _applyAction()}
			/>
			{renderHeaderView()}
			<FilterModel
				isVisible={isFilterModelVisible}
				onClick={handleFilterSelection}
				dynamicCategory={dynamicCategory}
				searchFor={props.searchFor}
			/>
			<View style={{ backgroundColor: '#22343C', flex: 1, paddingBottom: dynamicSize(15) }}>
				{(searchdata.length == 0 && searchKeyword !== '')
					?
					<Text style={styles.noDataFound}>{!loader ? 'No data found' : ''}</Text>
					:
					(show == true)
						?
						<Text style={styles.noDataFound}>{!loader ? 'No data found' : ''}</Text>
						:
						(searchdata.length > 0)
							?
							<>
								{/* <Text>{JSON.stringify(searchdata)}</Text> */}
								<GameList
									data={searchdata}
									search={search}
									retrieveMore={retrieveMoreData}
								/>
							</>
							: gamesList.length > 0
								?
								<>
									{/* <Text>{JSON.stringify(gamesList)}</Text> */}
									<GameList
										data={gamesList}
										search={search}
										retrieveMore={retrieveMoreData}
									/>
								</>
								:
								<Text style={styles.noDataFound}>{!loader ? 'No data found' : ''}</Text>
				}
			</View>
			<Loader isLoading={loader} />
			{/* <PopUpScreen
				isModalVisible={visiblerror}
				msgText={errorMsgText}
				isError={true}
				onCloseModal={() => setVisibleError(false)}
				_applyAction={() => _applyAction()}
			/> */}
		</SafeAreaView >
	)

	function retrieveMoreData() {
		let pageNo = pageNos + 1;

		setPageNos(pageNo);
		if (count === 0) {
			getSearchListData(searchKeyword, pageNo, params);
		} else {
			const { language, playerType, categoryIds, gameTypeIds } = filterObject;

			let languageFilter = '';
			let playerTypeFilter = '';
			let categoryIdsFilter = '';
			let gameTypeIdsFilter = '';

			if (language) {
				languageFilter = language.join(',')
			}

			if (playerType) {
				playerTypeFilter = playerType;
			}

			if (categoryIds) {
				categoryIdsFilter = categoryIds.join(',');
			}

			if (gameTypeIds) {
			}

			const newPageFilterObject = {
				languageFilter,
				playerTypeFilter,
				categoryIdsFilter,
				gameTypeIdsFilter
			};

			// console.log("search call => paramsobj Filter Object", JSON.stringify(filterObject));

			// console.log("search call => paramsobj NEW", JSON.stringify(newPageFilterObject));

			if (languageFilter || playerTypeFilter || categoryIdsFilter || gameTypeIdsFilter) {
				getSearchListData(searchKeyword, pageNo, newPageFilterObject);
			}
		}
	}

	/**
	 * Handle Filter Selection
	 * Type == 1  Close click
	 * Type == 2  Apply Click
	 */
	function handleFilterSelection(type, obj) {
		console.log("obj===123132131", obj)
		if (type == 1) { //Close 

		} else if (type == 2) { //Apply Click
			let paramsObj = {}
			if (obj.selectedLanguage != null && obj.selectedLanguage.length > 0) {
				paramsObj.language = obj.selectedLanguage.map(j => j.title)
			}
			if (obj.selectedPlayer != null) {
				paramsObj.playerType = obj.selectedPlayer.value
			}
			if (obj.selectedCategory != null && obj.selectedCategory.length > 0) {
				paramsObj.categoryIds = obj.selectedCategory.map(j => j.id)
			}
			if (obj.selectedGameType != null && obj.selectedGameType.length > 0) {
				paramsObj.gameTypeIds = obj.selectedGameType.map(j => j.title)
			}
			console.log("paramsObj==", paramsObj)
			setParams(paramsObj)

			// this state for only pagination
			setfilterObject(paramsObj);
			// setTimeout(function () {
			// 	getSearchListData('', 0, paramsObj)
			// }, 200);
		}
		setFilterModelVisible(false)
	}
}

export default Search;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: '#324B55'
	},
	bottomBorder: {
		borderBottomColor: '#ADBAC1',
		borderBottomWidth: 1,
	},
	textInputSty: {
		fontFamily: appConstants.AirbnbCerealAppLight,
		fontSize: 16,
		color: '#ADBAC1',
		paddingVertical: 12,
		flex: 1,
		paddingHorizontal: 10,
	},
	scrollView: {
		backgroundColor: Colors.lighter,
	},
	countTxtSty: {
		backgroundColor: '#FF5485',
		textAlign: 'center',
		fontFamily: appConstants.AirbnbCerealAppLight,
		fontSize: 12,
		color: '#ffffff',
		paddingHorizontal: 6,
		paddingVertical: 1,
		alignSelf: 'center',
		borderRadius: 7,
		marginEnd: 10,
		overflow: 'hidden',
		position: 'absolute',
		bottom: dynamicSize(15.5)
	},
	engine: {
		position: 'absolute',
		right: 0,
	},
	body: {
		backgroundColor: Colors.white,
	},
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
		color: Colors.black,
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
		color: Colors.dark,
	},
	highlight: {
		fontWeight: '700',
	},
	noDataFound: {
		fontSize: 20,
		marginLeft: 13,
		marginTop: dynamicSize(300),
		color: '#ADBAC1',
		justifyContent: 'center',
		alignSelf: 'center',
		fontFamily: appConstants.AirbnbCerealAppLight
	},
	footer: {
		color: Colors.dark,
		fontSize: 55,
		fontWeight: '600',
		padding: 4,
		paddingRight: 12,
		textAlign: 'center',
	},
});

// export default App;
