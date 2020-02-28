import React, {Component} from "react";
import { View, Text, TouchableOpacity, StyleSheet,Dimensions, TextInput } from "react-native";
import PropTypes from "prop-types";

const {width, height} = Dimensions.get("window");

export default class ToDo extends Component {

    constructor (props) {
      super(props);
      this.state = { isEditing:false, toDoValue: props.text };
    }

    static propTypes = {
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        deleteToDo: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired,
        uncompleteToDo: PropTypes.func.isRequired,
        completeToDo: PropTypes.func.isRequired,
        updateToDo: PropTypes.func.isRequired
    };

    render(){
      const { isEditing, toDoValue } = this.state;
      const { text, id, deleteToDo, isCompleted } = this.props;
       return (
        <View style={styles.container}>
            <TouchableOpacity onPress={this._toggleComplete}>
                <View style={[styles.circle, isCompleted ? styles.completeCircle : styles.uncompleteCircle]}></View>
            </TouchableOpacity>
            {isEditing ? (
                <TextInput style={[styles.text,styles.column]}
                placeholder={"Write Todo"}
                value={toDoValue}
                multiline={true}
                onChangeText={this._controllInput}
                returnKeyType={"done"}
                onBlur={this._finishEditing}></TextInput>
            ):(
                <Text style={[styles.text,styles.column, isCompleted? styles.completeText:styles.uncompleteText]}>
                    {text}
                </Text>
            )}
            {isEditing ?
            (
            <View style={styles.actions}>
                <TouchableOpacity onPressOut={this._finishEditing}>
                    <View style={styles.actionContainer}>
                        <Text style={styles.actionText}>Submit</Text>
                    </View>
                </TouchableOpacity>
            </View>
            ) : (
            <View  style={styles.actions}>
                <TouchableOpacity onPressOut={this._startEditing}>
                    <View style={styles.actionContainer}>
                        <Text style={styles.actionText}>Edit</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPressOut={() => deleteToDo(id)}>
                    <View style={styles.actionContainer}>
                        <Text style={styles.actionText}>Del</Text>
                    </View>
                </TouchableOpacity>
            </View>
            )}
        </View>
       );
    }

    _toggleComplete = () => {
        const { isCompleted, unCompleteToDo, completeToDo, id } = this. props;
        if(isCompleted){
          unCompleteToDo(id);
        }else{
          completeToDo(id);
        }

    }
    _startEditing = () => {
        this.setState({
            isEditing : true
        })
    }
    _finishEditing = () => {
        const { toDoValue } = this. state;
        const {id, updateToDo} = this.props;
        updateToDo( id, toDoValue );
        this.setState({
            isEditing : false
        })
    }
    _controllInput = (text) => {
        this.setState({
            toDoValue : text
        })
    }
}

const styles = StyleSheet.create ({
    container: {
        width:width-50,
        borderBottomColor : "#bbb",
        borderBottomWidth : StyleSheet.hairlineWidth,
        flexDirection:"row",
        alignItems:"center",
        justifyContent: "space-between"
    },
    text: {
        fontWeight : "600",
        marginVertical : 20,
        marginLeft:0,
        fontSize:20
    },
    circle : {
        width:30,
        height:30,
        borderRadius:15,
        borderColor:"red",
        borderWidth:5,
        marginRight:20,
        marginLeft:20
    },
    completeCircle : {
        borderColor : "#bbb"
    },
    uncompleteCircle : {
        borderColor : "#23bddd"
    },
    completeText : {
        color:"#bbb",
        textDecorationLine : "line-through"
    },
    uncompleteText : {
        color:"#353535"
    },
    column:{
        flexDirection : "row",
        alignItems: "center",
        width : width / 2,
        justifyContent: "space-between"
    },
    actions : {
        flexDirection : "row"
    },
    actionContainer : {
        marginVertical:10,
        marginHorizontal:10,
        backgroundColor : "#eee"
    },
    actionText : {

    }
})
