import { View,ActivityIndicator } from 'react-native';
import React from 'react';
import { Modal, Portal,Provider } from 'react-native-paper';

const Progressdialog = () => {
    return (
        <Provider>
        <Portal>
            <Modal
                visible={true}
                animationType="fade"
                transparent={true}
            >
                <View style={{
                    flex: 1, justifyContent: "center", alignItems: 'center', backgroundColor:'rgba(0,0,0,0.5)'
                }} >
                    <ActivityIndicator color="#EC167F"
                        size={50}
                      
                    />
                </View>

            </Modal>
            </Portal>
        </Provider>
    );
};

export default Progressdialog;