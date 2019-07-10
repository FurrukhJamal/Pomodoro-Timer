import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
      seconds : 59,
      minutes : 1,
    }
  }

  componentDidMount () {

    this.interval = setInterval(this.decrease, 1000)


  }

  componentWillUnmount () {
    clearInterval(this.interval)

  }

  decrease =  () => {
    this.setState(previousstate => {
          if(previousstate.seconds === 0)
          {
            return {
              seconds : 59,
              minutes : previousstate.minutes - 1,
            }
          }

          if(previousstate.seconds === 0 && previousstate.minutes === 0 )
          {
            console.log("inside")
            return{
              seconds: 0,
              minutes :0,
            }


          }

              return {seconds: previousstate.seconds - 1}




      }

    )
  }

 render(){
   return (
     <View style={styles.container}>
       <Text style = {{fontSize: 60}}>{this.state.minutes}:{this.state.seconds}</Text>
     </View>
   );
 }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
