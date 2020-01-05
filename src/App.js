import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Picker,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';

import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer } from 'react-navigation';
import realm from './components/realm';
import Groups from './Groups';
import AddPerson from './addPerson';
import EditPerson from './editPerson';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      data: [],
      searchText: '',
      isLoading: false,
      groupData: [],
      groups: ''
    };
  }

  goToEditPerson(person_id, person_name, person_surname, person_phonenumber, person_group){
    this.props.navigation.navigate('editPerson', {
      ID: person_id,
      PERSONNAME: person_name,
      PERSONSURNAME: person_surname,
      PERSONNPHONENUMBER: person_phonenumber,
      PERSONGROUP: person_group
    });
  }

  searchPerson(text) {
    this.setState({ searchText: text });
    const a = realm.objects('Persons').filtered('personName CONTAINS[c] $0', this.state.searchText);

    if(text != ''){
      this.setState({ isLoading: true });
      this.state.data = a;
    }
    else{
      this.setState({ isLoading: false });
    }
  }

  groupFilter(itemValue){
    this.setState({groups: itemValue})
    const a = realm.objects('Persons').filtered('personGroup = $0', this.state.groups);

    if(itemValue != ''){
      this.setState({ isLoading: true })
      this.state.data = a;
    }
    else{
      this.setState({ isLoading: false })
    }
  }

  render(){
    const {navigate} = this.props.navigation;

    if(!this.state.isLoading)
      this.state.data = realm.objects('Persons').sorted('personName');

    this.state.groupData = realm.objects('Groups');
    return (
      <View style={styles.homeView}>
          <View style={styles.searchArea}>
            <TextInput placeholder='Kişileri ara...'
                placeholderTextColor = {'#007FFF'} 
                style={styles.input}
                value={this.state.searchText}
                onChangeText={ (text) => { this.searchPerson(text)} }>
              </TextInput>
            <Picker
                selectedValue={this.state.groups}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => this.groupFilter(itemValue)}>
                <Picker.Item label="Tümü" value="" />
                {this.state.groupData.map((data) => <Picker.Item label={data.groupName} value={data.groupId.toString()} /> )}
            </Picker>
            
          </View>
        
          <FlatList style={styles.listArea}
            data={this.state.data}
            renderItem={({ item }) => <View style={styles.item}>
              <TouchableOpacity onPress={this.goToEditPerson.bind(this, item.personId, item.personName, item.personSurname, item.personPhoneNumber, item.personGroup)}> 
                <Text style={styles.title}>{item.personName} {item.personSurname}</Text>
                <Text style={{fontSize: 14}}>Tel: {item.personPhoneNumber}</Text>
              </TouchableOpacity>
            
              </View>}
            keyExtractor={(item) => item.personId}
          />

          <View style={styles.addButtonView}>
            <TouchableOpacity onPress={() => navigate("addPerson")} style={styles.addButton}>
              <Text style = {styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f4f4f4',
    padding: 8,
    marginHorizontal: 16,
    borderBottomWidth: 1
  },
  title: {
    fontSize: 22,
  },
  homeView: {
    flex: 1
  },
  searchArea: {
    backgroundColor: '#f4f4f4', 
    height: 130
  },
  listArea: {
    backgroundColor: '#f4f4f4', 
    flex: 1
  },
  input: {
    borderWidth: 1, 
    margin: 8, 
    borderRadius: 10, 
    padding: 8, 
    borderColor: '#007FFF'
  },
  picker: {
    height: 50, 
    margin: 8
  },
  addButtonView: {
    backgroundColor: "blue", 
    width: 60, 
    height: 60, 
    borderRadius: 50, 
    position: "absolute", 
    bottom: 30, 
    right: 30
  },
  addButton: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center"
  },
  addButtonText: {
    fontSize: 30, 
    color: 'white'
  }
});

const AppNavigator = createStackNavigator({
  Home:{
    screen: App, 
    navigationOptions: {
      title: 'Kişiler'
    }
  },
  addPerson:{
    screen: AddPerson,
    navigationOptions: {
      title: 'Yeni Kişi Ekle'
    }
  },
  Group:{
    screen: Groups,
    navigationOptions: {
      title: 'Yeni Grup Ekle'
    }
  },
  editPerson:{
    screen: EditPerson,
    navigationOptions:{
      title: 'Kişiyi Düzenle'
    }
  }
});

export default createAppContainer(AppNavigator);
