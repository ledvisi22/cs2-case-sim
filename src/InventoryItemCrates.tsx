import { useContext, useEffect, useState } from "react";
import type { crateDataType } from "./App";
import { GlobalContext } from "./App";

export function InventoryItemCrates({page}:{page:number}) {
  const {cratesData,setCratesData} = useContext(GlobalContext);


    const CrateDivs = cratesData.slice(page, page+800).map(crate => (
    <InventoryItem key={crate.id} {...crate} />
  ));

  return (
  <>
    {CrateDivs}
  </>);

}

export function InventoryItem(Data: crateDataType) {
  const {currentCase,setCurrentCase,currentItemDrop,setCurrentItemDrop} = useContext(GlobalContext);

  let buttonStart:React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

  const isCaseType =
  Data.type === "Case" ||
  Data.type === "Sticker Capsule" ||
  Data.type === "Souvenir" ||
  Data.type === "Autograph Capsule";

  let className = "";
  let onClick = undefined;

  if (currentCase === Data.id) {
    className = "selected";
    onClick = () => setCurrentCase(Data.id);
  } else if (isCaseType) {
    onClick = () => setCurrentCase(Data.id);
  } else if (currentItemDrop === Data.id) {
    className = "selectedWinner";
  }

  return (
    <>
    <div className="itemSlot">
      <button style={{borderBottomColor:Data.rarity.color}} className={className} onClick={onClick}>
        <div
          title={Data.name}
          id={Data.id}
          className="ItemStyle"
          style={{ backgroundImage: `url(${Data.image})` }}
        ></div>
      </button>
      <p>{Data.type}</p>
      <p>{Data.name}</p>
    </div>
    </>
  );
}

