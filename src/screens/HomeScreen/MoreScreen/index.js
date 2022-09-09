import React, { useEffect, useState, useRef } from 'react';
import {
  View, Text,
  SafeAreaView, Image, TouchableOpacity, FlatList, StyleSheet
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Share from 'react-native-share';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import * as commonApi from './../../../ServiceRequests/serviceAuth';

import { styles } from './styles';
import {
  Button, Loader,
} from '../../../components/customComponent';
import { clearAllData } from '../../../components/helper';
import { Alert } from '../../../common/alertPop'
import assests from '../../../common/assests';
import appConstants from '../../../common/appConstants';
import { dynamicSize, getFontSize } from '../../../utils/responsive'

import color from '../../../utils/color';
import { LoaderAction } from '../../../redux/action';

function ProfileMenu(props) {
  const dispatch = useDispatch();
  const loader = useSelector(state => state.authReducer.loader);

  const profileList = [
    { id: 0, title: 'My Games', image: assests.mygames, },
    { id: 1, title: 'Games History', image: assests.calender },
    { id: 2, title: 'Leaderboard', image: assests.leaderboard },
    { id: 7, title: 'My Groups', image: assests.mygames },
    { id: 3, title: 'Notifications', image: assests.bell },
    { id: 4, title: 'Your Friends', image: assests.user },
    { id: 5, title: 'Invite Friends', image: assests.invitation },
    // { id: 8, title: 'Video Calling', image: assests.user },
    { id: 6, title: 'Logout', image: assests.logout },
  ]
  const [isLogout, setislogout] = useState(false);

  const [prefCategory, setprefCategory] = useState([]);

  const [userProfile, setuserProfile] = useState({});

  useEffect(() => {
    _getProfileData();
  }, []);

  const _getProfileData = async () => {
    try {
      dispatch(LoaderAction(true));

      const userId = await AsyncStorage.getItem('userid');

      const response = await commonApi.getUserProfile(userId, dispatch);

      if (response['status']) {
        const setDataForSelection = response.data.preferredCategory.map(x => ({ _id: x }));
        setprefCategory(setDataForSelection);


        setuserProfile({ ...response.data });
      } else {
        // alert(response.message);
      }
    } catch (error) {
      // alert(error);
    }
  }

  const logout = () => {
    clearAllData()
    Actions.loginscreen()
  }

  /**
   * Render Profile List
   */
  const renderProfileListData = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleRowClick(item.id)}>
        <View style={{ flexDirection: 'row', marginHorizontal: 20, borderBottomWidth: 0.7, borderBottomColor: '#324B55' }}>
          {
            // item.id == 4 ?
            //   <View style={{
            //     width: 12, height: 'auto', aspectRatio: 1 / 1, backgroundColor: '#19FF6D',
            //     borderRadius: 12, alignSelf: 'center', padding: 10, marginEnd: 15
            //   }}></View>
            //   :
            <Image source={item.image} resizeMode={'contain'} style={{ alignSelf: 'center', padding: 10, marginEnd: 15 }} />
          }

          <Text style={[styles.titleSty, { color: item.id == 6 ? '#FF5485' : '#FFFFFF' }]}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const _openShare = async () => {
    try {
      const options = {
        title: "Invite Morabbo",
        message: "Enjoy Murabbo app please install"
      };
      const shareResponse = await Share.open(options);
    } catch (error) {
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1 }}>

        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 30 }}>
          <Image
            source={userProfile.image ? { uri: userProfile.image } : assests.vCallPlaceholder}
            resizeMode={'contain'}
            style={{ width: dynamicSize(50), height: dynamicSize(50), borderRadius: 100, overflow: 'hidden' }}
            defaultSource={assests.vCallPlaceholder}
            onError={e => console.log("new ediors image error => ", e)}
          />
          <View style={{ alignSelf: 'center', marginStart: 15, flex: 1 }}>
            <Text style={[styles.userNameSty]}>{userProfile.name || ''}</Text>
            {/** View Profile */}
            <TouchableOpacity onPress={() => Actions.viewProfile({ prefCategory, userProfile, _getProfileData })}>
              <Text style={[styles.viewProfileBtnSty]}>{'View Profile'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/** Menu List */}
        <View style={{ backgroundColor: '#22343C', flex: 1 }}>
          <FlatList
            data={profileList}
            renderItem={renderProfileListData}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>


        {/* <Button
          title={'Logout'}
          textStyle={{ fontSize: 17, color: '#FFC542', letterSpacing: 3.09 }}
          style={styles['signupButton']}
          onPress={() => setislogout(true)}
        /> */}
      </View>
      <Alert
        // title={'Are you sure!'}
        // icon={assests.logout}
        // buttonTitle={'Logout'}
        heading={'You really want to logout?'}
        isModalVisible={isLogout}
        onCancel={() => setislogout(false)}
        logout={() => logout()}
      />

      <Loader isLoading={loader} />
    </SafeAreaView>
  );

  /**
   * Handle Row Click
   */
  function handleRowClick(selectedIndex) {

    switch (selectedIndex) {
      case 0:
        Actions.mygames()
        break;
      case 1:
        Actions.gameHistory()
        // Actions.gameHistory()
        break;
      case 2:
        Actions.selfLeaderBoard({ userstatus: userProfile.availabilityStatus, profileImage: userProfile?.image });
        break;
      case 3:
        Actions.notifications();
        break;
      case 4:
        Actions.yourFriend();
        break;
      case 5:
        _openShare();
        break;
      case 6:
        setislogout(true)
        break;
      case 7:
        Actions.myGroups();
        break;
      case 8:
        Actions.testVideoCalling();
        break;
      default:
        break;
    }

  }


}

export default ProfileMenu;



