import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';
import BaseInput from './BaseInput';
import appConstants from './appConstants';
export default class Hoshi extends BaseInput {
  static propTypes = {
    borderColor: PropTypes.string,
    maskColor: PropTypes.string,
    inputPadding: PropTypes.number,
    height: PropTypes.number,
  };
  static defaultProps = {
    borderColor: '#4C575E',
    inputPadding: 12,
    height: 180,
    borderHeight: 1,
  };
  render() {
    const {
      label,
      style: containerStyle,
      inputStyle,
      labelStyle,
      maskColor,
      borderColor,
      borderHeight,
      inputPadding,
      height: inputHeight,
    } = this.props;
    const { width, focusedAnim, value } = this.state;
    const flatStyles = StyleSheet.flatten(containerStyle) || {};
    const containerWidth = flatStyles.width || width;
    return (
      <View
        style={[
          styles.container,
          containerStyle,
          {
            height: inputHeight + inputPadding,
            width: containerWidth,
          },

        ]
        }
        onLayout={this._onLayout}
      >
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <TextInput
            ref={this.input}
            {...this.props}
            style={[
              styles.textInput,
              inputStyle,
              {
                width,
                height: inputHeight,
                alignSelf: 'center'
              },
            ]}
            value={value}
            onBlur={this._onBlur}
            onChange={this._onChange}
            onFocus={this._onFocus}
            underlineColorAndroid={'transparent'}
          />
          <TouchableWithoutFeedback onPress={this.focus}>
            <Animated.View
              style={[
                styles.labelContainer,
                {
                  opacity: focusedAnim.interpolate({
                    inputRange: [0, 0.2, 1],
                    outputRange: [1, 0, 1],
                  }),
                  top: focusedAnim.interpolate({
                    inputRange: [0, 0.5, 0.51, 1],
                    outputRange: [20, 10, 0, 0],
                  }),
                },
              ]}
            >
              <Text style={[styles.label, labelStyle]}>
                {label}
              </Text>
            </Animated.View>
          </TouchableWithoutFeedback>
          <View
            style={[styles.labelMask, {
              backgroundColor: maskColor,
              width: inputPadding,
            }]}
          />
          <Animated.View
            style={[
              styles.border,
              {
                width: focusedAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, width],
                }),
                backgroundColor: borderColor,
                height: borderHeight,
              },
            ]}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#4C575E',

  },
  labelContainer: {
    position: 'absolute',
  },
  label: {
    fontSize: 12,
    color: appConstants.fontColor,
    fontFamily: appConstants.fontReqular
  },
  textInput: {
    color: appConstants.headerColor,
    fontSize: 14,
    marginTop:15,
    fontFamily: appConstants.fontSemiBold,
  },
  labelMask: {
    height: 30,
  },
  border: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
