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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var mobx_react_1 = require("mobx-react");
var mobx_1 = require("mobx");
var react_native_1 = require("react-native");
var prop_types_1 = require("prop-types");
var _a = react_native_1.Dimensions.get("window"), height = _a.height, width = _a.width;
var todoStore = mobx_1.observable({
    isEditing: false,
    todoValue: ""
});
var Todo = /** @class */ (function (_super) {
    __extends(Todo, _super);
    function Todo(props) {
        var _this = _super.call(this, props) || this;
        _this._toggleComplete = function () {
            var _a = _this.props, isDone = _a.isDone, setTodoItemDone = _a.setTodoItemDone, id = _a.id;
            setTodoItemDone(id, !isDone);
        };
        _this._startEditing = function () {
            todoStore.isEditing = true;
        };
        _this._finishEditing = function () {
            var _a = _this.props, id = _a.id, modifyTodoItem = _a.modifyTodoItem;
            modifyTodoItem(id, todoStore.todoValue);
            todoStore.isEditing = false;
        };
        _this._controlInput = function (text) {
            todoStore.todoValue = text;
        };
        todoStore.todoValue = props.text;
        return _this;
    }
    Todo.prototype.render = function () {
        var _a = this.props, text = _a.text, deleteTodo = _a.deleteTodo, id = _a.id, isDone = _a.isDone;
        return (<react_native_1.View style={styles.container}>
                <react_native_1.View style={styles.column}>
                    <react_native_1.TouchableOpacity onPress={this._toggleComplete}>
                        <react_native_1.View style={[styles.circle, isDone ? styles.compltedCircle : styles.incompletedCircle]}/>
                    </react_native_1.TouchableOpacity>
                    {todoStore.isEditing ? (<react_native_1.TextInput style={[styles.text, styles.input, isDone ? styles.completedText : styles.incompletedText]} value={todoStore.todoValue} multiline={true} onChangeText={this._controlInput} returnKeyType={"done"} onBlur={this._finishEditing}/>) : (<react_native_1.Text style={[styles.text, isDone ? styles.completedText : styles.incompletedText]}> {text} </react_native_1.Text>)}
                </react_native_1.View>
                {todoStore.isEditing ? (<react_native_1.View style={styles.actions}>
                        <react_native_1.TouchableOpacity onPressOut={this._finishEditing}>
                            <react_native_1.View style={styles.actionContainer}>
                                <react_native_1.Text style={styles.actionText}>✅</react_native_1.Text>
                            </react_native_1.View>
                        </react_native_1.TouchableOpacity>
                    </react_native_1.View>) : (<react_native_1.View style={styles.actions}>
                        <react_native_1.TouchableOpacity onPressOut={this._startEditing}>
                            <react_native_1.View style={styles.actionContainer}>
                                <react_native_1.Text style={styles.actionText}>✏️</react_native_1.Text>
                            </react_native_1.View>
                        </react_native_1.TouchableOpacity>
                        <react_native_1.TouchableOpacity onPressOut={function () { return deleteTodo(id); }}>
                            <react_native_1.View style={styles.actionContainer}>
                                <react_native_1.Text style={styles.actionText}>❌</react_native_1.Text>
                            </react_native_1.View>
                        </react_native_1.TouchableOpacity>
                    </react_native_1.View>)}
            </react_native_1.View>);
    };
    Todo.propTypes = {
        text: prop_types_1.default.string.isRequired,
        isDone: prop_types_1.default.bool.isRequired,
        deleteTodo: prop_types_1.default.func.isRequired,
        id: prop_types_1.default.string.isRequired,
        completeTodo: prop_types_1.default.func.isRequired,
        uncompleteTodo: prop_types_1.default.func.isRequired,
        modifyTodoItem: prop_types_1.default.func.isRequired
    };
    Todo = __decorate([
        mobx_react_1.observer
    ], Todo);
    return Todo;
}(react_1.Component));
exports.default = Todo;
var styles = react_native_1.StyleSheet.create({
    container: {
        width: width - 70,
        borderBottomColor: "#bbb",
        borderBottomWidth: react_native_1.StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        marginRight: 20
    },
    compltedCircle: {
        borderColor: "#bbb"
    },
    incompletedCircle: {
        borderColor: "#f23657"
    },
    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 15,
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    incompletedText: {
        color: "#353839"
    },
    column: {
        width: width / 2,
        flexDirection: "row",
        alignItems: "center"
    },
    actions: {
        flexDirection: "row"
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    input: {
        width: width / 2,
        marginVertical: 15,
        paddingBottom: 5
    }
});
