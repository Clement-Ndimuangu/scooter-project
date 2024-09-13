const User = require('../src/User')

const user = new User('Joe Bloggs', 'test123', 21)

// User tests here
describe('User property tests', () => {
  // test username
  test('username should be a string', () => {
    expect(typeof user.username).toBe('string')
  })
  // test password
  test('user password should be a string', ()=>{
    expect(typeof user.password).toBe('string')
  })
  // test age
  test('user age should be a number', ()=>{
    expect(typeof user.age).toBe('number')
  })
})

describe('user method tests', ()=>{
  // test login
  test('user should be able to login with right password', ()=>{
    user.login('test123')
    expect(user.loggedIn).toBe(true)
  })

  test('login throw error when wrong password is put', ()=>{
    expect(()=>{user.login('test456')}).toThrow('incorrect password')
  })
  // test logout
  test('user should be able to logout', ()=>{
    user.logout()
    expect(user.loggedIn).toBe(false)
  })
})

