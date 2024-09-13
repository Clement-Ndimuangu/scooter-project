// require the User and Scooter classes - see where they can be used in ScooterApp.js

const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  // ScooterApp code here
    constructor(){
      this.station = {
        location1: [],
        location2: [],
        location3: []
      };
      this.registeredUser = {}
    }

    registerUser(username, password, age){
      if(!this.registeredUser[username] && age >= 18){
        const newUser = new User(username, password, age)
        this.registeredUser[username] = newUser;
        console.log('user has been registered');
        return newUser;
        
      }else if(this.registeredUser[username]){
        // console.log('already registered');
        console.log(this.registeredUser[username]);
        
        throw new Error("already registered")
      }else{
        throw new Error('too young to register')
      }
    }

    loginUser(username, password){
      for(let key in this.registeredUser){
        if(this.registeredUser[key].username == username){
          this.registeredUser[key].login(password)
          console.log('user has been logged in');
          return;
        }
      }
      throw new Error('Username is incorrect')
    }

    logoutUser(username){
      for(let key in this.registeredUser){
        if(this.registeredUser[key].username == username){
          this.registeredUser[key].logout(username)
          console.log('user is logged out');
          return;
        }
      }
      throw new Error('no such user is logged in')
    }

    createScooter(station){
      const newScooter = new Scooter(station)
      for(let location in this.station){
        if(location == station){
          this.station[location].push(newScooter)
          console.log(`created new scooter`)
          return;
        }
      }
      throw new Error('no such station')
    }

    dockScooter(scooter, station){
      if(scooter.station == station){
        throw new Error("scooter already at station")
      }
      for(let location in this.station){
        if(location == station){
          scooter.dock(station)
          this.station[location].push(scooter)
          console.log(`scooter is docked`)
          return;
        }
      }
      throw new Error('no such station')
    }

    rentScooter(scooter,user){
      for(let location in this.station){
        let dockedScooterArr = this.station[location]
        for(let i = 0; i< dockedScooterArr.length; i++){
          if(dockedScooterArr[i].serial == scooter.serial){
            dockedScooterArr[i].user = user 
            dockedScooterArr.splice(i,1)
            console.log('scooter is rented');
            return;
          }
        }
      }
    }
}

module.exports = ScooterApp
