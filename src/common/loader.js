import React from 'react';
import { View, Text, Modal, ActivityIndicator, StyleSheet } from 'react-native';

const Loader = props => {
    return(
        <Modal
            transparent={true}
            visible={props.visible}
            animationType="none"
        >
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0196E9"/>
                <Text style={styles.Text}>Please wait...</Text>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    loaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#00000999'
    },
    Text: {
        marginTop: 15,
        fontSize: 16,
        color: '#fff'
    }
})

export default Loader;