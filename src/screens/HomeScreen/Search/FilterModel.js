import AsyncStorage from '@react-native-community/async-storage';
import React, { useState, useEffect } from 'react';
import {
    View, Text, SafeAreaView, Image, TextInput, Keyboard,
    StyleSheet, TouchableOpacity, FlatList, Modal, SafeAreaViewBase
} from 'react-native';
// import Modal from "react-native-modal";
import appConstants from '../../../common/appConstants';
import assests from '../../../common/assests';


export default function FilterModel(props) {

    const [filterCategoryList, setfilterCategoryList] = useState([
        { title: 'Language', isSelected: true, selectedCount: 0 },
        // { title: 'Game Type', isSelected: false, selectedCount: 0 },
        { title: 'Player Type', isSelected: false, selectedCount: 0 },
        { title: 'Category', isSelected: false, selectedCount: 0 },
        // { title: 'Trending', isSelected: false, selectedCount: 0 },
        // { title: 'Game Type', isSelected: false, selectedCount: 0 },
    ]);

    const [languageList, setlanguageList] = useState([
        { title: 'English', isSelected: false },
        { title: 'Hindi', isSelected: false },
        { title: 'Gujarati', isSelected: false },
        { title: 'Marathi', isSelected: false },
        { title: 'Tamil', isSelected: false },
        { title: 'Punjabi', isSelected: false },
        { title: 'Spanish', isSelected: false },
        { title: 'Bhojpuri', isSelected: false },
        { title: 'Telugu', isSelected: false },
        { title: 'Other', isSelected: false },
    ])

    // const [categoryList, setcategoryList] = useState([
    //     { title: 'General', isSelected: false },
    //     { title: 'Entertainment', isSelected: false },
    //     { title: 'Business', isSelected: false },
    //     { title: 'Sports', isSelected: false },
    //     { title: 'Art& Design', isSelected: false },
    //     { title: 'Latest in Murabbo', isSelected: false },
    //     { title: 'Food', isSelected: false },
    //     { title: 'History', isSelected: false },
    //     { title: 'International', isSelected: false },
    //     { title: 'Nature & Life', isSelected: false },
    //     { title: 'Kids', isSelected: false },
    //     { title: 'Fitness', isSelected: false },
    //     { title: 'Religion', isSelected: false },
    //     { title: 'Technology', isSelected: false },
    //     { title: 'Cars', isSelected: false },
    //     { title: 'Travel & Leisure', isSelected: false },
    //     { title: 'Education', isSelected: false },

    // ])

    const [categoryList, setcategoryList] = useState([]);

    const [gameTypeList, setgameTypeList] = useState([
        { title: 'HangMan', isSelected: false },
        { title: 'Match It', isSelected: false },
        { title: 'Unscramble', isSelected: false },
        { title: 'Guess & Go', isSelected: false },
        { title: 'Gibberish', isSelected: false },
        { title: 'Bingo', isSelected: false },
        { title: 'Quiz', isSelected: false },
        { title: 'Taboo', isSelected: false },

    ])

    const [playerTypeList, setplayerTypeList] = useState([
        { title: 'Single Player', value: 1, isSelected: false },
        { title: 'Multi Player', value: 2, isSelected: false },
    ])

    const [selectedMainCategory, setselectedMainCategory] = useState(0)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [isIconShow, setIconShow] = useState(false)

    const [languageFilter, setLanguageFilter] = useState(languageList)
    const [playerFilter, setPlayerFilter] = useState(playerTypeList)
    const [categoryFilter, setCategoryFilter] = useState(categoryList)
    const [gameTypeFilter, setgameTypeFilter] = useState(gameTypeList)

    const [selectedLanguage, setSelectedLanguage] = useState([])
    const [selectedPlayer, setSelectedPlayer] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState([])
    const [selectedGameType, setselectedGameType] = useState([])

    console.log("selectedCategory => ", selectedCategory);

    const [lan, setLan] = useState([])
    const [cat, setCat] = useState([])
    const [type, setType] = useState([])
    const [gameType, setgameType] = useState([])

    const [searchFor, setsearchFor] = useState('');

    // const [showlng, setShowLan] = useState(false)

    useEffect(() => {
        // if( selectedLanguage.length == 0){
        // let updatedList = filterCategoryList.map(item => {
        //     if (item.title == 'Language' ) {
        //         return { ...item, selectedCount: 0 }; //gets everything that was already in item, and updates "done"
        //     }
        //     return item; // else return unmodified item 
        // });
        // // setShowLan(false)
        // setfilterCategoryList(updatedList)
        // console.log('------------', filterCategoryList)}
    }, [filterCategoryList, languageList, selectedLanguage])

    // update category list after get data from API

    useEffect(() => {
        setcategoryList(props.dynamicCategory);
    }, [props.dynamicCategory])

    useEffect(() => {
        getSearchFor();
    }, []);

    const getSearchFor = async () => {
        const searchingFor = await AsyncStorage.getItem('searchFor');
        setsearchFor(searchingFor);
        await AsyncStorage.removeItem('searchFor');
    }

    /**
    * Search Keyword
    */
    const handleOnSeachKeyword = (searchStr) => {
        if (searchStr.length > 0) {
            setIconShow(true)
        } else {
            setIconShow(false)
        }
        setSearchKeyword(searchStr)
        console.log("selectedMainCategory==", selectedMainCategory)
        if (selectedMainCategory == 0) {
            let langArray = searchFilter(languageList, searchStr)
            setLan(langArray)
        } else if (selectedMainCategory == 1) {
            let playerTypeArray = searchFilter(playerTypeList, searchStr)
            setType(playerTypeArray)
        } else if (selectedMainCategory == 2) {
            let catArray = searchFilter(categoryList, searchStr)
            setCat(catArray)
        } else if (selectedMainCategory == 3) {
            let gameTypeArray = searchFilter(gameTypeList, searchStr)
            setgameType(gameTypeArray);
            // setLanguageFilter(langArray)
        }
    }

    const searchFilter = (array, searchStr) => {
        let filterArray = []
        array.filter(function (el) {
            if ((el.title).toLowerCase().includes(searchStr.toLowerCase())) {
                filterArray.push(el)
            }
        });
        console.log('---------', filterArray);
        return filterArray
    }
    /**
    * Clear All function
    */
    const handleClearAll = () => {
        let updatedList = languageList.map(map => {
            if (map.isSelected == true) {
                return { ...map, isSelected: false };
            }
            return map;
        });

        let updatedCatList = categoryList.map(map => {
            if (map.isSelected == true) {
                return { ...map, isSelected: false };
            }
            return map;
        });

        let updatedGametypeList = gameTypeList.map(map => {
            if (map.isSelected == true) {
                return { ...map, isSelected: false };
            }
            return map;
        });

        let updatedFlatList = filterCategoryList.map(map => {
            if (map.selectedCount != 0) {
                return { ...map, selectedCount: 0 };
            }
            return map;
        });
        setfilterCategoryList(updatedFlatList)

        setlanguageList(updatedList)
        setcategoryList(updatedCatList)
        setgameTypeList(updatedGametypeList)

        setSelectedLanguage([])
        setSelectedPlayer({})
        setSelectedCategory([])
        setselectedGameType([])

        setCat([])
        setLan([])
        setType([])
        setgameType([])
    }

    /**
   * search cross click
   */
    const handleCloseClick = () => {
        Keyboard.dismiss()
        setIconShow(false)
        setSearchKeyword('')
        if (selectedMainCategory == 0) {
            setLan([])
            setLanguageFilter(languageList)
        } else if (selectedMainCategory == 1) {
            setType([])
            setPlayerFilter(playerTypeList)
        } else if (selectedMainCategory == 2) {
            setCat([])
            setCategoryFilter(categoryList)
        } else if (selectedMainCategory == 3) {

        }
    }

    /**
     * Button Click
     * Type == 1 Close 
     * Type == 2 Apply
     */
    const handleButtonClick = (clickType) => {
        console.log("clickType===>", clickType)

        if (clickType == 2) {
            var obj = {
                selectedLanguage: selectedLanguage,
                selectedPlayer: selectedPlayer,
                selectedCategory: selectedCategory,
                selectedGameType: selectedGameType
            };
            props.onClick(clickType, obj)
        } else {
            props.onClick(clickType, null)
        }
    }

    /**
     * Render Category List
     */
    const selecteCategory = (item, index) => {
        if (selectedCategory.length == 0) {
            selectedCategory.push(item)
            let updatedList = filterCategoryList.map(item => {
                if (item.title == 'Category') {
                    return { ...item, selectedCount: selectedCategory.length };
                }
                return item;
            });
            setfilterCategoryList(updatedList)
        } else if (selectedCategory.length > 0) {
            selectedCategory.some(e => e.title === item.title) ? selectedCategory.splice(selectedCategory.findIndex(obj => obj.title === item.title), 1) : selectedCategory.push(item)
            let updatedList = filterCategoryList.map(item => {
                if (item.title == 'Category') {
                    if (item.title == 'Category' && selectedCategory.length == 0) {
                        return { ...item, selectedCount: 0 }
                    } else {
                        return { ...item, selectedCount: selectedCategory.length }
                    }
                }
                return item;
            });
            setfilterCategoryList(updatedList)
        }

        let updatedList = categoryList.map(map => {
            if (map.title == item.title) {
                if (map.isSelected == false) {
                    return { ...map, isSelected: true };
                }
                else {
                    return { ...map, isSelected: false };
                }
            }
            return map;
        });

        let updatedList1 = categoryList.map(map => {
            if (map.title == item.title) {
                if (map.isSelected == false) {
                    return { ...map, isSelected: true };
                }
                else {
                    return { ...map, isSelected: false };
                }
            }
            return map;
        });

        console.log("my new map => 0 => ", updatedList);
        console.log("my new map => 1 => ", updatedList1);

        setCat(updatedList1)

        setcategoryList(updatedList)
        // setSelectedCategory(item)
    }

    const renderCategoryRow = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => selecteCategory(item, index)}>
                <Image source={item.isSelected == true ? assests.checkMarkSelected : assests.checkMarkUnSelected} resizeMode='contain'
                    style={{ alignSelf: 'center', padding: 10, marginHorizontal: 10 }}
                />
                <Text style={[styles.languageTxtSty, { color: item.isSelected == true ? '#FCD274' : '#78868B' }]}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    /***
     * Render Game Type List 
     */

    const selecteGameType = (item, index) => {
        if (selectedGameType.length == 0) {
            selectedGameType.push(item)
            let updatedList = filterCategoryList.map(item => {
                if (item.title == 'Game Type') {
                    return { ...item, selectedCount: selectedGameType.length };
                }
                return item;
            });
            setfilterCategoryList(updatedList)
        } else if (selectedGameType.length > 0) {
            selectedGameType.some(e => e.title === item.title) ? selectedGameType.splice(selectedGameType.findIndex(obj => obj.title === item.title), 1) : selectedGameType.push(item)
            let updatedList = filterCategoryList.map(item => {
                if (item.title == 'Game Type') {
                    if (item.title == 'Game Type' && selectedGameType.length == 0) {
                        return { ...item, selectedCount: 0 }
                    } else {
                        return { ...item, selectedCount: selectedGameType.length }
                    }
                }
                return item;
            });
            setfilterCategoryList(updatedList)
        }

        let updatedList = gameTypeList.map(map => {
            if (map.title == item.title) {
                if (map.isSelected == false) {
                    return { ...map, isSelected: true };
                }
                else {
                    return { ...map, isSelected: false };
                }
            }
            return map;
        });

        let updatedList1 = gameTypeList.map(map => {
            if (map.title == item.title) {
                if (map.isSelected == false) {
                    return { ...map, isSelected: true };
                }
                else {
                    return { ...map, isSelected: false };
                }
            }
            return map;
        });

        setgameType(updatedList1)

        setgameTypeList(updatedList)
        // setSelectedCategory(item)
    }

    const renderGameTypeRow = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => selecteGameType(item, index)}>
                <Image source={item.isSelected == true ? assests.checkMarkSelected : assests.checkMarkUnSelected} resizeMode='contain'
                    style={{ alignSelf: 'center', padding: 10, marginHorizontal: 10 }}
                />
                <Text style={[styles.languageTxtSty, { color: item.isSelected == true ? '#FCD274' : '#78868B' }]}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    /**
     * Render Language List
     */
    const selectePlayerType = (item, index) => {
        let updatedList = filterCategoryList.map(item => {
            if (item.title == 'Player Type') {
                return { ...item, selectedCount: 1 };
            }
            return item;
        });
        setfilterCategoryList(updatedList)
        setSelectedPlayer(item)
    }

    const renderplayerTypeRow = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => selectePlayerType(item, index)}>
                <Image source={selectedPlayer != null && selectedPlayer.value == (item.value).toString() ? assests.checkMarkSelected : assests.checkMarkUnSelected} resizeMode='contain'
                    style={{ alignSelf: 'center', padding: 10, marginHorizontal: 10 }}
                />
                <Text style={[styles.languageTxtSty, { color: selectedPlayer != null && selectedPlayer.value == (item.value).toString() ? '#FCD274' : '#78868B' }]}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    /**
     * Render Language List
     */
    const selecteLanguage = (item, index) => {
        if (selectedLanguage.length == 0) {
            selectedLanguage.push(item)
            let updatedList = filterCategoryList.map(item => {
                if (item.title == 'Language') {
                    return { ...item, selectedCount: selectedLanguage.length };
                }
                return item;
            });
            setfilterCategoryList(updatedList)
        } else if (selectedLanguage.length > 0) {
            selectedLanguage.some(e => e.title === item.title) ? selectedLanguage.splice(selectedLanguage.findIndex(obj => obj.title === item.title), 1) : selectedLanguage.push(item)
            let updatedList = filterCategoryList.map(item => {
                if (item.title == 'Language') {
                    if (item.title == 'Language' && selectedLanguage.length == 0) {
                        return { ...item, selectedCount: 0 }
                    } else {
                        return { ...item, selectedCount: selectedLanguage.length }
                    }
                }
                return item;
            });
            setfilterCategoryList(updatedList)
        }

        let updatedList = languageList.map(map => {
            if (map.title == item.title) {
                if (map.isSelected == false) {
                    return { ...map, isSelected: true };
                }
                else {
                    return { ...map, isSelected: false };
                }
            }
            return map;
        });

        let updatedList1 = lan.map(map => {
            if (map.title == item.title) {
                if (map.isSelected == false) {
                    return { ...map, isSelected: true };
                }
                else {
                    return { ...map, isSelected: false };
                }
            }
            return map;
        });

        setLan(updatedList1)

        setlanguageList(updatedList)
        // setSelectedLanguage(item)
    }

    const renderLanguageRow = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => selecteLanguage(item, index)}>
                <Image source={item.isSelected == true ? assests.checkMarkSelected : assests.checkMarkUnSelected} resizeMode='contain'
                    style={{ alignSelf: 'center', padding: 10, marginHorizontal: 10 }}
                />
                <Text style={[styles.languageTxtSty, { color: item.isSelected == true ? '#FCD274' : '#78868B' }]}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    /**
     * Render Main Category
     */
    const renderMainCategory = ({ item, index }) => {
        if (props.searchFor === "contest" && item.title === "Game Type") return;
        return (
            <TouchableOpacity onPress={() => handleMainCategoryClick(index)}>
                <View style={{ backgroundColor: selectedMainCategory == index ? '#22343C' : '#324B55', flexDirection: 'row' }}>
                    <Text style={styles.categoryTxtSty}>{item.title}</Text>
                    {/* <Text style={styles.categoryTxtSty}>{item.title}</Text> */}
                    {
                        item.selectedCount > 0 ?
                            <Text style={styles.countTxtSty}>{item.selectedCount}</Text> : null
                    }
                </View>
            </TouchableOpacity>
        )
    }


    return (
        <Modal
            animationType="Slide" //Slide,fade,none Type 
            visible={props.isVisible}
            transparent={true}
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.topViewContainer}>
                    <Text style={{ color: '#ffffff', fontFamily: appConstants.AirbnbCerealAppBook, fontSize: 22, flex: 1 }}>
                        {'Filters'}</Text>
                    <TouchableOpacity onPress={() => handleClearAll()}><Text style={{ color: '#FF5485', fontFamily: appConstants.AirbnbCerealAppBook, fontSize: 16, alignSelf: 'center' }}>
                        {'Clear All'}</Text></TouchableOpacity>
                    {/* <Text>{JSON.stringify(categoryList)}</Text> */}
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    {/** Left Table */}
                    <View style={{ width: '40%', backgroundColor: '#324B55', }}>
                        <FlatList
                            data={filterCategoryList}
                            renderItem={renderMainCategory}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    {/** Right Table */}
                    <View style={{ width: '60%', backgroundColor: '#22343C', }}>

                        {
                            selectedMainCategory == 0 ?
                                <View style={{ flex: 1 }}>
                                    {/** Search */}
                                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#DFDFDF' }}>
                                        <Image source={assests.search} resizeMode='contain' style={{ alignSelf: 'center', marginStart: 8 }} />
                                        <TextInput
                                            placeholder={'Search'}
                                            placeholderTextColor={'#ADBAC1'}
                                            style={[styles.textInputSty, {}]}
                                            defaultValue={searchKeyword}
                                            onChangeText={text => handleOnSeachKeyword(text)}
                                        />
                                        {
                                            isIconShow ?
                                                <TouchableOpacity
                                                    onPress={() => handleCloseClick()}
                                                    style={{ alignSelf: 'center', marginEnd: 10 }}
                                                >
                                                    <Image source={assests.close_pink} resizeMode='contain' style={{ alignSelf: 'center' }} />
                                                </TouchableOpacity>
                                                : null
                                        }
                                    </View>
                                    <View style={{ marginTop: 10, flex: 1 }}>
                                        {lan.length == 0 && searchKeyword != '' ? null :
                                            lan.length == 0 && searchKeyword == '' ?
                                                <FlatList
                                                    data={languageList}
                                                    renderItem={renderLanguageRow}
                                                    keyExtractor={(item, index) => index.toString()}
                                                /> :
                                                <FlatList
                                                    data={lan}
                                                    renderItem={renderLanguageRow}
                                                    keyExtractor={(item, index) => index.toString()}
                                                />}
                                    </View>
                                </View>
                                :
                                selectedMainCategory == 1 ?
                                    <View style={{ flex: 1 }}>
                                        {/** Search */}
                                        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#DFDFDF' }}>
                                            <Image source={assests.search} resizeMode='contain' style={{ alignSelf: 'center', marginStart: 8 }} />
                                            <TextInput
                                                placeholder={'Search'}
                                                placeholderTextColor={'#ADBAC1'}
                                                style={[styles.textInputSty, {}]}
                                                defaultValue={searchKeyword}
                                                onChangeText={text => handleOnSeachKeyword(text)}
                                            />
                                            {
                                                isIconShow ?
                                                    <TouchableOpacity onPress={() => handleCloseClick()}
                                                        style={{ alignSelf: 'center', marginEnd: 10 }}>
                                                        <Image source={assests.close_pink} resizeMode='contain' style={{ alignSelf: 'center' }} />
                                                    </TouchableOpacity>
                                                    : null
                                            }
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            {type.length == 0 && searchKeyword != '' ? null :
                                                type.length == 0 && searchKeyword == '' ?
                                                    <FlatList
                                                        data={playerTypeList}
                                                        renderItem={renderplayerTypeRow}
                                                        keyExtractor={(item, index) => index.toString()}
                                                    /> :
                                                    <FlatList
                                                        data={type}
                                                        renderItem={renderplayerTypeRow}
                                                        keyExtractor={(item, index) => index.toString()}
                                                    />}
                                        </View>
                                    </View>

                                    :
                                    selectedMainCategory == 2 ?
                                        <View style={{ flex: 1 }}>
                                            {/** Search */}
                                            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#DFDFDF' }}>
                                                <Image source={assests.search} resizeMode='contain' style={{ alignSelf: 'center', marginStart: 8 }} />
                                                <TextInput
                                                    placeholder={'Search'}
                                                    placeholderTextColor={'#ADBAC1'}
                                                    style={[styles.textInputSty, {}]}
                                                    defaultValue={searchKeyword}
                                                    onChangeText={text => handleOnSeachKeyword(text)}
                                                />
                                                {
                                                    isIconShow ?
                                                        <TouchableOpacity onPress={() => handleCloseClick()}
                                                            style={{ alignSelf: 'center', marginEnd: 10 }}>
                                                            <Image source={assests.close_pink} resizeMode='contain' style={{ alignSelf: 'center' }} />
                                                        </TouchableOpacity>
                                                        : null
                                                }
                                            </View>
                                            <View style={{ marginTop: 0, flex: 1 }}>
                                                {cat.length == 0 && searchKeyword != '' ? null :
                                                    cat.length == 0 && searchKeyword == '' ?
                                                        <FlatList
                                                            data={categoryList}
                                                            renderItem={renderCategoryRow}
                                                            keyExtractor={(item, index) => index.toString()}
                                                        /> :
                                                        <FlatList
                                                            data={cat}
                                                            renderItem={renderCategoryRow}
                                                            keyExtractor={(item, index) => index.toString()}
                                                        />}
                                            </View>
                                        </View>
                                        :
                                        selectedMainCategory == 3 ?
                                            // Game type component
                                            <View style={{ flex: 1 }}>
                                                {/** Search */}
                                                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#DFDFDF' }}>
                                                    <Image source={assests.search} resizeMode='contain' style={{ alignSelf: 'center', marginStart: 8 }} />
                                                    <TextInput
                                                        placeholder={'Search'}
                                                        placeholderTextColor={'#ADBAC1'}
                                                        style={[styles.textInputSty, {}]}
                                                        defaultValue={searchKeyword}
                                                        onChangeText={text => handleOnSeachKeyword(text)}
                                                    />
                                                    {
                                                        isIconShow ?
                                                            <TouchableOpacity onPress={() => handleCloseClick()}
                                                                style={{ alignSelf: 'center', marginEnd: 10 }}>
                                                                <Image source={assests.close_pink} resizeMode='contain' style={{ alignSelf: 'center' }} />
                                                            </TouchableOpacity>
                                                            : null
                                                    }
                                                </View>
                                                <View style={{ marginTop: 0, flex: 1 }}>
                                                    {gameType.length == 0 && searchKeyword != '' ? null :
                                                        gameType.length == 0 && searchKeyword == '' ?
                                                            <FlatList
                                                                data={gameTypeList}
                                                                renderItem={renderGameTypeRow}
                                                                keyExtractor={(item, index) => index.toString()}
                                                            /> :
                                                            <FlatList
                                                                data={gameType}
                                                                renderItem={renderGameTypeRow}
                                                                keyExtractor={(item, index) => index.toString()}
                                                            />}
                                                </View>
                                            </View>
                                            :
                                            null
                        }



                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 20, marginHorizontal: 20, }}>
                    {/** Close Button */}
                    <TouchableOpacity onPress={() => handleButtonClick(1)}
                        style={[styles.btnViewContainer, { backgroundColor: '#88D8B8', }]}>
                        <Text style={styles.btnSty}>{'Close'}</Text>
                    </TouchableOpacity>
                    {/** Apply Button */}
                    <TouchableOpacity onPress={() => handleButtonClick(2)}
                        style={styles.btnViewContainer}>
                        <Text style={styles.btnSty}>{'Apply'}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>
    )

    /**
     * Handle Main Category Click
     */
    function handleMainCategoryClick(selectedIndex) {
        setSearchKeyword('')
        setIconShow(false)
        setselectedMainCategory(selectedIndex)
    }



}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#22343C',
    },
    topViewContainer: {
        flexDirection: 'row', borderBottomWidth: 0.5,
        borderBottomColor: '#DFDFDF', paddingVertical: 10,
        paddingHorizontal: 20
    },
    btnViewContainer: {
        borderRadius: 10,
        backgroundColor: '#FCD274',
        width: '45%',
        marginHorizontal: 10,
    },
    btnSty: {
        paddingVertical: 15,
        fontFamily: appConstants.AirbnbCerealAppBold,
        fontSize: 18,
        textAlign: 'center',
        color: '#22343C',
    },
    categoryTxtSty: {
        fontFamily: appConstants.AirbnbCerealAppLight,
        fontSize: 16,
        color: '#ffffff',
        paddingVertical: 12,
        paddingStart: 20,
        flex: 1
    },
    countTxtSty: {
        backgroundColor: '#FF5485',
        textAlign: 'center',
        fontFamily: appConstants.AirbnbCerealAppLight,
        fontSize: 12,
        color: '#ffffff',
        paddingHorizontal: 8,
        paddingVertical: 2,
        alignSelf: 'center',
        borderRadius: 7,
        marginEnd: 10,
        overflow: 'hidden'
    },
    languageTxtSty: {
        fontFamily: appConstants.AirbnbCerealAppMedium,
        fontSize: 17,
        color: '#78868B',
        paddingVertical: 12,
        alignSelf: 'center',
        letterSpacing: 2
    },
    textInputSty: {
        fontFamily: appConstants.AirbnbCerealAppLight,
        fontSize: 16,
        color: '#ADBAC1',
        paddingVertical: 12,
        flex: 1,
        paddingHorizontal: 10,
    },

})