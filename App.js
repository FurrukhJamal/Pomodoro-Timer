import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
      startseconds: 0,
      startminutes : 2,
      get seconds(){
        return this.startseconds
      },
      get minutes() {
        return this.startminutes
      },
      start : false,
    }
  }

  componentDidMount () {
    //console.log(this.state.seconds,this.state.minutes,)
    //this.interval = setInterval(this.decrease, 1000)


  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  decrease =  () => {
    console.log("interval running")
    this.setState(previousstate => {
          //let seconds = parseInt(previousstate.seconds)
          if(previousstate.seconds === 0 && previousstate.minutes !== 0)
          {
            return {
              seconds : 59,
              minutes : previousstate.minutes - 1
            }
          }

          if(this.state.seconds === 0 && this.state.minutes === 0 )
          {
            console.log("inside")
            /*return{
              seconds: 0,
              minutes :0,
            }*/
            clearInterval(this.interval)
          }
          if(previousstate.seconds > 0)
          {

            return {
                seconds: previousstate.seconds - 1,
                minutes: previousstate.minutes
                      }
        }

      }

    )
  }

  addzero(value){
    value = String(value)
    if(value.length < 2)
    {
      value = "0" + value
    }
    return value
  }

  startstop = () => {
    if(!this.state.start)
    {
        this.interval = setInterval(this.decrease, 1000)
    }
    else
    {
      clearInterval(this.interval)
    }
    console.log(this.state.start)
    this.setState( previousstate =>({
      start: !previousstate.start
    }))
  }

  reset = () => {
    clearInterval(this.interval)
    this.setState({
      seconds : this.state.startseconds,
      minutes: this.state.startminutes,
      start: false,
    })
  }


 render(){
   if(!this.state.start)
   {
     return (
       <View style={styles.container}>
         <Text style = {{fontSize: 60}}>{this.addzero(this.state.minutes)}:{this.addzero(this.state.seconds)}</Text>
         <View style={styles.controls}>
         <View style={styles.buttons}>
           <Button  title = "Start" onPress = {this.startstop}/>
         </View>
         <View style={styles.buttons}>
           <Button title = "Reset" onPress = {this.reset} />
         </View>
         </View>


      </View>
     );
   }
   else
   {
     return (
       <View style={styles.container}>
         <Text style = {{fontSize: 60}}>{this.addzero(this.state.minutes)}:{this.addzero(this.state.seconds)}</Text>
         <View style={styles.controls}>
          <View style={styles.buttons}>
            <Button  title = "Pause" onPress = {this.startstop}/>
          </View>
          <View style={styles.buttons}>
            <Button title = "Reset" onPress = {this.reset} />
          </View>
        </View>

      </View>
     );
   }


 }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },

  controls : {
    flexDirection : "row",
    
    width : 200,
    alignItems: 'center',
    justifyContent : "space-evenly",
  },

  buttons : {

    width : 85,
    margin : 10,

  }
});
