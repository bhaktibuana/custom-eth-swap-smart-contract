pragma solidity ^0.8.9;

interface IBabySwap {
  function name() external view returns (string memory);
  function supplyToken() external returns (uint);
  function balanceOf(address _token) external view returns (uint);
}

contract BabySwap {
  string public name = "Baby Swap";
  address tokenAddress;

  event AddLiquidity(
    address _token,
    uint _amount,
    uint _supply,
    uint _maxBuy
  );

  struct Liquidity {
    uint liquidityAmount;
    uint tokenSupply;
    uint maxBuy;
  }

  mapping(address => Liquidity) public liquidityPool;

  function addLiquidity(
    address _token,
    uint _amount,
    uint _supply,
    uint _maxBuy
  ) public {
    require(_supply == IBabySwap(_token).supplyToken());
    require(msg.sender.balance >= _amount);
    liquidityPool[_token] = Liquidity(_amount, _supply, _maxBuy);
    emit AddLiquidity(_token, _amount, _supply, _maxBuy);
  }

  function setCounterAddr(address _token) public payable {
    tokenAddress = _token;
  }

  function getName(address _token) external view returns(uint) {
    return IBabySwap(tokenAddress).balanceOf(_token);
  }
}