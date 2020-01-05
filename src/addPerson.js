import React, {Component} from 'react';
import {View, Picker, Text, TextInput, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer } from 'react-navigation';
import Groups from './Groups';

import realm from './components/realm';

class AddPerson extends React.Component{

    constructor(props){
        super(props);
  
        this.state = {
            Person_Name: '',
            Person_Surname: '',
            Person_PhoneNumber: '',
            Person_Group: '',
            groupData: []
        }
    }
  
    add_Person=()=>{
          realm.write(() => {
            var ID = realm.objects('Persons').sorted('personId', true).length > 0
            ? realm.objects('Persons').sorted('personId', true)[0]
                .personId + 1
            : 1;
  
            realm.create('Persons', {
              personId: ID,
              personName: this.state.Person_Name,
              personSurname: this.state.Person_Surname,
              personPhoneNumber: this.state.Person_PhoneNumber,
              personGroup: this.state.Person_Group
            });
      });
      Alert.alert(
        'Başarılı',
        'Kişi başarıyla eklendi',
        [
          {
            text: 'Ok',
            onPress: () => this.props.navigation.navigate('Home'),
          },
        ],
        {cancelable: false}
      );
    }
  
    render(){
        const {navigate, goBack} = this.props.navigation;
        this.state.groupData = realm.objects('Groups');
        
        return(
            <View style={styles.view}>
                <TextInput placeholder={"Adı"}
                  style={styles.input}
                  onChangeText = { ( text ) => { this.setState({Person_Name: text})}}
                  maxLength={30}>
                </TextInput>
                <TextInput placeholder={"Soyadı"}
                  style={styles.input}
                  onChangeText = { ( text ) => { this.setState({Person_Surname: text})}}
                  maxLength={30}>
                </TextInput>
                <TextInput placeholder={"Telefon Numarası"}
                  style={styles.input}
                  keyboardType= "numeric"
                  maxLength = {11}
                  onChangeText = { ( text ) => { this.setState({Person_PhoneNumber: text})}}>
                </TextInput>
  
                <View style={styles.buttonsArea}>
                    <Picker
                        selectedValue={this.state.Person_Group}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => this.setState({Person_Group: itemValue})}>
                        <Picker.Item label="Bir grup seçiniz" value="" />
                        {this.state.groupData.map((data) => <Picker.Item label={data.groupName} value={data.groupId.toString()} /> )}
                    </Picker>
                    <View style={styles.addGroupButtonArea}>
                        <View style={styles.closeAndUpdateButtons}>
                          <TouchableOpacity style={styles.button} 
                            onPress={() => navigate("Group")}>
                            <Text style={styles.saveButton}>YENİ GRUP EKLE</Text>
                          </TouchableOpacity>
                        </View>
                    </View>
                    
                </View>
  
                <View style={styles.buttonsArea}>
                    <View style={styles.closeAndUpdateButtons}>
                      <TouchableOpacity style={styles.button} 
                        onPress={() => goBack()} >
                        <Text style={styles.deleteButton}>İPTAL</Text>
                      </TouchableOpacity>
                    </View>
  
                    <View style={styles.closeAndUpdateButtons}>
                      <TouchableOpacity style={styles.button} 
                        onPress={this.add_Person} >
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
        borderRadius: 10,
        borderColor: '#007FFF'
    },
    buttonsArea: {
        flexDirection: "row", 
        justifyContent: "space-between",
        marginTop: 20
    },
    picker: {
        height: 50, 
        width: 200
    },
    addGroupButtonArea: {
        width: 150, 
        marginTop: 8
    },
    closeAndUpdateButtons: {
        backgroundColor: "#d8eddd", 
        height: 40, 
        width: 150
    },
    deleteButtons: {
        backgroundColor: "#d8eddd", 
        height: 40, 
        marginTop: 10
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

export default AddPerson;