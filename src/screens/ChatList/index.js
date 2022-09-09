import React, { useEffect, useState, useRef } from 'react';
import {
    Image,
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Dimensions,
    StatusBar,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { styles } from './styles';
import appConstants from '../../common/appConstants';
import MaineHeader from '../../common/mainHeader'
import assests from '../../common/assests';
import { Actions } from 'react-native-router-flux'
import { useSelector, useDispatch } from 'react-redux'
import { Rating, AirbnbRating } from 'react-native-ratings';
import * as commonApi from '../../ServiceRequests/servicesCompany'
import { consoleLog, ErrorSnackBar, SuccessSnackBar, ShowToast, ShowErrorToast, } from '../../components/helper';
import { Thumbnail } from 'react-native-thumbnail-video';
import moment from 'moment';
import Video from 'react-native-video';

function ReviewsScreens(props) {
    const dispatch = useDispatch()
    const [reviewData,setReviewData]= useState([])
    useEffect(() => {
    //    debugger
        const fetchUserData = async () => {
            const response = await commonApi.myReview('',dispatch)
            // debugger
            setReviewData(response.data)
            !response['status'] && ShowErrorToast(response['message'])
        }
        fetchUserData()
    }, [])
   
    const renderList = ({ item, index }) => {
        let files = item.files
        let getDateData =moment(item.created_at).calendar(null,{
            sameDay: '[Today] h:mm a',
            nextDay: 'MMMM Do YYYY, h:mm a',
            nextWeek: 'MMMM Do YYYY, h:mm a',
            lastDay: 'MMMM Do YYYY, h:mm a',
            lastWeek: 'MMMM Do YYYY, h:mm a',
            sameElse: 'MMMM Do YYYY, h:mm a'
        });
        return (
            <View style={styles.listView} animation="fadeInLeft" duration={900}>
                <TouchableOpacity
                    onPress={() => Actions.userDetails({ userData: item })}
                    style={[styles.likedlistView]}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={styles.listImg}
                            resizeMode={'cover'}
                            source={assests.dummyProfile} />
                        <View>
                            <Text style={[styles.listText,]}>{item.customer_detail.name}</Text>
                            <Text style={[styles.descriptionText,]}>{getDateData}</Text>
                        </View>
                    </View>
                    <Rating
                        type='star'
                        ratingCount={5}
                        defaultRating={item.star}
                        imageSize={16}
                        readonly={true}
                        onFinishRating={console.log('wer')}
                    />
                </TouchableOpacity>
        <Text style={[styles.descriptionText, { marginVertical: 10 }]}>{item.comment}</Text>
                <View style={{ flexDirection: 'row' }}>
                    {files.map((value,input)=>{
                        if(value.type == 'mp4'){
                        return(
                            <Video style={styles.reviewImg}
                            resizeMode={'cover'}
                            source={{uri:value.source}} />
                        )
                        }
                        else{
                            return(
                                <Image style={styles.reviewImg}
                                resizeMode={'cover'}
                                source={{uri:value.source}} />
                            )   
                        }
                    })}
               
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
        <MaineHeader
            backButton
            style={{ backgroundColor: appConstants.AppTheamColor }}
            textInput={'MY REVIEWS'}
            subHeaderTextS={{ color: '#fff' }}
        />
            <View style={{backgroundColor:'#fff',flex:1,paddingHorizontal:20 }}>
                <FlatList
                    style={{ flex: 1, marginTop: 20 }}
                    data={reviewData}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderList}
                />
            </View>
         

        </SafeAreaView>
    )
}
export default ReviewsScreens;