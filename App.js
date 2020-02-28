import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, ScrollView, AsyncStorage } from 'react-native';
import ToDo from './ToDo';
import Posts from './components/Posts';
import { AppLoading } from 'expo';
const {height, width} = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo : "",
    loadedToDos : false,
    toDos : {}
  }

  componentDidMount = () => {
    this._loadedToDos();
  }

  render() {
    const { newToDo, loadedToDos, toDos } = this.state;
    if(!loadedToDos){
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <Text style={styles.title}>test</Text>
        <View style={styles.card}>
          <TextInput style={styles.input}
            placeholder={"New To Do"}
            value={newToDo}
            onChangeText={this._crontollNewToDo}
            placeholderTextColor={"#999"}
            autoCorrect={false}
            onSubmitEditing={this._addToDo}
            ></TextInput>
          <ScrollView contentContainerStyle={styles.toDos}>
            {Object.values(toDos).reverse().map(toDo =>
              <ToDo key={toDos.id}
                    deleteToDo={this._deleteToDos}
                    unCompleteToDo={this._unCompleteToDo}
                    completeToDo={this._completeToDo}
                    updateToDo={this._updateToDo}
                    {...toDo} /> )}
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

  _loadedToDos = async() => {
    try{
      const toDos = await AsyncStorage.getItem("toDos");
      const parsedToDos = JSON.parse(toDos);
      if(parsedToDos==null){
        this._saveToDos({});
      }else{
        this.setState({loadedToDos:true, toDos:parsedToDos});
      }


    }catch(err){
      console.log(err);
    }
  }

  _addToDo = () => {
    const { newToDo } = this.state;
    if(newToDo!==""){
      this.setState(prevState => {
        let id = Date.now();
        const newToDoObject = {
         [id] : {
          id: id,
          isCompleted : false,
          text : newToDo,
          create : Date.now()
          }
        }

        const newState = {
          ...prevState,
          newToDo:"",
          toDos : {
            ...prevState.toDos,
            ...newToDoObject
          }
        }
        this._saveToDos(newState.toDos);
        return { ...newState };
      });
    }
  }

  _deleteToDos = (id) => {
      this.setState(prevState => {
          const toDos = prevState.toDos;
          delete toDos[id];

          const newState = {
            ...prevState,
            ...toDos
          }
          this._saveToDos(newState.toDos);
          return { ...newState };
      })
  }

  _unCompleteToDo = (id) => {
    this.setState (prevState => {
      const newState = {
        ...prevState,
        toDos : {
          ...prevState.toDos,
          [id] : {
            ...prevState.toDos[id],
            isCompleted : false
          }
        }
      }
      this._saveToDos(newState.toDos);
      return { ...newState }
    })
  }

  _completeToDo = (id) => {
    this.setState (prevState => {
      const newState = {
        ...prevState,
        toDos : {
          ...prevState.toDos,
          [id] : {
            ...prevState.toDos[id],
            isCompleted : true
          }
        }
      }
      this._saveToDos(newState.toDos);
      return { ...newState }
    })
  }

  _updateToDo = (id,text) => {
    this.setState (prevState => {
      const newState = {
        ...prevState,
        toDos : {
          ...prevState.toDos,
          [id] : {
            ...prevState.toDos[id],
            text : text
          }
        }
      }
      this._saveToDos(newState.toDos);
      return { ...newState }
    })
  }

  _saveToDos = newToDos => {
    console.log(JSON.stringify(newToDos));
    const saveToDos = AsyncStorage.setItem("toDos", JSON.stringify(newToDos));
  }
} //E:App

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
