import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Timer, {Heading} from "./pomodorotimer";


export default class App extends React.Component {
  constructor(){
    super()
    this.state ={
      timer : 2
    }
  }
  timer2 = ()=>{
    console.log("inside 2")
    this.setState({
      timer : 2,
    })
  }

  timer5 = ()=> {
    console.log("inside 5")
    this.setState({
      timer : 5,
    })
  }

 render(){
   return(
     <View style = {styles.container}>
     <View style = {styles.options}>
       <Text style = {{fontSize : 20}}>Options</Text>
       <View style = {styles.button}>
          <View style= {{margin : 10}}>
            <Button  title = "2 mins" onPress = {this.timer2}/>
          </View>
          <View  style= {{margin : 10}}>
            <Button title = "5 mins" onPress = {this.timer5}/>
          </View>
       </View>


     </View>
        <Timer time= {this.state.timer} />


     </View>


   )

 }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  options : {
    flex: 1,
    alignItems: 'center',
    backgroundColor : "red",
    justifyContent: 'center',

  },
  button : {
    flexDirection : "row",

  }

});
