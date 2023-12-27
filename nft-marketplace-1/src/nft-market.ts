// import {
//   Approval as ApprovalEvent,
//   ApprovalForAll as ApprovalForAllEvent,
//   BatchMetadataUpdate as BatchMetadataUpdateEvent,
//   MetadataUpdate as MetadataUpdateEvent,
//   NFTCreated as NFTCreatedEvent,
//   NFTTransfer as NFTTransferEvent,
//   Transfer as TransferEvent
// } from "../generated/NFTMarket/NFTMarket"
// import {
//   Approval,
//   ApprovalForAll,
//   BatchMetadataUpdate,
//   MetadataUpdate,
//   NFTCreated,
//   NFTTransfer,
//   Transfer
// } from "../generated/schema"

// export function handleApproval(event: ApprovalEvent): void {
//   let entity = new Approval(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.owner = event.params.owner
//   entity.approved = event.params.approved
//   entity.tokenId = event.params.tokenId

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleApprovalForAll(event: ApprovalForAllEvent): void {
//   let entity = new ApprovalForAll(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.owner = event.params.owner
//   entity.operator = event.params.operator
//   entity.approved = event.params.approved

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleBatchMetadataUpdate(
//   event: BatchMetadataUpdateEvent
// ): void {
//   let entity = new BatchMetadataUpdate(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity._fromTokenId = event.params._fromTokenId
//   entity._toTokenId = event.params._toTokenId

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleMetadataUpdate(event: MetadataUpdateEvent): void {
//   let entity = new MetadataUpdate(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity._tokenId = event.params._tokenId

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleNFTCreated(event: NFTCreatedEvent): void {
//   let entity = new NFTCreated(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.tokenID = event.params.tokenID

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleNFTTransfer(event: NFTTransferEvent): void {
//   let entity = new NFTTransfer(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.tokenID = event.params.tokenID
//   entity.from = event.params.from
//   entity.to = event.params.to
//   entity.tokenURI = event.params.tokenURI
//   entity.price = event.params.price

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleTransfer(event: TransferEvent): void {
//   let entity = new Transfer(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.from = event.params.from
//   entity.to = event.params.to
//   entity.tokenId = event.params.tokenId

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

import { NFTMarket, NFTTransfer } from "../generated/NFTMarket/NFTMarket";
import { NFT } from "../generated/schema";

export function handleNFTTransfer(event: NFTTransfer): void {
  const nft = new NFT(event.params.tokenID.toString());
  nft.to = event.params.to;
  nft.from = event.params.from;
  nft.price = event.params.price;
  const nftMarket = NFTMarket.bind(event.address);
  const tokenURI = nftMarket.tokenURI(event.params.tokenID);
  nft.tokenURI = tokenURI;
  nft.save();
}