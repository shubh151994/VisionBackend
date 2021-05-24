const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const MyContract = require('./build/contracts/Media.json');
const address = '0xf94238Faa08B82fe6689d605842Fea383FfcFd1A';
const privateKey = 'mechanic fantasy economy improve jacket tuna kiss present pet prepare certain segment';
const infuraUrl = ''; 
const provider = new Provider(privateKey, 
  'https://rinkeby.infura.io/v3/8952eb9e68664ae9854073b73f5cd02e',
  ); 
const web3 = new Web3(provider);

/***struct MediaData {
        // A valid URI of the content represented by this token
        string tokenURI;
        // A valid URI of the metadata associated with this token
        string metadataURI;
        // A SHA256 hash of the content pointed to by tokenURI
        bytes32 contentHash;
        // A SHA256 hash of the content pointed to by metadataURI
        bytes32 metadataHash;
}  ***/

function MediaData(tokenURI, metadataURI, contentHash, metadataHash) {
    this.tokenURI = tokenURI;
    this.metadataURI = metadataURI;
    this.contentHash = contentHash;
    this.metadataHash = metadataHash;
    return this;
}

const param1 =  {'tokenURI':'ipfs://QmeJd2BSSqPupd9rSc6FAq9ocg5X4FCqycjTMpLaMqc3qe', 
                 'metadataURI':'ipfs://QmQBxiLvJwVfhvmKAwKftz1Ua5gns8E4zZeSgQuTbhecg2',
                 'contentHash':'0x6c00000000000000000000000000000000000000000000000000000000000000',
                 'metadataHash':'0x6c00000000000000000000000000000000000000000000000000000000000000'
                };

/*struct BidShares {
        // % of sale value that goes to the _previous_ owner of the nft
        Decimal.D256 prevOwner;
        // % of sale value that goes to the original creator of the nft
        Decimal.D256 creator;
        // % of sale value that goes to the seller (current owner) of the nft
        Decimal.D256 owner;
}*/

function BidShares(prevOwner,creator,owner) {
    this.prevOwner = prevOwner;
    this.creator = creator;
    this.owner = owner;
}

const share = {
  'prevOwner': 1100,
   'creator':'12.00',
   'owner':'13.0'
  };


//Easy way (Web3 + @truffle/hdwallet-provider)
const init1 = async () => {
  console.log("testing-----")

  const networkId = await web3.eth.net.getId();
  const myContract = new web3.eth.Contract(
    MyContract.abi,
    '0xf94238Faa08B82fe6689d605842Fea383FfcFd1A'
  );
 const addr= "0xD4f6Cb0C1Fe07407b7098ac7Fe4265f3B2AE61f2"
 console.log('test----')
  //console.log(await myContract.methods.mint().call());
  //console.log(`Minting NFT: ${await myContract.methods.mint(param1,share).call()}`);
  const receipt = await myContract.methods.mint(param1,['10','11','12']).send({ from: addr });
  //console.log(`Transaction hash: ${receipt.transactionHash}`);
  //console.log(`New data value: ${await myContract.methods.data().call()}`);
}

init1();
  