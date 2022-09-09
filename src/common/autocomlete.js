import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, SafeAreaView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import appConstants from './appConstants';
const PickupPlshlder = 'Search Pickup Location';
const DestinationPlshlder = 'Search Destination Location';
const MY_API_KEY = "AIzaSyBSuNeSQ18G_1DuGMd0GV2cSDw7j1bdVd4"

class AutoCompleteGooglePlaces extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    _closeModal = () => {
        this.props.closeautocomplete()
    }

    render() {
        let { visible, placeholder, getAddressDetail } = this.props;
        let placeholderTest = placeholder === 'pickup' ? PickupPlshlder : DestinationPlshlder
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={visible}
            >
                <SafeAreaView style={{ flex: 1, backgroundColor: appConstants.AppTheamColor }}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}/>
                        <Text style={styles.headerText}>Set Location</Text>
                        <Text style={styles.headerText} onPress={this._closeModal}>Cancel</Text>
                    </View>
                    <View style={styles.autocompleteContainer}>
                        <GooglePlacesAutocomplete
                            placeholder={placeholderTest}
                            minLength={2} // minimum length of text to search
                            autoFocus={false}
                            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                            listViewDisplayed='auto'    // true/false/undefined
                            fetchDetails={true}
                            // renderDescription={row => row.description} // custom description render
                            onPress={(data, details = null) => getAddressDetail(data, details, placeholder)}
                            // onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true

                            //     console.log("fgdfdfghdfj=====>", JSON.stringify(data), "detail======>",JSON.stringify(details));
                            // }}

                            getDefaultValue={() => ''}

                            query={{
                                // available options: https://developers.google.com/places/web-service/autocomplete
                                key: MY_API_KEY, // your api key  AIzaSyATBPKIoF-nYT7j1kpatKeWBFk6TwPHKlE
                                language: 'en', // language of the results
                                // types: '(cities)' // default: 'geocode'   AIzaSyACuYVuk8-xbwEBfOglaMUgAU-_949XrAg
                            }}

                            styles={{
                                textInputContainer: {
                                    width: '100%'
                                },
                                description: {
                                    fontWeight: 'bold'
                                },
                                predefinedPlacesDescription: {
                                    color: '#1faadb'
                                }
                            }}

                            currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                            currentLocationLabel="Current location"
                            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                            GoogleReverseGeocodingQuery={{
                                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                            }}
                            GooglePlacesSearchQuery={{
                                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                                rankby: 'distance',
                                types: 'food'
                            }}

                            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                            // predefinedPlaces={[homePlace, workPlace]}
                            enablePoweredByContainer={false}
                            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                        // renderLeftButton={() => <Image source={require('path/custom/left-icon')} />}
                        // renderRightButton={() => <Text>Custom text after the input</Text>}
                        />
                    </View>
                </SafeAreaView>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    autocompleteContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        paddingVertical: 15,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: appConstants.AppTheamColor,
        paddingHorizontal: 15
    },
    headerText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    }
})

export default AutoCompleteGooglePlaces;