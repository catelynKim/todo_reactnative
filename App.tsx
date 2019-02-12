import * as React from 'react';
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
import { observer } from "mobx-react";
import { observable } from "mobx"
import { AppLoading } from "expo";
import TodoListStore from "./todoStore"
import Todo from "./Todo";

const { width } = Dimensions.get("window");


@observer
export default class App extends React.Component {

  @observable newTodo : string = '';

  state = {
    loadedTodos: false
  }

  componentDidMount = () => {
    this._loadTodos();
  }
 
  render() {
    const { loadedTodos } = this.state;
    const store = TodoListStore.todoList;
    if(!loadedTodos) {
      return <AppLoading />
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}> TO DO APP</Text>
        <View style={styles.card}>
          <TextInput 
            style={styles.input}
            keyboardAppearance={"dark"} 
            placeholder={"New Item"} 
            value={this.newTodo} 
            onChangeText={this._createNewTodo} 
            placeholderTextColor={"#999"} 
            returnKeyType={"done"} 
            onSubmitEditing={() => this._addTodo()} 
          />
          <ScrollView contentContainerStyle={{alignItems: "center"}}>  
            { store.map(toDo => 
              <Todo 
                key={toDo.id} 
                {...toDo} 
                deleteTodo={this._deleteTodo} 
                modifyTodoItem={this._modifyTodoItem} 
                setTodoItemDone={this._setTodoItemDone}
                />)}
          </ScrollView>
        </View>
      </View>
    );
  }

  _createNewTodo = (text : string) => {
    this.newTodo = text;
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
    TodoListStore.addTodoItem(this.newTodo);
    this.newTodo = "";
  }

  _deleteTodo = (id : string) => {
    TodoListStore.deleteTodoItem(id);
  }

  _setTodoItemDone = (id : string, isDone : boolean) => {
    TodoListStore.setTodoItemDone(id, isDone);
  }

  _modifyTodoItem = (id : string, text : string) => {
    console.log(`[App::modify] text : ${text}`);
    TodoListStore.modifyTodoItem(id, text);
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
