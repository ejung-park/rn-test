import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, ScrollView } from 'react-native';
import ToDo from './ToDo';
const {height, width} = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo : ""
  }

  render() {
    const { newToDo } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <Text style={styles.title}>test</Text>
        <View style={styles.card}>
          <TextInput style={styles.input} placeholder={"New To Do"} value={newToDo} onChangeText={this._crontollNewToDo} placeholderTextColor={"#999"} autoCorrect={false}></TextInput>
          <ScrollView contentContainerStyle={styles.toDos}>
            <ToDo text="Hello" />
          </ScrollView>
        </View>
      </View>
    );
  }
//returnKeyType : done
//autoCorrect : 자동완성기능 on off
  _crontollNewToDo = text => {
    this.setState({
      newToDo:text
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f23657',
    alignItems: 'center'
  },
  title: {
    color: '#ffffff',
    marginTop: 30,
    fontSize:50,
    marginBottom:30
  },
  card : {
    backgroundColor: '#FFF',
    flex:1,
    width: width -50,
    borderRadius:10
  },
  input : {
    padding:20,
    borderBottomColor:"#ccc",
    borderBottomWidth:1,
    fontSize:20
  },
  toDos : {
    alignItems : "center"
  }
});
