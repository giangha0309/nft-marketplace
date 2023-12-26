// import {
//   time,
//   loadFixture,
// } from "@nomicfoundation/hardhat-toolbox/network-helpers";
// import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { log } from "console";
import { ethers } from "hardhat";

describe("NFTMarket", () => {
  it("Should do something", async () => {
    //Deploy the NFTMarket contract
    const NFTMarket = await ethers.getContractFactory("NFTMarket");
    const nftMarket = await NFTMarket.deploy();
    await nftMarket.deploymentTransaction()?.wait(1);

    // Call the create nft function
    const tokenURI = "https://some-token.uri/";
    const transaction = await nftMarket.createNFT(tokenURI);
    await transaction.wait();
    
    // Assert that the newly created NFT's token uri is the same one sent to the createNFT function
    const filter = nftMarket.filters.NFTCreated();
    const events = await nftMarket.queryFilter(filter);
    const event = events[events.length - 1]; // Get the last event (most recent)
    const tokenID = event.args.tokenID.toString();
    const mintedTokenURI = await nftMarket.tokenURI(tokenID);
    expect(mintedTokenURI).to.equal(tokenURI);

    const ownerAddress = await nftMarket.ownerOf(tokenID);
    const signers = await ethers.getSigners();
    const currentAddress = await signers[0].getAddress();
    expect(ownerAddress).to.equal(currentAddress);
  });
});
