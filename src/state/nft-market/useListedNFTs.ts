import { gql, useQuery } from "@apollo/client";
import useSigner from "state/signer";
import { GetOwnedNFTs, GetOwnedNFTsVariables, GetOwnedNFTs_nfts } from "./__generated__/GetOwnedNFTs";
import { NFT } from "./interfaces";
import { ethers } from "ethers";
import { GetOwnedListedNFTs, GetOwnedListedNFTsVariables } from "./__generated__/GetOwnedListedNFTs";
import { parseRawNFT } from "./__generated__/helpers";
import { NFT_MARKET_ADDRESS } from "./config";
import { GetListedNFTs, GetListedNFTsVariables } from "./__generated__/GetListedNFTs";

const useListedNFTs = () => {
  const { address } = useSigner();

  const { data } = useQuery<GetListedNFTs, GetListedNFTsVariables>(
    GET_LISTED_NFTS,
    { variables: { currentAddress: address ?? "" }, skip: !address }
  );
  const listedNFTs = data?.nfts.map(parseRawNFT);

  return { listedNFTs };
};

const GET_LISTED_NFTS = gql`
  query GetListedNFTs($currentAddress: String!) {
    nfts(
      where: {
        to: "${NFT_MARKET_ADDRESS}"
        from_not: $currentAddress
      }
    ) {
      id
      from
      to
      tokenURI
      price
    }
  }
`;

export default useListedNFTs;