import React, { useState } from 'react';
import {
    SafeAreaView, StatusBar, Text,
    View, TouchableOpacity, Image,
    ImageBackground, FlatList,
} from 'react-native';

import assests from '../../common/assests';
import color from '../../utils/color';
import styles from './styles';
import MaineHeader from '../../common/headerWithText';
import { Button } from '../../components/customComponent';
import { Actions } from 'react-native-router-flux';

const leaderboardData = [
    { "name": "James Pati", "username": "jamesP", "point": "10,586", "isUp": false },
    { "name": "Michel P", "username": "mpan152", "point": "9,568", "isUp": false },
    { "name": "Michel P", "username": "mpanP", "point": "9,558", "isUp": false },
    { "name": "James Rich", "username": "jamesrich", "point": "586", "isUp": true },
];

const LeaderBoard = (props) => {
    const [boardData, setboardData] = useState(leaderboardData);
    const [isClicked, setisClicked] = useState(false);

    const getRenderItemColor = (index) => {
        switch (index) {
            case 0:
                return color.goldenColor;
            case 2:
                return color.bingoColor;
            default:
                return color.hangmanColor;
        }
    }

    const _renderItems = ({ item, index }) => {
        return (
            <View style={[styles.renderItemView, { borderColor: getRenderItemColor(index) }]}>
                <Text style={[styles.leaderBoardNumber, { color: getRenderItemColor(index) }]}>
                    {index + 1}
                </Text>

                <View width={2} />

                <Image
                    style={[styles.upArrowIcon, { tintColor: item.isUp ? undefined : color.arrowColor }]}
                    source={assests.upperArrow}
                />

                <View width={10} />

                <Image
                    style={styles.renderListImage}
                    source={assests.tempProfile}
                />

                <View width={8} />

                <View>
                    <Text style={[styles.renderName, { color: getRenderItemColor(index) }]}>{item.name}</Text>
                    <Text style={[styles.renderUsername, { color: getRenderItemColor(index) }]}>{item.username}</Text>
                    <Text style={[styles.renderPoints, { color: getRenderItemColor(index) }]}>{item.point} pt</Text>
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor={colors.statusBar}
                barStyle="light-content"
            />

            <MaineHeader
                isBack
                subHeaderTextS={{ color: '#fff' }}
                title={'Leaderboard'}
                onBack={() => {
                    if (props.comeFrom === 'game') {
                        Actions.reset('Tabs');
                    } else {
                        Actions.pop();
                    }
                }}
            />

            <View style={styles.topContainer}>

                <View
                    // source={assests.crownBG}
                    style={styles.topBG}
                    resizeMode={"stretch"}
                >
                    {/* <View height={30} /> */}
                    {/* 2nd winner */}
                    <TouchableOpacity style={styles.topperContainer} onPress={() => setisClicked(true)}>
                        <ImageBackground
                            source={assests.tempProfile}
                            style={styles.secImage}
                            imageStyle={styles.secImageStyle}
                            resizeMode={'stretch'}
                        >
                            <View
                                style={styles.secNumContainer}
                            >
                                <Text style={styles.secNumContainerText}>2</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>

                    {/* 1st winner */}
                    <TouchableOpacity style={styles.topperContainer} onPress={() => setisClicked(true)}>
                        <ImageBackground
                            source={assests.tempProfile}
                            style={styles.oneImage}
                            imageStyle={styles.oneImageStyle}
                            resizeMode={'stretch'}
                        >
                            <View
                                style={styles.oneNumContainer}
                            >
                                <Text style={styles.oneNumContainerText}>1</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>

                    {/* 3rd winner */}
                    <TouchableOpacity style={styles.topperContainer} onPress={() => setisClicked(true)}>
                        <ImageBackground
                            source={assests.tempProfile}
                            style={styles.threeImage}
                            imageStyle={styles.threeImageStyle}
                            resizeMode={'stretch'}
                        >
                            <View
                                style={styles.threeNumContainer}
                            >
                                <Text style={styles.threeNumContainerText}>3</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>

                </View>


            </View>

            <View style={styles.listContainer}>

                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={boardData}
                    style={styles.flatlistStyle}
                    renderItem={_renderItems}
                    showsVerticalScrollIndicator={false}
                />

                {
                    isClicked
                        ?
                        <>

                            <Button
                                title={'Start Next Round'}
                                textStyle={styles.gotoBottonText}
                                style={styles['startNextRound']}
                                onPress={() => Actions.contestPlay()}
                            />

                            <Button
                                title={'Back'}
                                textStyle={styles.gotoBottonText}
                                style={styles['joinUs']}
                                onPress={() => setisClicked(false)}
                            />
                        </>
                        :
                        <Button
                            title={'Go to Leader Board'}
                            textStyle={styles.gotoBottonText}
                            style={styles['gotoBotton']}
                            onPress={() => { }}
                        />
                }
            </View>
        </SafeAreaView>
    )
}

export default LeaderBoard;
