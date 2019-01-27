import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar, 
  TextInput, 
  Dimensions, 
  Platform, 
  ScrollView,
  AsyncStorage 
} from 'react-native';
import { AppLoading } from "expo"
import Todo from "./Todo";
import uuidv1 from "uuid/v1"

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo : "",
    loadedTodos: false,
    toDos: {}
  }

  componentDidMount = () => {
    this._loadTodos();
  }
 
  render() {
    const { newToDo, loadedTodos, toDos } = this.state;
    if(!loadedTodos) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}> TO DO APP</Text>
        <View style={styles.card}>
          <TextInput style={styles.input} keyboardAppearance={"dark"} placeholder={"New Item"} value={newToDo} onChangeText={this._createNewTodo} placeholderTextColor={"#999"} returnKeyType={"done"} onSubmitEditing={this._addTodo} />
          <ScrollView contentContainerStyle={{alignItems: "center"}}>  
            { Object.values(toDos).map(toDo => <Todo key={toDo.id} {...toDo} deleteTodo={this._deleteTodo} uncompleteTodo={this._uncompleteTodo} completeTodo={this._completeTodo} updateTodo={this._updateTodo} />)}
          </ScrollView>
        </View>
      </View>
    );
  }

  _createNewTodo = text => {
    this.setState({
      newToDo: text
    })
  }

  _loadTodos = () => {
    try {
      const toDos = AsyncStorage.getItem("toDos");
      console.log('todos: ' + JSON.stringify(toDos));
      this.setState({
        loadedTodos: true
      })
    } catch(e) {
      console.log('error : ' + e);
    }

    this.setState({
      loadedTodos: true
    })
  }

  _addTodo = () => {
    const { newToDo } = this.state;

    if(newToDo !== "") {
      this.setState(prevState => {
        const ID = uuidv1();
        const newTodoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createdAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          newToDo: "",
          toDos: {
            ...prevState.toDos,
            ...newTodoObject
          }
        }
        this._saveState(newState.toDos);
        return { ...newState };
      });
    }
  }

  _deleteTodo = (id) => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos
      }
      this._saveState(newState.toDos);
      return { ...newState }
    })
  }

  _uncompleteTodo = (id) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: false
          }
        }
      }
      this._saveState(newState.toDos);
      return { ...newState }
    })
  }

  _completeTodo = (id) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: true
          }
        }
      }
      this._saveState(newState.toDos);
      return { ...newState }
    })
  }

  _updateTodo = (id, text) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            text: text
          }
        }
      }
      this._saveState(newState.toDos);
      return { ...newState }
    })
  }

  _saveState = (newTodos) => {
    const saveTodos = AsyncStorage.setItem("toDos", JSON.stringify(newTodos));
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f23657',
    alignItems: 'center'
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "200",
    marginBottom: 30
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android : {
        elevation : 3
      }
    })
  },
  input : {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25,

  },
  toDos: {
    alignItems: "center"
  }
});
