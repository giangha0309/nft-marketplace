// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

struct NFTListing {
    uint256 price;
    address seller;
}

contract NFTMarket is ERC721URIStorage{
    mapping(uint256 => NFTListing) private _listings;

    uint256 private _tokenIDs;

    address private _owner;

    // Declare an event that emits the token ID
    event NFTCreated(uint256 indexed tokenID);

    // if tokenURI is not an empty string => an NFT was created
    // if price is not 0 => an NFT was listed
    // if price is 0 && tokenURI is an empty string => NFT was transferred (either bough, or the listing was canceled)
    event NFTTransfer(uint256 tokenID, address from, address to, string tokenURI, uint256 price);

    constructor() ERC721("Group 4 NFT", "GFNFT") {
        _owner = msg.sender;
    }
    
    function createNFT(string calldata tokenURI) public {
        _tokenIDs += 1;
        _safeMint(msg.sender, _tokenIDs);
        _setTokenURI(_tokenIDs, tokenURI);

        // Emit an event with the new token ID
        emit NFTCreated(_tokenIDs);
        emit NFTTransfer(_tokenIDs, address(0),msg.sender, tokenURI, 0);
    }

    //listNFT
    function listNFT(uint256 tokenID, uint256 price) public {
        require(price > 0, "NFTMarket: price must be greater than 0");
        approve(address(this), tokenID);
        transferFrom(msg.sender, address(this), tokenID);
        _listings[tokenID] = NFTListing(price, msg.sender);
        emit NFTTransfer(tokenID, msg.sender, address(this), "", price);
    }

    //buyNFT
    function buyNFT(uint256 tokenID) public payable {
        NFTListing memory listing = _listings[tokenID];
        require(listing.price > 0, "NFTMarket: nft not listed for sale");
        require(msg.value == listing.price, "NFTMarket: incorrect price");
        ERC721(address(this)).transferFrom(address(this), msg.sender, tokenID);
        clearListing(tokenID);
        payable(listing.seller).transfer(listing.price*95/100);
        emit NFTTransfer(tokenID, address(this), msg.sender, "", 0);
    }

    //cancelListing
    function cancelListing(uint256 tokenID) public {
        NFTListing memory listing = _listings[tokenID];
        require(listing.price > 0, "NFTMarket: nft not listed for sale");
        require(listing.seller == msg.sender, "NFTMarket: you are not the owner");
        transferFrom(address(this), msg.sender, tokenID);
        clearListing(tokenID);
        emit NFTTransfer(tokenID, address(this), msg.sender, "", 0);
    }

    function withdrawFunds() public {
        require(msg.sender == _owner, "NFTMarket: not the contract owner");
        uint256 balance = address(this).balance;
        require(balance > 0, "NFTMarket: balance is zero");
        payable(msg.sender).transfer(balance);
    }

    function clearListing(uint256 tokenID) private {
        _listings[tokenID].price = 0;
        _listings[tokenID].seller = address(0);
    }
}