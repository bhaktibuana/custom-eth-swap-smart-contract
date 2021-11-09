const { assert } = require('chai');
const BabySwap = artifacts.require("BabySwap");
require('chai').use(require('chai-as-promised')).should();

contract('BabySwap Test', () => {
  let babySwap;

  before(async () => {
    babySwap = await BabySwap.new();
  });

  describe('Contract Deployment', async () => {
    it('Contract has a name', async () => {
      const name = await babySwap.name();
      assert.equal(name, "Baby Swap");
    });

    it('Contract has address', async () => {
      await babySwap.address;
    });
  });

  describe('Test Interaction', async () => {
    let result;

    before(async () => {
      await babySwap.setCounterAddr("0x321D46285f9e7340d4ef9F7336B42579806B0e84");
    });

    it('result hey', async () => {
      result = await babySwap.getName("0x321D46285f9e7340d4ef9F7336B42579806B0e84");
      console.log(result.toString());
    });
    
  });
});