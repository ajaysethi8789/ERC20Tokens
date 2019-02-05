pragma solidity ^0.5.2;

contract simplestorage {
  uint public storedData;

  function simplestorage(uint initVal) {
    storedData = initVal;
  }

  function set(uint x) {
    storedData = x;
  }

  function get() pure returns (uint retVal) {
    return storedData;
  }
}

