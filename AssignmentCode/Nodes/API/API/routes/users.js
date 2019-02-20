var express = require('express');
var router = express.Router();
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
let fs = require("fs");

var abi = [{ "constant": false, "inputs": [{ "name": "newPrice", "type": "uint256" }, { "name": "itemName", "type": "string" }], "name": "setBidPrice", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "price", "type": "uint256" }, { "name": "itemName", "type": "string" }], "name": "setPrice", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": true, "inputs": [{ "name": "itemName", "type": "string" }], "name": "getBidPrice", "outputs": [{ "name": "price", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "itemName", "type": "string" }], "name": "getPrice", "outputs": [{ "name": "price", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "Sponsor", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }];
var address = "0x026ce5d4cf9283184a577ee4b074c6ade75f684f";

var ProductContract = new web3.eth.Contract(abi, address);

/* GET users listing. */
router.post('/deployContract', function (req, res, next) {
  let source = fs.readFileSync("contracts.json");
  let contracts = JSON.parse(source)["contracts"];

  // ABI description as JSON structure
  let abi = JSON.parse(contracts.SampleContract.abi);

  // Smart contract EVM bytecode as hex
  let code = '0x' + contracts.SampleContract.bin;

  // Create Contract proxy class
  let SampleContract = web3.eth.contract(abi);

  // Unlock the coinbase account to make transactions out of it
  console.log("Unlocking coinbase account");
  var password = "";
  try {
    web3.personal.unlockAccount(web3.eth.coinbase, password);
  } catch (e) {
    console.log(e);
    return;
  }


  console.log("Deploying the contract");
  let contract = SampleContract.new({ from: web3.eth.coinbase, gas: 1000000, data: code });

  // Transaction has entered to geth memory pool
  console.log("Your contract is being deployed in transaction at http://testnet.etherscan.io/tx/" + contract.transactionHash);

  // http://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/getPrice', function (req, res, next) {
      console.log("USER-->Get Price API");
  var itemName = req.body.itemName;
  console.log("USER-->Get Price API-->ItemName",itemName);

  ProductContract.methods.getPrice(itemName).send().then(function (result, error) {
    if (error) {
      console.log("Error",error);
      res.send(error);
    }
    else {
      console.log("Get Price API-->Result",result);
      res.send(result);
    }
  })

  });

router.get('/getAPI', function (req, res, next) {
      console.log("USER-->Get API By Ajay");
      res.send("get API Called");
  });



  /* GET users listing. */
  router.get('/getBidPrice', function (req, res, next) {
    console.log("USER-->Get BidPrice API");

    var itemName = req.body.itemName;

    console.log("USER-->Get Price API-->itemName",itemName);

    ProductContract.methods.getBidPrice(itemName).send().then(function (result, error) {
      if (error) {
        console.log("getBidPrice-->Error",error);
        res.send(error);
      }
      else {
        console.log("getBidPrice API-->Result",result);
        res.send(result);
      }
    })

    });

    /* GET users listing. */
    router.post('/setPrice', function (req, res, next) {
      console.log("USER-->setPrice API");
      var itemName = req.body.itemName;
      var itemPrice=parseInt(req.body.itemPrice);

      console.log("USER-->Get BidPrice API-->itemName",itemName);
      console.log("USER-->Get BidPrice API-->itemPrice",itemPrice);

    ProductContract.methods.setPrice(itemPrice,itemName).send().then(function (result, error) {
      if (error) {
        console.log("setPrice-->Error",error);
        res.send(error);
      }
      else {
        console.log("setPrice-->Result",result);
        res.send(result);
      }
    })


    });

    /* GET users listing. */
    router.post('/setBidValue', function (req, res, next) {
      console.log("USER-->setBidValue API");

      var itemName = req.body.itemName;
      var itemPrice=parseInt(req.body.itemPrice);

      console.log("USER-->setBidValue API-->itemName",itemName);
      console.log("USER-->setBidValue API-->itemPrice",itemPrice);

    ProductContract.methods.setBidPrice(itemPrice,itemName).send().then(function (result, error) {
      if (error) {
        console.log("setBidPrice-->Error",error);
        res.send(error);
      }
      else {
        console.log("setBidPrice-->Result",result);
        res.send(result);
      }
    })
    });

    module.exports = router;
