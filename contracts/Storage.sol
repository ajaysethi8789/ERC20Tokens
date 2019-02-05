pragma solidity ^0.5.1;
contract Storage {
  uint256 storedData;
function set(uint256 data) {
    storedData = data;
  }
function get() view returns (uint256) {
    return storedData;
  }
}
