import React from 'react';
import { Linking } from 'react-native';
import { Router } from 'react-native-router-flux';
import appConstants from './common/appConstants';

export default class LinkedRouter extends React.Component {
    constructor(props) {
        super(props);

        this.handleOpenURL = this.handleOpenURL.bind(this);
    }

    componentDidMount() {
        Linking
            .getInitialURL()
            .then(url => this.handleOpenURL({ url }))
            .catch(console.error);

        Linking.addEventListener('url', this.handleOpenURL);
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleOpenURL);
    }

    handleOpenURL(event) {
        if (event.url && event.url.indexOf(this.props.scheme + '://') === 0) {
            crossroads.parse(event.url.slice(this.props.scheme.length + 3));
        }
    }

	onBackPress() {
		if (Actions.currentScene == "_Home") {
			if (!this.state.isTimerRunning) {
				this.state.isTimerRunning = true;
				setTimeout(() => {
					this.state.isTimerRunning = false;
				}, 3000);

				ToastAndroid.show("Click back again to exit!", ToastAndroid.LONG);
				return true; // Return true to stay
			}
			else {
				return false; // Return false to exit the app.
			}
		} else {
			Actions.pop();
			return true;
		}
	}

    render() {
        return (
            <Router
                sceneStyle={{ backgroundColor: appConstants.appBackgroundBackground }}
                backAndroidHandler={this.onBackPress}
                {...this.props}
            />
        );
    }
}
