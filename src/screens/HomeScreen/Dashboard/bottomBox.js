import React from 'react';
import {
    View, Text, Image,
    TouchableOpacity, StyleSheet
} from 'react-native';
import styles from './styles'
import color from './../../../utils/color';
import assests from '../../../common/assests';
import appConstants from '../../../common/appConstants';
import { dynamicSize, getFontSize } from '../../../utils/responsive';

export const BoxBottomView = (props) => {
    let boxStyle = props.boxStyle;
    let color = props.color;
    let color1 = props.color2;
    let color2 = props.color3;
    let number = props.count1;

    return (
        <View style={[styles.bottomBoxContainer, { marginTop: boxStyle.marginTop }]}>
            {
                // !(props.arrRound.some(e => e.gameType === 'HangMan'))
                // &&
                <View>
                    <TouchableOpacity onPress={() => props.showCount ? props.setShowCount() : console.log('')} style={[styles.bottomBoxInnerView, { backgroundColor: color }]}>
                        <Image style={styles.boxLogo} source={props.icons} />
                        <Text style={styles.bottomBoxText}>HangMan</Text>
                        {props.visibleCount1 ?
                            <View style={styles.checkMark}>
                                <Image source={assests.checkSolid} />
                            </View>
                            : null}
                    </TouchableOpacity>
                    {props.visibleCount1 ?
                        <View style={{ marginTop: 15, flexDirection: 'row' }}>
                            <TouchableOpacity style={bottomStyles.minusButton} onPress={props.setMinCount1}>
                                <Image source={assests.minus} />
                            </TouchableOpacity>
                            <Text style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 20, fontFamily: appConstants.AirbnbCerealAppMedium, letterSpacing: 2.04 }}>{props.count1}</Text>
                            <TouchableOpacity style={bottomStyles.plusButton} onPress={props.setCount1}>
                                <Image source={assests.pluss} />
                            </TouchableOpacity>
                        </View>
                        : null}
                </View>

            }

            {
                // !(props.arrRound.some(e => e.gameType === 'Match It'))
                // &&
                <View style={{ marginHorizontal: 10 }}>
                    <TouchableOpacity onPress={() => props.showCount ? props.setShowCount2() : console.log('')} style={[styles.bottomBoxInnerView, { backgroundColor: color1 }]}>
                        <Image style={styles.boxLogo} source={props.icons1} />
                        <Text style={styles.bottomBoxText}>Match It</Text>
                        {props.visibleCount2 ?
                            <View style={styles.checkMark}>
                                <Image source={assests.checkSolid} />
                            </View>
                            : null}
                    </TouchableOpacity>
                    {props.visibleCount2 ?
                        <View style={{ marginTop: 15, flexDirection: 'row' }}>
                            <TouchableOpacity style={bottomStyles.minusButton} onPress={props.setMinCount2}>
                                <Image source={assests.minus} />
                            </TouchableOpacity>
                            <Text style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 20, fontFamily: appConstants.AirbnbCerealAppMedium, letterSpacing: 2.04 }}>{props.count2}</Text>
                            <TouchableOpacity style={bottomStyles.plusButton} onPress={props.setCount2}>
                                <Image source={assests.pluss} />
                            </TouchableOpacity>
                        </View>
                        : null}
                </View>
            }

            {
                // !(props.arrRound.some(e => e.gameType === 'Unscramble'))
                // &&
                <View>
                    <TouchableOpacity onPress={() => props.showCount ? props.setShowCount3() : console.log('')} style={[styles.bottomBoxInnerView, { backgroundColor: color2 }]}>
                        <Image style={styles.boxLogo} source={props.icons2} />
                        <Text style={styles.bottomBoxText}>Unscramble</Text>
                        {props.visibleCount3 ?
                            <View style={styles.checkMark}>
                                <Image source={assests.checkSolid} />
                            </View>
                            : null}
                    </TouchableOpacity>
                    {props.visibleCount3 ?
                        <View style={{ marginTop: 15, flexDirection: 'row' }}>
                            <TouchableOpacity style={bottomStyles.minusButton} onPress={props.setMinCount3}>
                                <Image source={assests.minus} />
                            </TouchableOpacity>
                            <Text style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 20, fontFamily: appConstants.AirbnbCerealAppMedium, letterSpacing: 2.04 }}>{props.count3}</Text>
                            <TouchableOpacity style={bottomStyles.plusButton} onPress={props.setCount3}>
                                <Image source={assests.pluss} />
                            </TouchableOpacity>
                        </View>
                        : null}
                </View>
            }
        </View>
    )
}


export const BottomBoxView = (props) => {
    let boxStyle = props.boxStyle
    let color = props.color
    let color1 = props.color2
    let color2 = props.color3

    // debugger
    return (
        <View style={[styles.bottomBoxContainer, { marginTop: boxStyle.marginTop, marginBottom: boxStyle.marginBottom }]}>
            {
                // !(props.arrRound.some(e => e.gameType === 'Guess & Go'))
                // &&
                <View>
                    <TouchableOpacity
                        onPress={() => props.showCount ? props.setShowCount4() : console.log('')}
                        style={[
                            styles.bottomBoxInnerView,
                            { backgroundColor: color }
                        ]}
                    >
                        <Image style={styles.boxLogo} source={props.icons} />
                        <Text style={styles.bottomBoxText}>Guess & Go</Text>
                        {props.visibleCount4 ?
                            <View style={styles.checkMark}>
                                <Image source={assests.checkSolid} />
                            </View>
                            : null}
                    </TouchableOpacity>
                    {props.visibleCount4 ?
                        <View style={{ marginTop: 15, flexDirection: 'row' }}>
                            <TouchableOpacity style={bottomStyles.minusButton} onPress={props.setMinCount4}>
                                <Image source={assests.minus} />
                            </TouchableOpacity>
                            <Text style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 20, fontFamily: appConstants.AirbnbCerealAppMedium, letterSpacing: 2.04 }}>{props.count4}</Text>
                            <TouchableOpacity style={bottomStyles.plusButton} onPress={props.setCount4}>
                                <Image source={assests.pluss} />
                            </TouchableOpacity>
                        </View>
                        : null}
                </View>
            }

            { // for quiz
                <View style={{ display: (props.playerType !== 1) ? "none" : undefined }}>
                    <TouchableOpacity onPress={() => props.showCount ? props.setShowCount7() : console.log('')} style={[styles.bottomBoxInnerView, { backgroundColor: colors.quizzColor }]}>
                        <Image style={styles.boxLogo} source={assests.imgBg_quiz} />
                        <Text style={styles.bottomBoxText}>Quiz</Text>
                        {props.visibleCount7 ?
                            <View style={styles.checkMark}>
                                <Image source={assests.checkSolid} />
                            </View>
                            : null}
                    </TouchableOpacity>
                    {props.visibleCount7 ?
                        <View style={{ marginTop: 15, flexDirection: 'row' }}>
                            <TouchableOpacity style={bottomStyles.minusButton} onPress={props.setMinCount7}>
                                <Image source={assests.minus} />
                            </TouchableOpacity>
                            <Text style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 20, fontFamily: appConstants.AirbnbCerealAppMedium, letterSpacing: 2.04 }}>{props.count7}</Text>
                            <TouchableOpacity style={bottomStyles.plusButton} onPress={props.setCount7}>
                                <Image source={assests.pluss} />
                            </TouchableOpacity>
                        </View>
                        : null}
                </View>
            }


            {
                // !(props.arrRound.some(e => e.gameType === 'Gibberish'))
                // &&
                <View style={{ display: (props.playerType === 1) ? "none" : undefined }}>
                    <TouchableOpacity onPress={() => props.showCount ? props.setShowCount5() : console.log('')} style={[styles.bottomBoxInnerView, { backgroundColor: color1 }]}>
                        <Image style={styles.boxLogo} source={props.icons1} />
                        <Text style={styles.bottomBoxText}>Gibberish</Text>
                        {props.visibleCount5 ?
                            <View style={styles.checkMark}>
                                <Image source={assests.checkSolid} />
                            </View>
                            : null}
                    </TouchableOpacity>
                    {props.visibleCount5 ?
                        <View style={{ marginTop: 15, flexDirection: 'row' }}>
                            <TouchableOpacity style={bottomStyles.minusButton} onPress={props.setMinCount5}>
                                <Image source={assests.minus} />
                            </TouchableOpacity>
                            <Text style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 20, fontFamily: appConstants.AirbnbCerealAppMedium, letterSpacing: 2.04 }}>{props.count5}</Text>
                            <TouchableOpacity style={bottomStyles.plusButton} onPress={props.setCount5}>
                                <Image source={assests.pluss} />
                            </TouchableOpacity>
                        </View>
                        : null}
                </View>
            }

            {
                // !(props.arrRound.some(e => e.gameType === 'Bingo'))
                // &&
                <View style={{ opacity: (props.playerType === 1) ? 0 : 1 }}>
                    <TouchableOpacity onPress={() => props.showCount ? props.setShowCount6() : console.log('')}
                        style={[
                            styles.bottomBoxInnerView, {
                                backgroundColor: color2,
                            }]}
                    >
                        <Image style={styles.boxLogo} source={props.icons2} />
                        <Text style={styles.bottomBoxText}>Bingo</Text>
                        {props.visibleCount6 ?
                            <View style={styles.checkMark}>
                                <Image source={assests.checkSolid} />
                            </View>
                            : null}
                    </TouchableOpacity>
                    {props.visibleCount6 ?
                        <View style={{ marginTop: 15, flexDirection: 'row' }}>
                            <TouchableOpacity style={bottomStyles.minusButton} onPress={props.setMinCount6}>
                                <Image source={assests.minus} />
                            </TouchableOpacity>
                            <Text style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 20, fontFamily: appConstants.AirbnbCerealAppMedium, letterSpacing: 2.04 }}>{props.count6}</Text>
                            <TouchableOpacity style={bottomStyles.plusButton} onPress={props.setCount6}>
                                <Image source={assests.pluss} />
                            </TouchableOpacity>
                        </View>
                        : null}
                </View>
            }
        </View>
    )
}


export const BottomBox = (props) => {
    let boxStyle = props.boxStyle
    let color = props.color
    let color1 = props.color2
    let color2 = props.color3

    // debugger

    return (
        <View style={[styles.bottomBoxContainer, { marginTop: boxStyle.marginTop, marginBottom: boxStyle.marginBottom }]}>
            {
                // !(props.arrRound.some(e => e.gameType === 'Quiz'))
                // &&
                <View>
                    <TouchableOpacity onPress={() => props.showCount ? props.setShowCount7() : console.log('')} style={[styles.bottomBoxInnerView, { backgroundColor: color }]}>
                        <Image style={styles.boxLogo} source={props.icons} />
                        <Text style={styles.bottomBoxText}>Quiz</Text>
                        {props.visibleCount7 ?
                            <View style={styles.checkMark}>
                                <Image source={assests.checkSolid} />
                            </View>
                            : null}
                    </TouchableOpacity>
                    {props.visibleCount7 ?
                        <View style={{ marginTop: 15, flexDirection: 'row' }}>
                            <TouchableOpacity style={bottomStyles.minusButton} onPress={props.setMinCount7}>
                                <Image source={assests.minus} />
                            </TouchableOpacity>
                            <Text style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 20, fontFamily: appConstants.AirbnbCerealAppMedium, letterSpacing: 2.04 }}>{props.count7}</Text>
                            <TouchableOpacity style={bottomStyles.plusButton} onPress={props.setCount7}>
                                <Image source={assests.pluss} />
                            </TouchableOpacity>
                        </View>
                        : null}
                </View>
            }

            {
                // !(props.arrRound.some(e => e.gameType === 'Taboo'))
                // &&
                <View>
                    <TouchableOpacity
                        onPress={() => props.showCount ? props.setShowCount8() : console.log('')}
                        style={[styles.bottomBoxInnerView, {
                            backgroundColor: color1,
                            opacity: (props.playerType === 1) ? 0 : 1
                        }]}
                    // disabled={props.playerType === 1}
                    >
                        <Image style={styles.boxLogo} source={props.icons1} />
                        <Text style={styles.bottomBoxText}>Taboo</Text>
                        {props.visibleCount8 ?
                            <View style={styles.checkMark}>
                                <Image source={assests.checkSolid} />
                            </View>
                            : null}
                    </TouchableOpacity>
                    {props.visibleCount8 ?
                        <View style={{ marginTop: 15, flexDirection: 'row' }}>
                            <TouchableOpacity style={bottomStyles.minusButton} onPress={props.setMinCount8}>
                                <Image source={assests.minus} />
                            </TouchableOpacity>
                            <Text style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 20, fontFamily: appConstants.AirbnbCerealAppMedium, letterSpacing: 2.04 }}>{props.count8}</Text>
                            <TouchableOpacity style={bottomStyles.plusButton} onPress={props.setCount8}>
                                <Image source={assests.pluss} />
                            </TouchableOpacity>
                        </View>
                        : null}
                </View>

            }

            {/* <View
                style={[styles.bottomBoxInnerView, {
                    backgroundColor: '#324B55',
                    opacity: (props.playerType === 1) ? 0 : 1
                }]}
            >
                <TouchableOpacity onPress={() => props.showCount ? props.setShowCount9() : console.log('')} style={[{
                    backgroundColor: color2, width: dynamicSize(93),
                    height: dynamicSize(70),
                }]}>

                <Image source={assests.dot_horizontal} style={{ width: 40, height: 12 }} />
                </TouchableOpacity>

            </View> */}

            <View>
                <TouchableOpacity
                    onPress={() => props.showCount ? props.setShowCount9() : console.log('')}
                    style={[styles.bottomBoxInnerView, { backgroundColor: "#324B55" }]}
                >
                    <Image source={assests.dot_horizontal} style={{ width: 40, height: 12 }} />
                    {props.visibleCount9 ?
                        <View style={styles.checkMark}>
                            <Image source={assests.checkSolid} />
                        </View>
                        : null}
                </TouchableOpacity>
                {props.visibleCount9 ?
                    <View style={{ marginTop: 15, flexDirection: 'row' }}>
                        <TouchableOpacity style={bottomStyles.minusButton} onPress={props.setMinCount9}>
                            <Image source={assests.minus} />
                        </TouchableOpacity>
                        <Text
                            style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 20, fontFamily: appConstants.AirbnbCerealAppMedium, letterSpacing: 2.04 }}
                        >
                            {props.count9}
                        </Text>
                        <TouchableOpacity style={bottomStyles.plusButton} onPress={props.setCount9}>
                            <Image source={assests.pluss} />
                        </TouchableOpacity>
                    </View>
                    : null}
            </View>
        </View>
    )
}

const bottomStyles = StyleSheet.create({
    minusButton: {
        marginLeft: 10,
        // backgroundColor: color.statusBar,
    },
    plusButton: {
        marginRight: 10,
        // backgroundColor: color.statusBar,
    }
});
