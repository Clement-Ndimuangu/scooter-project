const Scooter = require('../src/Scooter')
const User = require('../src/User')
jest.setTimeout(6000)

// typeof scooter === object
const scooter = new Scooter('location1')
const user = new User('john','test123',24)
describe('scooter object', () => {
  test('Scooter class should create Scooter instance', () => {
    expect(scooter).toBeInstanceOf(Scooter)
    expect(scooter.station).toBe('location1')
    expect(scooter.user).toBe(null)
    expect(scooter.serial).toBe(1)
    expect(scooter.charge).toBe(100)
    expect(scooter.isBroken).toBe(false)
  })
})

// Method tests
describe('scooter methods', () => {
  // tests here!

  // rent method
test('rent out if the `Scooter` is charged above 20% and not broken', ()=>{
  scooter.rent(user)
  expect(scooter.user).toEqual(user)
  scooter.user = null;
})

test('throw error if scooter charge under 20%', ()=>{
  scooter.charge = 18
  expect(()=>{scooter.rent(user)}).toThrow('scooter needs to charge')
  scooter.charge = 100
})

test('throw error if scooter is broken', ()=>{
  scooter.isBroken = true
  expect(()=>{scooter.rent(user)}).toThrow('scooter needs repair')
  scooter.isBroken = false
})
  // dock method
test('Return the scooter to the station.', ()=>{
  scooter.dock('location1')
  expect(scooter.station).toBe('location1')
})

test('clear out the user, so they don’t get charged unfairly',()=>{
  scooter.dock('location1')
  expect(scooter.user).toBe(null)
})

  // requestRepair method
  test("request repair method works", async () => {
    await scooter.requestRepair();

    expect(scooter.isBroken).toBe(false);
});

  // charge method

  test("recharge method works", async () => {
    await scooter.recharge();
    expect(scooter.charge).toBe(100);
});
})
