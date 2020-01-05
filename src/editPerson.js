import React from 'react';
import {View, TouchableOpacity, TextInput, Text, Alert, Picker, StyleSheet} from 'react-native';

import realm from './components/realm';

class EditPerson extends React.Component{
    constructor(props){
      super(props);
  
      this.state = {
        personID: '',
        editPersonName: '',
        editPersonSurname: '',
        editPersonPhoneNumber: '',
        editPersonGroup: '',
        groupData: []
      }
    }
  
    componentDidMount(){
      this.setState({
        personID: this.props.navigation.state.params.ID,
        editPersonName: this.props.navigation.state.params.PERSONNAME,
        editPersonSurname: this.props.navigation.state.params.PERSONSURNAME,
        editPersonPhoneNumber: this.props.navigation.state.params.PERSONNPHONENUMBER,
        editPersonGroup: this.props.navigation.state.params.PERSONGROUP
      })
    }
  
    
    update_Person=()=>{
      realm.write(() => {
        var ID = this.state.personID;
  
        var obj = realm.objects('Persons').filtered('personId = ' + ID);
        obj[0].personName = this.state.editPersonName;
        obj[0].personSurname = this.state.editPersonSurname;
        obj[0].personPhoneNumber = this.state.editPersonPhoneNumber;
        obj[0].personGroup = this.state.editPersonGroup;
  
      });
  
      Alert.alert(
        'Başarılı',
        'Kişi başarıyla güncellendi',
        [
          {
            text: 'Ok',
            onPress: () => this.props.navigation.navigate('Home'),
          },
        ],
        {cancelable: false}
      );
    }
  
    delete_Person=()=>{
      realm.write(() => {
        var ID = this.state.personID;
  
        var obj = realm.objects('Persons').filtered('personId = ' + ID);
        realm.delete(obj[0]);
      });
  
      Alert.alert(
        'Başarılı',
        'Kişi başarıyla silindi',
        [
          {
            text: 'Ok',
            onPress: () => this.props.navigation.navigate('Home'),
          },
        ],
        {cancelable: false}
      );
    }
  
    delete_Group=()=>{
      realm.write(() => {
        var groupID = this.state.editPersonGroup;
        var obj = realm.objects('Groups').filtered('groupId = ' + groupID);
  
        realm.delete(obj[0]);

      });

      Alert.alert(
        'Başarılı',
        'Grup başarıyla silindi',
        [
          {
            text: 'Ok',
            onPress: () => this.props.navigation.navigate('editPerson'),
          },
        ],
        {cancelable: false}
      );
    }
  
    render(){
      const { goBack } = this.props.navigation;
      this.state.groupData = realm.objects('Groups');
      return(
        <View style={styles.view}>
            <TextInput 
                value={this.state.editPersonName}
                style={styles.input}
                onChangeText = { ( text ) => { this.setState({editPersonName: text})}}>
            </TextInput>
            <TextInput
                value={this.state.editPersonSurname}
                style={styles.input}
                onChangeText = { ( text ) => { this.setState({editPersonSurname: text})}}>
            </TextInput>
            <TextInput
                value= {this.state.editPersonPhoneNumber}
                style={styles.input}
                onChangeText = { ( text ) => { this.setState({editPersonPhoneNumber: text})}}>
            </TextInput>

            <View>
                <Picker
                    selectedValue={this.state.editPersonGroup}
                    onValueChange={(itemValue, itemIndex) => this.setState({editPersonGroup: itemValue})}>
                    <Picker.Item label="Bir grup seçiniz" value="" />
                    {this.state.groupData.map((data) => <Picker.Item label={data.groupName} value={data.groupId.toString()} /> )}
                </Picker>
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
                    onPress={this.update_Person} >
                    <Text style={styles.saveButton}>GÜNCELLE</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.deleteButtons}>
                <TouchableOpacity style={styles.button} 
                onPress={this.delete_Person} >
                <Text style={styles.deleteButton}>KİŞİYİ SİL</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.deleteButtons}>
                <TouchableOpacity style={styles.button} 
                onPress={this.delete_Group} >
                <Text style={styles.deleteButton}>GRUBU SİL</Text>
                </TouchableOpacity>
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
        marginTop: 20, 
        marginBottom: 10
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

export default EditPerson;