import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from "react-native"
import PropTypes from "prop-types"

const { height, width } = Dimensions.get("window");

export default class Todo extends Component{
    static propTypes = {
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        deleteTodo: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired,
        completeTodo: PropTypes.func.isRequired,
        uncompleteTodo: PropTypes.func.isRequired,
        updateTodo: PropTypes.func.isRequired
    }

    state = {
        isEditing: false,
        todoValue: ""
    }

    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            todoValue: props.text
        }
    }

    render() {
        const { isEditing, todoValue } = this.state;
        const { text, deleteTodo, id, isCompleted } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View style={[styles.circle, isCompleted? styles.compltedCircle : styles.incompletedCircle ]} />
                    </TouchableOpacity>
                    {isEditing? (
                        <TextInput style={[styles.text, styles.input, isCompleted? styles.completedText : styles.incompletedText]} value={todoValue} multiline={true} onChangeText={this._controlInput} returnKeyType={"done"} onBlur={this._finishEditing} />
                    ) : (
                        <Text style={[styles.text, isCompleted? styles.completedText : styles.incompletedText]}> {text} </Text>
                    )}
                </View>
                {isEditing ? (
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
        const { isCompleted, uncompleteTodo, completeTodo, id } = this.props;
        if(isCompleted) {
            uncompleteTodo(id);
        } else {
            completeTodo(id);
        }
    }

    _startEditing = () => {
        this.setState({
            isEditing: true
        })
    }

    _finishEditing = () => {
        const { todoValue } = this.state;
        const { id, updateTodo } = this.props;
        updateTodo(id, todoValue);
        this.setState({
            isEditing: false
        });
    }

    _controlInput = (text) => {
        this.setState({
            todoValue: text
        })
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