// // import {
// //   time,
// //   loadFixture,
// // } from "@nomicfoundation/hardhat-toolbox/network-helpers";
// // import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
// import { expect } from "chai";
// import { Contract, ContractTransactionResponse} from "ethers";
// import { ethers } from "hardhat";

// describe("NFTMarket", () => {

//   before(async () => {
//     //Deploy the NFTMarket contract
//     const NFTMarket = await ethers.getContractFactory("NFTMarket");
//     const nftMarket = await NFTMarket.deploy();
//     await nftMarket.deploymentTransaction()?.wait(1);
//   });

//   const createNFT = async (tokenURI: string) => {
//     const transaction = await nftMarket.createNFT(tokenURI);
//     const receipt = await transaction.wait();
//     const tokenID = receipt.events[0].args.tokenId;
//     return tokenID;
//   };

//   describe("createNFT", () => {
//     it("Should do something", async () => {
//       //Deploy the NFTMarket contract
//       const NFTMarket = await ethers.getContractFactory("NFTMarket");
//       const nftMarket = await NFTMarket.deploy();
//       await nftMarket.deploymentTransaction()?.wait(1);

//       // Call the create nft function
//       const tokenURI = "https://some-token.uri/";
//       const transaction = await nftMarket.createNFT(tokenURI);
//       await transaction.wait();
      
//       // Assert that the newly created NFT's token uri is the same one sent to the createNFT function
//       const filter = nftMarket.filters.NFTCreated();
//       const events = await nftMarket.queryFilter(filter);
//       const event = events[events.length - 1]; // Get the last event (most recent)
//       const tokenID = event.args.tokenID.toString();
//       const mintedTokenURI = await nftMarket.tokenURI(tokenID);
//       expect(mintedTokenURI).to.equal(tokenURI);

//       // Assert that the owner of the newly created NFT is the address that started the transaction
//       const ownerAddress = await nftMarket.ownerOf(tokenID);
//       const signers = await ethers.getSigners();
//       const currentAddress = await signers[0].getAddress();
//       expect(ownerAddress).to.equal(currentAddress);
//     });
//   });

//   describe("listNFT", () => {
//     const tokenURI = "some token uri";
//     it("should revert if price is zero", async () => {
//       const tokenID = await createNFT(tokenURI);
//       const transaction = nftMarket.listNFT(tokenID, 0);
//       await expect(transaction).to.be.revertedWith(
//         "NFTMarket: price must be greater than 0"
//       );
//     });
//   });
// });
