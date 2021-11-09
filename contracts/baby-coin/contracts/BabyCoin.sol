pragma solidity ^0.8.9;

contract BabyCoin {
  string public name = "Baby Coin";
  string public symbol = "BBC";
  address public owner = msg.sender;
  uint public totalSupply = 100000000000000000000000000; // 100 million token
  uint8 public decimals = 18;
  uint public supplyToken;

  event AddHolder(
    address indexed tokenA,
    address indexed tokenB
  );

  event Approval(
    address indexed _owner,
    address indexed _spender,
    uint _value
  );

  event Transfer(
    address indexed _from,
    address indexed _to,
    uint256 _value
  );

  mapping(address => uint) public balanceOf;
  mapping(address => mapping(address => uint)) public allowance;

  constructor() {
    supplyToken = totalSupply / 2;
    balanceOf[address(this)] = supplyToken;
  }

  function addHolder(address _holder) public returns (bool success) {
   require(_holder == owner);
   balanceOf[address(this)] -= supplyToken / 100;
   balanceOf[_holder] += supplyToken / 100;
   emit AddHolder(address(this), _holder);
   return true;
  }

  function approve(uint _value) public returns (bool success) {
    allowance[msg.sender][address(this)] = _value;
    emit Approval(msg.sender, address(this), _value);
    return true;
  }

  function transfer(address _to, uint _value) public returns (bool success) {
    require(balanceOf[address(this)] >= _value);
    balanceOf[address(this)] -= _value;
    balanceOf[_to] += _value;
    emit Transfer(address(this), _to, _value);
    return true;
  }

  function transferFrom(address _from, uint _value) public returns (bool success) {
    require(_value <= balanceOf[_from]);
    require(_value <= allowance[_from][address(this)]);
    balanceOf[_from] -= _value;
    balanceOf[address(this)] += _value;
    allowance[_from][address(this)] -= _value;
    emit Transfer(_from, address(this), _value);
    return true;
  }
}