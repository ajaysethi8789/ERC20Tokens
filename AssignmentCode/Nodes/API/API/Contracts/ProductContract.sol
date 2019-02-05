pragma solidity ^0.4.24;

contract ProductContract {
  
  mapping (string => uint) itemPrice;
  mapping (string => uint) bidPrice;
  address public Sponsor;
  
  constructor() public{
        Sponsor = msg.sender;
    }
    
    modifier onlySponsor(){
        require(msg.sender == Sponsor);
        _;
    }

  function setPrice(uint price, string itemName) public{
    itemPrice[itemName] = price;
  }

  function getPrice(string itemName) constant public returns (uint price) {
    return itemPrice[itemName];
  }
  
  function setBidPrice(uint newPrice, string itemName) public{
      require(itemPrice[itemName] !=0);
      bidPrice[itemName]= newPrice;
     
  }
  
  function getBidPrice(string itemName) onlySponsor constant public returns(uint price){
      return bidPrice[itemName];
      
  }
}
