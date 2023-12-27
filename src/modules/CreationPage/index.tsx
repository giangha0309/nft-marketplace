import classNames from "classnames";
import CreationForm, { CreationValues } from "./CreationForm";
import useSigner from "state/signer";

const CreationPage = () => {
  const { signer } = useSigner ();

  const onSubmit = async (values: CreationValues) => {
    // TODO: create NFT
  };

  return (
    <div
      className={classNames("flex h-full w-full flex-col", {
        "items-center justify-center": !signer,
      })}
    >
      {signer ? <CreationForm onSubmit={onSubmit} /> : "Connect your wallet"}
    </div>
  );
};

export default CreationPage;
