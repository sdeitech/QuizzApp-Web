import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import appConstants from './appConstants';
import assests from './assests';


export default class Thakur extends Component {
  static propTypes = {
    borderColor: PropTypes.string,
    /*
     * this is used to set backgroundColor of label mask.
     * this should be replaced if we can find a better way to mask label animation.
     */
    maskColor: PropTypes.string,
    inputPadding: PropTypes.number,
    height: PropTypes.number,
  };
  render() {
    const {
      headerValue,
      inputText,
      onChange,
      placeholderText,
      inputStyle,
      isSecure,
      showPass,
      borderColor,
      secureTextEntry,
      icon
    } = this.props;
    return (
        <View style={[styles.textInputView,{borderColor:borderColor}]}>
        <Image source={icon}
                style={styles.passwordLogo} />
          <TextInput
            {...this.props}
            style={styles.textInput}
            placeholder={placeholderText}
            value={inputText}
            onChangeText={value => onChange(value)} >
          </TextInput>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    fontSize: 14,
    marginLeft: 15,
    color:appConstants.black,
    fontFamily:appConstants.fontReqular
  },
  passwordLogo: {
    resizeMode: 'contain',
    marginRight:10
  },
  passwordView: {
    position: 'absolute',
    right: 10,
    alignSelf: 'center'
  },
  textInput: {
    fontSize: 14,
    color:appConstants.headerColor,
    flex:1,
    fontFamily:appConstants.fontSemiBold

  },
  textInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.4,
    borderRadius:28,
    backgroundColor:'#fff',
    paddingHorizontal: 15,
    shadowColor: appConstants.fontColor,
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 1,  
    elevation: 2,
    height:56,
    width:'90%',
    marginHorizontal:20
  }
});
