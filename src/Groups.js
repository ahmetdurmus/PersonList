import React from 'react';
import {View, TouchableOpacity, TextInput, Text, Alert, StyleSheet} from 'react-native';

import realm from './components/realm';

class Groups extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            Group_Name: ''
        }
    }


    add_Group=()=>{
        
        realm.write(() => {
            var ID = realm.objects('Groups').sorted('groupId', true).length > 0
            ? realm.objects('Groups').sorted('groupId', true)[0]
                .groupId + 1
            : 1;

            realm.create('Groups', {
                groupId: ID,
                groupName: this.state.Group_Name
            });
        });

        Alert.alert(
        'Başarılı',
        'Grup başarıyla eklendi',
        [
            {
            text: 'Ok',
            onPress: () => this.props.navigation.navigate('addPerson'),
            },
        ],
        {cancelable: false}
        );
    }

    render(){
        const { goBack } = this.props.navigation;
        return(
            <View style={styles.view}>
                <TextInput placeholder={"Grup Adı"} 
                    style={styles.input}
                    onChangeText = { ( text ) => { this.setState({Group_Name: text})}}>
                </TextInput>
                
                <View style={styles.buttonsArea}>
                    <View style={styles.closeAndSaveButtons}>
                    <TouchableOpacity style={styles.button} 
                        onPress={() => goBack()} >
                        <Text style={styles.deleteButton}>İPTAL</Text>
                    </TouchableOpacity>
                    </View>

                    <View style={styles.closeAndSaveButtons}>
                    <TouchableOpacity style={styles.button} 
                        onPress={this.add_Group} >
                        <Text style={styles.saveButton}>KAYDET</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        padding: 15
    },
    input: {
        borderWidth:1,
        padding: 8, 
        marginBottom: 8, 
        borderRadius: 10
    },
    buttonsArea: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        marginTop: 20
    },
    closeAndSaveButtons: {
        backgroundColor: "#d8eddd", 
        height: 40, 
        width: 150
    },
    button: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center"
    },
    deleteButton: {
        fontSize: 16, 
        color: '#bf1a0b'
    },
    saveButton: {
        fontSize: 16, 
        color: '#1515d1'
    }
});

export default Groups;