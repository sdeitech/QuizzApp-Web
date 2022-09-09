/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { useDispatch, useSelector } from 'react-redux';

import * as commonApi from './../../../ServiceRequests/serviceContest';
import assests from '../../../common/assests';
import MaineHeader from '../../../common/headerNext'
import { Button, Input, Loader } from '../../../components/customComponent';
import color from '../../../utils/color';
import * as fontFamily from '../../../utils/fontFamily';
import { dynamicSize } from '../../../utils/responsive';
import appString from '../../../utils/appConstants';
import { validatePassword, isEmpty } from '../../../utils/validation';
import { LoaderAction, setPlayRoundList } from '../../../redux/action';
import { PopUpScreen } from '../../../common/alertPop';

const App: () => React$Node = () => {

  const dispatch = useDispatch()
  const loader = useSelector(state => state.authReducer.loader)

  const [pin, setpin] = useState('');
  const [password, setpassword] = useState('');

  const [pinStatus, setpinStatus] = useState({ status: true, error: '' });
  const [isVaildPin, setIsVaildPin] = useState(false);

  const [passwordStatus, setPasswordStatus] = useState({ status: true, error: '' });
  const [isVaildPass, setIsVaildPass] = useState(false);

  const [errorMsgText, setErrorMsgText] = useState('');
  const [visiblerror, setVisibleError] = useState(false);

  const _onChangeText = (type) => (text) => {
    if (type === 'pin') {
      setpin(text)
      if (isEmpty(text)) {
        setIsVaildPin(false)
        setpinStatus({ status: true, error: 'Please enter Game PIN' })
      }
      else {
        setIsVaildPin(true)
        setpinStatus({ status: true, error: '' })
      }
    } else if (type === 'password') {
      setpassword(text)
      if (isEmpty(text)) {
        setIsVaildPass(false)
        setPasswordStatus({ status: true, error: 'Please enter Game Password' })
      }
      // else if (validatePassword(text).status == false) {
      //   setIsVaildPass(false),
      //     setPasswordStatus({ status: true, error: appString['PASSWORD_VALIDATE'] })
      // }
      else {
        setIsVaildPass(true)
        setPasswordStatus({ status: true, error: '' })
      }
    }
  }

  const _onEnterClick = () => {
    setIsVaildPin(true);
    setpinStatus({ status: true, error: '' });

    if (isEmpty(pin)) {
      setIsVaildPin(true);
      setpinStatus({ status: true, error: '' });

      setIsVaildPin(false)
      setpinStatus({ status: true, error: 'Please enter Game PIN' })
    }
    // else if (isEmpty(password)) {
    //   setIsVaildPass(true)
    //   setPasswordStatus({ status: true, error: '' });

    //   setIsVaildPass(false)
    //   setPasswordStatus({ status: true, error: 'Please enter Game Password' })
    // }
    else {
      const item = { "_id": "6017be34317a620c5ac10d53", "userName": "John doe", "hashtag": [], "gameTypeIds": [], "brandIds": ["600ecc89429f4c7d80c67cc8"], "status": 0, "createdBy": "5ffd4f83b7d70c47ec3620d2", "createdType": "user", "totalQuestions": 3, "isTrending": true, "isActive": true, "isDeleted": false, "title": "abcdefghi", "description": "", "language": "English", "visibility": 2, "playerType": 1, "categoryIds": [{ "categoryId": "600ecbe3429f4c7d80c67cc6", "_id": "6017e651317a620c5ac10dfa", "mainLabelId": "Entertainment" }], "image": "", "createdAt": "2021-02-01T08:39:16.783Z", "updatedAt": "2021-02-02T09:09:15.668Z", "contestId": "CON1612168756DBB", "isPublish": true, "totalRound": 1, "saveToId": "" }
      // Actions.admContestPlay();

      _getContestDetail();
      // Actions.contestInfo({ contestInfo: item });
    }
  }

  const _getContestDetail = async () => {
    try {
      dispatch(LoaderAction(true));
      const response = await commonApi.roomGetFromPinPass(pin, password, dispatch);

      console.log("pin contest details => ", JSON.stringify(response.data.jsonData.data));

      if (response['status']) {

        if (response.data.jsonData.data.length < 1) {
          setTimeout(() => {
            setErrorMsgText("Invalid PIN or Password");
            setVisibleError(true);
          }, 1000);
        } else {
          const mainData = response.data.jsonData.data[0];

          const { gamePin, password, roomId, displayName, gameId, _id } = mainData;
  
          _getRoundList({ contestInfo: { ...mainData.contestDetails, response: { gamePin, password, roomId, displayName, _id } }, gameId });
  
          // console.log("contest info which is sending => ", JSON.stringify({ contestInfo: { ...mainData.contestDetails, response: { gamePin: mainData.gamePin, password: mainData.password, roomId: mainData.roomId, displayName: mainData.displayName } } }));
          // Actions.contestEnter({ contestInfo: { ...mainData.contestDetails, response: { gamePin: mainData.gamePin, password: mainData.password, roomId: mainData.roomId, displayName: mainData.displayName } } });
        }
      } else {
        setErrorMsgText(response.message);
        setVisibleError(true);
      }
    } catch (error) {
      setErrorMsgText(error);
      setVisibleError(true);
    }
  }

  const _getRoundList = async ({ contestInfo, gameId }) => {
    try {
      dispatch(LoaderAction(true));

      console.log("get round list 123 => ", contestInfo, gameId);
      const response = await commonApi.getRoundList(dispatch, 0, contestInfo._id);
      console.log("arrData====", JSON.stringify(response));

      if (response['status']) {
        const properData = response?.data.filter((item) => item.title);

        // dispatch(setCurrentRound(0));
        dispatch(setPlayRoundList(properData));
        // dispatch(LoaderAction(true));

        // const gameData = await _createGame("", contestInfo._id);

        // console.log("game data from join click => ", JSON.stringify(gameData));

        Actions.contestEnter({ contestInfo: { ...contestInfo }, gameData: { _id: gameId } });
        // Actions.admContestPlayNew({ contestInfo: { ...contestInfo }, gameData: { _id: gameId } });
      }
      else {
        setTimeout(() => {
          setErrorMsgText(response.message);
          setVisibleError(true);
        }, 1000);
      }
    } catch (error) {
      console.log("arrData====", error);
      setTimeout(() => {
        setErrorMsgText(error);
        setVisibleError(true);
      }, 1000);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Loader isLoading={loader} />
      <StatusBar backgroundColor={color.statusBar} barStyle="light-content" />
      <MaineHeader
        subHeaderTextS={{ color: '#fff' }}
      />
      <ScrollView style={styles.bottomContainer}>
        <Image
          source={assests.backLogo}
          style={styles.topBackLogo}
        />

        <Text style={styles.title}>
          Enter Contest PIN
        </Text>

        <View style={styles.formContainer}>
          <Input
            onChangeText={_onChangeText('pin')}
            value={pin}
            style={{ width: '100%', }}
            blurOnSubmit={false}
            placeholder={'Game PIN'}
            icon={assests.email}
            isFiledImage
            autoCapitalize={'none'}
            source={isVaildPin ? assests.check : (pinStatus['error'] ? assests.info : '')}
            labelTextStyle={{ fontSize: 14, marginLeft: dynamicSize(5) }}
            errorMessage={pinStatus['error']}
          />

          <Input
            onChangeText={_onChangeText('password')}
            value={password}
            style={{ width: '100%', }}
            blurOnSubmit={false}
            placeholder={'Game Password'}
            icon={assests.lock}
            isFiledImage
            secureTextEntry
            isPassword
            source={isVaildPass ? assests.check : (passwordStatus['error'] ? assests.info : '')}
            textStyle={{ fontSize: 14, letterSpacing: 3.09, marginLeft: 5 }}
            errorMessage={passwordStatus['error']}
          />


          <Button
            title={'Enter'}
            textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.fontBold }}
            style={styles['enterButton']}
            onPress={_onEnterClick}
          />
        </View>

      </ScrollView>


      <PopUpScreen
        isModalVisible={visiblerror}
        msgText={errorMsgText}
        isError={true}
        onCloseModal={() => setVisibleError(false)}
        _applyAction={() => setVisibleError(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#324B55'
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#22343C',

  },
  topBackLogo: {
    right: 0,
    top: -50,
    position: 'absolute',
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 30,
    fontFamily: fontFamily.avenirLight,
    marginTop: 130,
  },
  formContainer: {
    paddingHorizontal: 30,
  },
  enterButton: {
    marginTop: dynamicSize(30),
    marginBottom: dynamicSize(45),
    width: '100%',
    backgroundColor: '#88D8B8',
  },
});

export default App;
