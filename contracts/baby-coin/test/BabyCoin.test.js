const { assert } = require('chai');
const BabyCoin = artifacts.require("BabyCoin");
require('chai').use(require('chai-as-promised')).should();

contract('BabyCoin Test', () => {
  let babyCoin;

  before(async () => {
    babyCoin = await BabyCoin.new();
  });

  describe('Contract Deployment', async () => {
    it('Contract has a name', async () => {
      const name = await babyCoin.name();
      assert.equal(name, "Baby Coin");
    });

    it('Contract has symbol', async () => {
      const symbol = await babyCoin.symbol();
      assert.equal(symbol, "BBC");
    });

    it('Contract has address', async () => {
      const address = await babyCoin.address;
      assert.exists(address);
    });

    it('Contract has owner', async () => {
      const owner = await babyCoin.owner();
      assert.exists(owner);
    });
  });

  describe('Token Burn', async () => {
    let totalSupply, result;

    before(async () => {
      totalSupply = await babyCoin.totalSupply();
    })

    it('Burn the token', async () => {
      const supplyToken = await babyCoin.supplyToken();
      assert.equal(supplyToken, totalSupply / 2);
    });
    
    it('Token has balance', async () => {
      const balance = await babyCoin.balanceOf(babyCoin.address);
      assert.equal(balance, totalSupply / 2);
    });

    it('Add token holder', async () => {
      result = await babyCoin.addHolder("0x9c5b5C31744107Bca4887115c1077aa1DbFeb139");
      const holderBalance = await babyCoin.balanceOf("0x9c5b5C31744107Bca4887115c1077aa1DbFeb139");
      const tokenBalance = await babyCoin.balanceOf(babyCoin.address);
      assert.exists(holderBalance);
      assert.exists(tokenBalance);
    });
  });
});