const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')
const Scooter = require('../src/Scooter')

const scooterApp = new ScooterApp()
// ScooterApp tests here
let response;
// register user
describe('registerUser method tests', () => {
  test('Should return instance of User', () => {
    response = scooterApp.registerUser('Joe Bloggs', 'test123', 21)
    expect(response).toBeInstanceOf(User)
  })
  
  test('should throw already registered', ()=>{
    expect(()=>{scooterApp.registerUser('Joe Bloggs', 'test123', 21)}).toThrow('already registered')
  })

  test('should throw too young to register', ()=>{
    expect(()=>{scooterApp.registerUser('John Bloggs', 'test123', 16)}).toThrow('too young to register')
  })
})

// log in
describe('user login tests', ()=>{
  test("user has been loged in", ()=>{
   const consoleSpy = jest.spyOn(console, 'log')
   scooterApp.loginUser('Joe Bloggs', 'test123' )
    expect(consoleSpy).toHaveBeenCalledWith('user has been logged in')
  })

  test("throw error when the username is incorrect", ()=>{
    expect(()=>{scooterApp.loginUser('jones', '9876')}).toThrow('Username is incorrect')
  })
})
// log out

describe('user logout test', ()=>{
  test("user has been loged out", ()=>{
    const consoleSpy = jest.spyOn(console, 'log')
    scooterApp.logoutUser('Joe Bloggs')
     expect(consoleSpy).toHaveBeenCalledWith('user is logged out')
   })

   test("throw error when the username is not loged in", ()=>{
    expect(()=>{scooterApp.logoutUser('jones')}).toThrow('no such user is logged in')
  })   
})
// rent scooter
describe('rent scooter tests', ()=>{
  const newScooterApp = new ScooterApp()
  newScooterApp.createScooter('location2')
  const newScooter = new Scooter('location2')
  newScooter.serial = 1
  const newUser = new User("john",'1234',24)
  

  test('console log scooter is rented', ()=>{
    const consoleSpy = jest.spyOn(console, 'log')
    newScooterApp.rentScooter(newScooter,newUser)
    expect(consoleSpy).toHaveBeenLastCalledWith('scooter is rented')
  })

})
// dock scooter
describe('dock scooter tests', ()=>{

  const newScooter = new Scooter('location1')

  test('log scooter docked', ()=>{
    const consoleSpy = jest.spyOn(console, 'log')
    scooterApp.dockScooter(newScooter, 'location2')
     expect(consoleSpy).toHaveBeenCalledWith('scooter is docked')
  })

  test('scooter already at station', ()=>{
     expect(()=>{scooterApp.dockScooter(newScooter, 'location2')}).toThrow('scooter already at station')
  })
})


