import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      startseconds: 0,
      startminutes : this.props.time,
      //to be able to reset
      get seconds(){
        return this.startseconds
      },
      //to be able to reset
      get minutes() {
        return this.startminutes
      },
      start : false,

      //To display if its a work or break timer
      work : true,
      heading : "WORK TIMER",
    }
  }

  componentDidMount () {
    //console.log(this.state.seconds,this.state.minutes,)
    //this.interval = setInterval(this.decrease, 1000)
    //this only runs once after render

  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  // needed to change the props as per doc. this function is depreceated though need to learn a better solution
  componentWillReceiveProps(nextProps) {
       console.log("called")
       console.log(nextProps)
       //essential to make this comparison
       if(this.props.time !== nextProps.time)
       {
         this.setState({
           startminutes: nextProps.time,
           minutes : nextProps.time,
           seconds : 0,
         });
       }

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
            /*FOR LOOPING PURPOSE*/
            if(previousstate.work)
            {
              this.interval = setInterval(this.decrease, 1000)

              return {
                work : false,
                heading : "BREAK TIMER",
                seconds : previousstate.startseconds,
                minutes : previousstate.startminutes,
                start : true,
              }
            }
            else
            {
              this.interval = setInterval(this.decrease, 1000)

              return {
                work : true,
                heading : "WORK TIMER",
                seconds : previousstate.startseconds,
                minutes : previousstate.startminutes,
                start : true,
              }
            }
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
         <Heading heading = {this.state.heading}/>
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
         <Heading heading = {this.state.heading}/>
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

  },
  heading : {
    fontSize : 70,
    color : "blue",

  }
});


export const Heading = props => (
  <View style = {{marginBottom: 0,}}>
    <Text  style ={styles.heading}>{props.heading}</Text>
  </View>
)
