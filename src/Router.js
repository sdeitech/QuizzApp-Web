import React, { useState, useEffect, Component } from 'react';
import {
	ToastAndroid,
	Image,
	StyleSheet,
	Text,
	ImageBackground,
	Platform,
	Linking,
}
	from 'react-native'
import { Scene, Router, ActionConst, Tabs, Actions } from 'react-native-router-flux';
// import crossroads from 'crossroads';
import NetInfo from "@react-native-community/netinfo";
import { View } from 'react-native-animatable';
// import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

import Splash from './screens/Splashscreen';
import Login from './screens/Loginscreen';
import SignUp from './screens/Signupscreen';
import ResetPassword from './screens/ResetPassword'
import ChangePassword from './screens/ChangePassword'
import OTPScreen from './screens/OtpScreen'
import OTPSucess from './screens/OtpScreen/otpSuccess'
import Dashboard from './screens/HomeScreen/Dashboard'
import SearchScreen from './screens/HomeScreen/Search'
import CreateScreen from './screens/HomeScreen/CreateScreen'
import KeyScreen from './screens/HomeScreen/KeyScreen'
import MoreScreen from './screens/HomeScreen/MoreScreen'
import RoundTryScreen from './screens/RoundTry'
import RoundDetails from './screens/RoundDetails'
import EmptyRoundDetails from './screens/EmptyRoundDetails'
import RoundQuestion from './screens/RoundQuestion'
import CreateQuestion from './screens/CreateQuiz'
import GeneralQuestion from './screens/GeneralQuestion'
import CatergoryList from './screens/CategoryList'
import BrandList from './screens/BrandList'
import MyGames from './screens/MyGames/MyGames';
import GameHistory from './screens/GameHistory';
import ContestInfo from './screens/ContestInfo';
import Notifications from './screens/Notifications';
import ContestEnter from './screens/ContestEnter';
import AddByName from './screens/AddByName';
import ContestPlay from './screens/ContestPlay';
import AdmContestPlay from './screens/AdmContestPlay';
import AdmContestPlayNew from './screens/AdmContestPlayNew';
import LeaderBoard from './screens/LeaderBoard';
import SelfLeaderBoard from './screens/SelfLeaderBoard';
import ViewProfile from './screens/ViewProfile';
import GiveScore from './screens/GiveScore';
import HUGiScreen from './screens/HUGiScreen';
import MyGroups from './screens/MyGroups';
import Membership from './screens/Membership';
import PrivacyPolicy from './screens/PrivacyPolicy';
import EditProfile from 'Scene./screens/EditProfile';
import WordsListing from './screens/WordsListing';
import MatchIt from './screens/MatchItScreen';
import RoomListing from './screens/RoomListing';
import RoundLists from './screens/RoundLists';
import MembersList from './screens/MembersList';
import PhotoLibrary from './screens/PhotoLibrary';
import TestVideoCalling from './screens/TestVideoCalling';
import Walkthrough from './screens/Walkthrough';
import AddByContact from './screens/AddByContact';
import MB_ImageList from './screens/MB_ImageList';
import YoutubeLibrary from './screens/YoutubeLibrary';
import RoundsSearch from './screens/RoundsSearch';
import AddByFacebookFriend from './screens/AddByFacebookFriend';
import YourFriend from './screens/yourFriendlist';

import appConstants from './common/appConstants';
import assests from './common/assests';
import { getFontSize, dynamicSize } from './utils/responsive'
// import LinkedRouter from './LinkedRouter';


// Mapping incoming URLs to scenes
// crossroads.addRoute('greetings/{name}', name => Actions.greeting({ name }));

class RouterComponent extends Component {
	constructor() {
		super();
		this.state = {
			isTimerRunning: false,
			isloged: false,
			activeProfile: true,
			isConnected: false
		};
		this.onBackPress = this.onBackPress.bind(this);
		this.handleOpenURL = this.handleOpenURL.bind(this);
	}

	componentDidMount() {
		// Linking
		// 	.getInitialURL()
		// 	.then(url => this.handleOpenURL({ url }))
		// 	.catch(console.error);

		// Linking.addEventListener('url', this.handleOpenURL);
	}

	componentWillUnmount() {
		// Linking.removeEventListener('url', this.handleOpenURL);
	}

	handleOpenURL(event) {
		// if (event.url && event.url.indexOf(this.props.scheme + '://') === 0) {
		// 	crossroads.parse(event.url.slice(this.props.scheme.length + 3));
		// }
	}

	onBackPress() {
		if (Actions.currentScene == "_Home") {
			if (!this.state.isTimerRunning) {
				this.state.isTimerRunning = true;
				setTimeout(() => {
					this.state.isTimerRunning = false;
				}, 3000);

				ToastAndroid.show("Click back again to exit!", ToastAndroid.LONG);
				return true; // Return true to stay
			} else {
				return false; // Return false to exit the app.
			}
		} else {
			Actions.pop();
			return true;
		}
	}

	render() {
		return (
			<Router
				sceneStyle={{ backgroundColor: appConstants.appBackgroundBackground }}
				backAndroidHandler={this.onBackPress}
				uriPrefix={"murabbo.com://"}
			>
				<Scene key="root">
					<Scene key='splash' hideNavBar component={Splash} initial type={ActionConst.RESET} />
					<Scene key='loginscreen' hideNavBar component={Login} type={ActionConst.RESET} />
					<Scene key='signup' hideNavBar component={SignUp} />
					<Scene key='resetPassword' hideNavBar component={ResetPassword} />
					<Scene key='otpScreen' hideNavBar component={OTPScreen} />
					<Scene key='otpSucess' hideNavBar component={OTPSucess} />
					<Scene
						key='roundTryScreen'
						hideNavBar
						component={RoundTryScreen}
						// onEnter={() => Actions.refresh({ key: Math.random() })}
					/>
					<Scene key='roundDetails' hideNavBar component={RoundDetails} />
					<Scene key='emptyRoundDetails' hideNavBar component={EmptyRoundDetails} />
					<Scene key='roundQuestion' hideNavBar component={RoundQuestion} />
					<Scene key='createQuestion' hideNavBar component={CreateQuestion} />
					<Scene key='generalQuestion' hideNavBar component={GeneralQuestion} />
					<Scene key='catergoryList' hideNavBar component={CatergoryList} />
					<Scene key='yourFriend' hideNavBar component={YourFriend} />
					<Scene key='brandList' hideNavBar component={BrandList} />
					<Scene key='notifications' hideNavBar component={Notifications} />
					<Scene key='contestEnter' hideNavBar component={ContestEnter} />
					<Scene key='addByName' hideNavBar component={AddByName} />
					<Scene key='contestPlay' hideNavBar component={ContestPlay} />
					<Scene key='leaderBoard' hideNavBar component={LeaderBoard} />
					<Scene key='selfLeaderBoard' hideNavBar component={SelfLeaderBoard} />
					<Scene key='viewProfile' hideNavBar component={ViewProfile} />
					<Scene key='giveScore' hideNavBar component={GiveScore} />
					<Scene key='changePassword' hideNavBar component={ChangePassword} />
					<Scene key='hugiScreen' hideNavBar component={HUGiScreen} />
					<Scene key='mb_ImageList' hideNavBar component={MB_ImageList} />
					<Scene key='myGroups' hideNavBar component={MyGroups} />
					<Scene key='membership' hideNavBar component={Membership} />
					<Scene key='privacyPolicy' hideNavBar component={PrivacyPolicy} />
					<Scene key='editProfile' hideNavBar component={EditProfile} />
					<Scene key='wordsListing' hideNavBar component={WordsListing} />
					<Scene key='matchIt' hideNavBar component={MatchIt} />
					<Scene key='roomListing' hideNavBar component={RoomListing} />
					<Scene key='membersList' hideNavBar component={MembersList} />
					<Scene key='photoLibrary' hideNavBar component={PhotoLibrary} />
					<Scene key='testVideoCalling' hideNavBar component={TestVideoCalling} />
					<Scene key='addByContact' hideNavBar component={AddByContact} />
					<Scene key='youtubeLibrary' hideNavBar component={YoutubeLibrary} />
					<Scene key='roundsSearch' hideNavBar component={RoundsSearch} />
					<Scene key='addByFacebook' hideNavBar component={AddByFacebookFriend} />

					<Scene
						key='roundListing'
						hideNavBar
						component={RoundLists}
					// gesturesEnabled={false}
					/>

					<Scene
						key='admContestPlay'
						hideNavBar
						component={AdmContestPlay}
					// gesturesEnabled={false}
					/>

					<Scene
						key='admContestPlayNew'
						hideNavBar
						component={AdmContestPlayNew}
					// gesturesEnabled={false}
					/>

					<Scene
						key='mygames'
						hideNavBar
						component={MyGames}
					// onEnter={() => Actions.refresh({ key: Math.random() })}
					/>
					<Scene
						key='contestInfo'
						hideNavBar
						component={ContestInfo}
					/>
					<Scene key='gameHistory' hideNavBar component={GameHistory} />

					{/* for edit game its repeat here instead of tabs */}
					<Scene

						key='createScreen'
						hideNavBar
						component={CreateScreen}
						path={"creates/:name/"}
					/>

					<Scene
						key='walkthrough'
						hideNavBar
						component={Walkthrough}
						type={ActionConst.RESET}
					/>

					<Scene
						key='firstCategoryList'
						hideNavBar
						component={CatergoryList}
						type={ActionConst.RESET}
					/>

					<Tabs key='Tabs'
						type={ActionConst.RESET}
						hideNavBar tabs showLabel={false}
						style={{ borderColor: '#324B55' }}
						tabBarStyle={styles.tabBar}
						hide
					// wrap={false}
					>
						<Scene
							initial
							key="home"
							icon={({ focused }) => (<HomeTabIcon active={focused} />)}
							component={Dashboard}
							hideNavBar
							panHandlers={null}
						/>
						<Scene
							key="searchScreen"
							icon={({ focused }) => (<SearchIcon active={focused} />)}
							hideNavBar
							component={SearchScreen}
							panHandlers={null}
						// onEnter={() => Actions.refresh({ key: Math.random() })}
						/>
						<Scene key="key"
							icon={({ focused }) => (
								<KeyIcon active={focused} />
							)}
							component={KeyScreen}
							hideNavBar
							panHandlers={null} />
						<Scene key="createScreen"
							icon={({ focused }) => (<CreateIcon
								active={focused} />)}
							component={CreateScreen}
							hideNavBar
							hideTabBar
							panHandlers={null} />
						<Scene key="more"
							icon={({ focused }) => (<MoreIcon
								active={focused} />)}
							component={MoreScreen}
							hideNavBar
							panHandlers={null} />
					</Tabs>
				</Scene>
			</Router>

		);
	}
}
class HomeTabIcon extends Component {
	render() {
		return (
			<View style={[styles.iconView, { marginTop: Platform.OS === 'ios' ? dynamicSize(12) : dynamicSize(14) }]}>
				<Image source={this.props.active ? assests.dashboard : assests.dashboar} style={styles.iconImageStyle} />
				<Text style={[styles.textInputS, { color: this.props.active ? '#68C1D2' : '#fff', }]}>Dashboard</Text>

			</View>
		);
	}
}
class SearchIcon extends Component {
	render() {
		return (
			<View style={[styles.iconView, { marginTop: Platform.OS === 'ios' ? dynamicSize(12) : dynamicSize(14) }]}>
				<Image source={this.props.active ? assests.search_selected : assests.search} style={styles.iconImageStyle} />
				<Text style={[styles.textInputS, { color: this.props.active ? '#68C1D2' : '#fff', }]}>Search</Text>

			</View>
		);
	}

}
class CreateIcon extends Component {
	render() {
		return (
			<View style={[styles.iconView, { marginTop: Platform.OS === 'ios' ? dynamicSize(12) : dynamicSize(14) }]}>
				<Image source={this.props.active ? assests.creaate : assests.create} style={styles.iconImageStyle} />
				<Text style={[styles.textInputS, { color: this.props.active ? '#68C1D2' : '#fff', }]}>Create</Text>

			</View>
		);
	}
}
class KeyIcon extends Component {
	render() {
		if (this.props.active) {
			return (
				<View
					style={[
						styles.iconView, {
							width: "80%",
							backgroundColor: '#274552',
							// overflow: 'hidden',
							marginTop: Platform.OS === 'ios' ? dynamicSize(12) : dynamicSize(14),
							// paddingVertical: Platform.OS === 'ios' ? dynamicSize(40) : null,
							// flex: 1,
						}
					]}>
					<Image source={assests.key} style={styles.iconImageStyle} />
					<Text style={[styles.textInputS, { color: this.props.active ? '#FCD274' : '#FCD274' }]}>Enter pin</Text>
				</View>
			)
		}
		else {
			return (
				<View
					style={[
						styles.iconView, {
							marginTop: Platform.OS === 'ios' ? dynamicSize(12) : dynamicSize(14),
						}
					]}>
					<Image source={assests.key} style={styles.iconImageStyle} />
					<Text style={[styles.textInputS, { color: this.props.active ? '#FCD274' : '#FCD274', }]}>Enter pin</Text>
				</View>
			);
		}
	}
}
class MoreIcon extends Component {
	render() {
		return (
			<View style={[styles.iconView, { marginTop: Platform.OS === 'ios' ? dynamicSize(12) : dynamicSize(14) }]}>
				<Image source={this.props.active ? assests.more : assests.menu} style={styles.iconImageStyle} />
				<Text style={[styles.textInputS, { color: this.props.active ? '#68C1D2' : '#fff', }]}>More</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	iconSize: {
		width: dynamicSize(18),
		height: dynamicSize(18)
	},
	iconView: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		// backgroundColor: 'blue',
		paddingHorizontal: dynamicSize(7),
		// paddingBottom: 1,
		// margintop: 10,
		paddingTop: 6,
		borderRadius: dynamicSize(11),
		marginTop: Platform.OS === 'ios' ? dynamicSize(10) : dynamicSize(10),
		//marginBottom: dynamicSize(3)
		//backgroundColor: 'gray'
	},
	iconImageStyle: {
		height: 18,
		width: 18,
		resizeMode: 'stretch',
	},
	iconViewSelected: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		paddingHorizontal: dynamicSize(7),
		paddingBottom: 1,
		borderRadius: dynamicSize(11),
		//      marginTop: dynamicSize(2),
		//  marginBottom: dynamicSize(2)
		//backgroundColor: 'gray'
	},
	iconText: {
		color: '#fff',
		fontSize: getFontSize(10),
		fontFamily: appConstants.fontReqular
	},
	tabBar: {
		backgroundColor: '#324B55',
		height: Platform.OS === 'ios' ? dynamicSize(76) : dynamicSize(70),
		paddingTop: Platform.OS === 'ios' ? -20 : undefined,
		borderTopLeftRadius: dynamicSize(26),
		borderTopRightRadius: dynamicSize(26),
		borderTopWidth: 0,
		alignItems: 'center',
		justifyContent: 'center',
		//	borderRadius: dynamicSize(10),
		width: '100%',
		shadowColor: '#0000006B',
		elevation: 1,
		borderColor: '#324B55',
		borderWidth: dynamicSize(10),
		shadowOffset: {
			width: dynamicSize(-14),
			height: dynamicSize(-14)
		},
		shadowRadius: dynamicSize(10),
		shadowOpacity: 1.0,
		// backgroundColor:''

	},
	textInputS: {
		fontSize: getFontSize(9),
		marginTop: dynamicSize(5),
		fontFamily: appConstants.AirbnbCerealAppLight
	}
})

// export default <LinkedRouter scenes={RouterComponent} scheme="murabbo" />;

export default RouterComponent;
