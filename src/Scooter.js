class Scooter {
  // scooter code here

  static nextSerial = 1;
  constructor(station){
    this.station = station;
    this.user = null;
    this.serial = Scooter.nextSerial;
    Scooter.nextSerial++;
    this.charge = 100;
    this.isBroken = false;
  }

  rent(user){
    if(this.charge > 20 && this.isBroken == false){
      this.station = null;
      this.user = user
    }else if(this.charge < 20){
      throw new Error('scooter needs to charge')
    }else{
      throw new Error('scooter needs repair')
    }
  }

  dock(station){
    this.station = station;
    this.user = null
  }

  async recharge(){  
    await new Promise(resolve => {setTimeout(()=>{
      resolve(this.charge = 100) 
      console.log(this.charge);
      
    
    }, 3000)});
  }

  async requestRepair(){
    await new Promise(resolve =>{
      setInterval(()=>{
        resolve(this.isBroken = false)
        console.log('repair completed');
        
      }, 3000)
    })
  }
}

module.exports = Scooter
