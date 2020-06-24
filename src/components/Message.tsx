import React, { useState } from 'react';
import { Popup } from 'react-native-windows';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableHighlight,
} from 'react-native';
import ExerciseScreen from '../screens/ExerciseScreen';

interface Props {
    message?: string;
}

const Message = () => {
    const [modalVisible, setModalVisible] = useState(true);
    return (
        <Popup
            style={[styles.container, styles.centeredView]}
            target={ExerciseScreen}
            isOpen={modalVisible}
            isLightDismissEnabled={true}
            horizontalOffset={300}
            verticalOffset={200}
            onDismiss={() => {
                setModalVisible(!modalVisible);
            }}>
            <Text>TouchableHighlight</Text>
        </Popup>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        width: 300,
    },
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
export default Message;
