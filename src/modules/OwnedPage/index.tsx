import NFTCard from "components/NFTCard";
import useNFTMarket from "state/nft-market";

const OwnedPage = () => {
  const { ownedNFTs } = useNFTMarket();
  console.log("ONWED: ", ownedNFTs);
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-wrap">
        {ownedNFTs?.map(nft => <NFTCard nft={nft} className="mr-2"/>)}
      </div>
    </div>
  );
};

export default OwnedPage;
