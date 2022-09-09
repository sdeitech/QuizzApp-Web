import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from './styles';
import assests from './assests';
import {BottomTab,HeartTab} from './commonView'
import appConstants from './appConstants';
class Footer extends Component {

    render() {
        return (
            <View style={styles.container}>
                <BottomTab
                    icon = {this.props.activeOne == 1 ? assests.active_bg : assests.bottom_g  }
                    image = {this.props.activeOne == 1 ? assests.home_active : assests.home_unactive}
                    onPress = {()=> this.props.activeOne == 1 ? console.log('') :Actions.homeScreen()}
                />
                 <BottomTab
                    icon = {this.props.activeOne == 2 ? assests.active_bg : assests.bottom_g  }
                    image = {this.props.activeOne == 2 ? assests.volunteer_active : assests.voluntreer}
                    onPress = {()=> this.props.activeOne == 2 ? console.log('') :Actions.volunteerScreen()}
                />
                <HeartTab
                    icon = {this.props.activeOne == 3 ? assests.active_bg : assests.bottom_g  }
                    image = {this.props.activeOne == 3 ? assests.volunteer_active : assests.voluntreer}
                    onPress = { this.props.activeOne == 3 ? null:this.props.isAddModal}
                />
                  <BottomTab
                   icon = {this.props.activeOne == 4 ? assests.active_bg : assests.bottom_g  }
                   image = {this.props.activeOne == 4 ? assests.discuss_active : assests.discuss}
                   onPress = {()=> this.props.activeOne == 4 ? console.log('') :Actions.discussionScreen()}
                />
                  <BottomTab
                   icon = {this.props.activeOne == 5 ? assests.active_bg : assests.bottom_g  }
                   image = {this.props.activeOne == 5 ? assests.menu_active : assests.menu}
                   onPress = {()=> this.props.activeOne == 5 ? console.log('') :Actions.moreScreen()}
                />
          

            </View>
        );
    }
}

export default Footer;