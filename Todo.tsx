import React, { Component } from "react"

import { observer } from "mobx-react";
import { observable } from "mobx"
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from "react-native"
import PropTypes from "prop-types"

const { height, width } = Dimensions.get("window");

const todoStore = observable({
    isEditing : false,
    todoValue : ""
})

@observer
export default class Todo extends Component{
    static propTypes = {
        text: PropTypes.string.isRequired,
        isDone: PropTypes.bool.isRequired,
        deleteTodo: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired,
        completeTodo: PropTypes.func.isRequired,
        uncompleteTodo: PropTypes.func.isRequired,
        modifyTodoItem: PropTypes.func.isRequired
    }

    constructor(props : any) {
        super(props);
        todoStore.todoValue = props.text;
    }

    render() {
        const { text, deleteTodo, id, isDone } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View style={[styles.circle, isDone? styles.compltedCircle : styles.incompletedCircle ]} />
                    </TouchableOpacity>
                    {todoStore.isEditing? (
                        <TextInput style={[styles.text, styles.input, isDone? styles.completedText : styles.incompletedText]} value={todoStore.todoValue} multiline={true} onChangeText={this._controlInput} returnKeyType={"done"} onBlur={this._finishEditing} />
                    ) : (
                        <Text style={[styles.text, isDone? styles.completedText : styles.incompletedText]}> {text} </Text>
                    )}
                </View>
                {todoStore.isEditing ? (
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._finishEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>✅</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._startEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>✏️</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPressOut={() => deleteTodo(id)}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>❌</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    }

    _toggleComplete = () => {
        const { isDone, setTodoItemDone, id } : any = this.props;
        setTodoItemDone(id, !isDone);
    }

    _startEditing = () => {
        todoStore.isEditing = true;
    }

    _finishEditing = () => {
        const { id, modifyTodoItem } = this.props;
        modifyTodoItem(id, todoStore.todoValue);
        todoStore.isEditing = false;
    }

    _controlInput = (text) => {
        todoStore.todoValue = text;
    }
}

const styles = StyleSheet.create({
    container: {
        width: width - 70,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
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