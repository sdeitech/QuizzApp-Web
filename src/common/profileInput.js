import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TextInput,
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
      textInputView,
    } = this.props;
    return (
      <View style={[styles.container, { borderColor: inputText == '' ? 'gray' : appConstants.AppTheamColor, }, { inputStyle }]}>
        <Text style={styles.headerStyle}>
          {headerValue}
        </Text>
        <View style={[styles.textInputView,{textInputView}]}>
          <Text
            {...this.props}
            style={styles.textInput}
            // value={inputText}
            onChangeText={value => onChange(value)} >
                {inputText}
          </Text>
          {isSecure ?
            <TouchableOpacity style={styles.passwordView} onPress={showPass}>
              <Image source={assests.show_password}
                style={styles.passwordLogo} />
            </TouchableOpacity>
            : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop:15
  },
  headerStyle: {
    fontSize: 14,
    marginLeft: 15,
    color:appConstants.black,
    fontFamily:appConstants.fontReqular
  },
  passwordLogo: {
    resizeMode: 'contain'
  },
  passwordView: {
    position: 'absolute',
    right: 10,
    alignSelf: 'center'
  },
  textInput: {
    marginVertical: 5,
    fontSize: 14,
    marginRight: 10,
    color:appConstants.black,
    fontFamily:appConstants.fontLight

  },
  textInputView: {
    flexDirection: 'row',
    paddingHorizontal: 15,

  }
});
