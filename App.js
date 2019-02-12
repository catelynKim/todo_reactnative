"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var mobx_react_1 = require("mobx-react");
var mobx_1 = require("mobx");
var expo_1 = require("expo");
var todoStore_1 = require("./todoStore");
var Todo_1 = require("./Todo");
var width = react_native_1.Dimensions.get("window").width;
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.newTodo = '';
        _this.state = {
            loadedTodos: false
        };
        _this.componentDidMount = function () {
            _this._loadTodos();
        };
        _this._createNewTodo = function (text) {
            _this.newTodo = text;
        };
        _this._loadTodos = function () {
            try {
                var toDos = react_native_1.AsyncStorage.getItem("toDos");
                console.log('todos: ' + JSON.stringify(toDos));
                _this.setState({
                    loadedTodos: true
                });
            }
            catch (e) {
                console.log('error : ' + e);
            }
            _this.setState({
                loadedTodos: true
            });
        };
        _this._addTodo = function () {
            todoStore_1.default.addTodoItem(_this.newTodo);
            _this.newTodo = "";
        };
        _this._deleteTodo = function (id) {
            todoStore_1.default.deleteTodoItem(id);
        };
        _this._setTodoItemDone = function (id, isDone) {
            todoStore_1.default.setTodoItemDone(id, isDone);
        };
        _this._modifyTodoItem = function (id, text) {
            console.log("[App::modify] text : " + text);
            todoStore_1.default.modifyTodoItem(id, text);
        };
        _this._saveState = function (newTodos) {
            var saveTodos = react_native_1.AsyncStorage.setItem("toDos", JSON.stringify(newTodos));
        };
        return _this;
    }
    App.prototype.render = function () {
        var _this = this;
        var loadedTodos = this.state.loadedTodos;
        var store = todoStore_1.default.todoList;
        if (!loadedTodos) {
            return <expo_1.AppLoading />;
        }
        return (<react_native_1.View style={styles.container}>
        <react_native_1.StatusBar barStyle="light-content"/>
        <react_native_1.Text style={styles.title}> TO DO APP</react_native_1.Text>
        <react_native_1.View style={styles.card}>
          <react_native_1.TextInput style={styles.input} keyboardAppearance={"dark"} placeholder={"New Item"} value={this.newTodo} onChangeText={this._createNewTodo} placeholderTextColor={"#999"} returnKeyType={"done"} onSubmitEditing={function () { return _this._addTodo(); }}/>
          <react_native_1.ScrollView contentContainerStyle={{ alignItems: "center" }}>  
            {store.map(function (toDo) {
            return <Todo_1.default key={toDo.id} {...toDo} deleteTodo={_this._deleteTodo} modifyTodoItem={_this._modifyTodoItem} setTodoItemDone={_this._setTodoItemDone}/>;
        })}
          </react_native_1.ScrollView>
        </react_native_1.View>
      </react_native_1.View>);
    };
    __decorate([
        mobx_1.observable
    ], App.prototype, "newTodo", void 0);
    App = __decorate([
        mobx_react_1.observer
    ], App);
    return App;
}(React.Component));
exports.default = App;
var styles = react_native_1.StyleSheet.create({
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
    card: __assign({ backgroundColor: "white", flex: 1, width: width - 50, borderTopLeftRadius: 10, borderTopRightRadius: 10 }, react_native_1.Platform.select({
        ios: {
            shadowColor: "rgb(50, 50, 50)",
            shadowOpacity: 0.5,
            shadowRadius: 5,
            shadowOffset: {
                height: -1,
                width: 0
            }
        },
        android: {
            elevation: 3
        }
    })),
    input: {
        padding: 20,
        borderBottomColor: "#bbb",
        borderBottomWidth: 1,
        fontSize: 25,
    },
    toDos: {
        alignItems: "center"
    }
});
