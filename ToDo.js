import React, {Component} from "react";
import { View, Text, TouchableOpacity, StyleSheet,Dimensions, TextInput } from "react-native"

const {width, height} = Dimensions.get("window");
export default class ToDo extends Component {

    state = {
        isEditing: false,
        isCompleted : false,
        toDoValue : ""
    };

    render(){
        
        const { isCompleted, isEditing, toDoValue } = this.state;
        const { text } = this.props;

       return (
        <View style={styles.container}>
            <TouchableOpacity onPress={this._toggleComplete}>
                <View style={[styles.circle, isCompleted ? styles.completeCircle : styles.uncompleteCircle]}></View>
            </TouchableOpacity>
            {isEditing ? (
                <TextInput style={styles.text} 
                placeholder={"Write Todo"} 
                value={toDoValue} 
                multiline={true} 
                onChangeText={this._controllInput} 
                returnKeyType={"done"}
                onBlur={this._finishEditing}></TextInput>
            ):(
                <Text style={[styles.text, isCompleted? styles.completeText:styles.uncompleteText]}>
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
                <TouchableOpacity>
                    <View style={styles.actionContainer}>
                        <Text style={styles.actionText}>Del</Text>
                    </View>
                </TouchableOpacity>
            </View>
            )}
        </View>
       );
    }
    // _toggleComplete = () => {
    //     this.setState(prevState => {
    //         return {
    //             isCompleted : !prevState.isCompleted
    //         }
    //     });
    // }
    _toggleComplete = () => {
        this.setState(prevState => {
            return {
                isCompleted : !prevState.isCompleted
            }
        });
    }
    _startEditing = () => {
        const { text } = this.props;
        this.setState({
            isEditing : true,
            toDoValue : text
        })
    }
    _finishEditing = () => {
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