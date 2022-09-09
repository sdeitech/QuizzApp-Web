import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ActionSheet = (props) => {
    selectOption = (type) => props.selectOptions(type)
    return (
        <Modal
            visible={props.visible}
            transparent={true}
            animationType="none"
        >
            <View style={styles.modalContainer}>
                {/* <View></View> */}
                <View style={styles.optionsView}>
                    <View style={{ paddingVertical: 20,borderBottomWidth:0.5 }}>
                        <Text style={[{ textAlign: 'center', color: 'gray', fontSize: 18 }]}>Select Image From</Text>
                    </View>
                    <TouchableOpacity onPress={() => selectOption('camera')} style={styles.touch}>
                        <Text style={styles.optionsText}>Take photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => selectOption('gallery')}style={styles.touch} >
                        <Text style={[styles.optionsText]}>Choose from gallery</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.optionsView,{marginBottom:15,marginTop:5}]}>
                <TouchableOpacity onPress={props.closeActionSheet} style={[{paddingVertical: 20}]}>
                        <Text style={[styles.optionsText]}>Cancel</Text>
                    </TouchableOpacity>
                    </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: '#00000444',
       justifyContent:'flex-end',
       paddingHorizontal:10

    },
    optionsView: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor:'#fff',
        borderRadius:15,
    },
    options: {
        backgroundColor: '#00000111',
        borderRadius: 5,
    },
    optionsText: {
        color: '#0039FE',
        fontSize: 22,
        textAlign: 'center',

    },
    touch: {
        paddingVertical: 20,
        borderBottomWidth:0.5,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default ActionSheet;