pragma solidity ^0.5.0;


contract Auction {

      address public manager;
      address payable public seller;
      uint public latestBid;
      address payable latestBidder;

  constructor() public {
    manager = msg.sender;
  }

  function auction(uint bid) public {
    latestBid = bid * 1 ether; //1000000000000000000;
    seller = msg.sender;
  }

  function bid() public payable {
    require(msg.value > latestBid);

     latestBidder.transfer(latestBid);

    latestBidder = msg.sender;
    latestBid = msg.value;
  }

  function finishAuction() restricted public {
    seller.transfer(address(this).balance);
  }

  modifier restricted() {
    require(msg.sender == manager);
    _;
  }
}
