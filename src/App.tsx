import { createContext, Suspense, useState, useEffect, useContext } from 'react'
import './App.css'
import { InventoryItem, InventoryItemCrates } from './InventoryItemCrates'

export interface crateDataType{
  id:string,
  name:string,
  description:string | null,
  type:string | null,
  first_sale_date:string,
  contains:itemDataType,
  contains_rare:itemDataType,
  market_hash_name:string,
  rental:boolean,
  image:string
  rarity:{
    id:string,
    name:string,
    color:string
  },
}
export interface itemDataType{
  id:string,
  name:string,
  rarity:{
    id:string,
    name:string,
    color:string
  },
  paint_index:string,
  image:string
}

type GlobalContextType = {
  currentCase: string;
  setCurrentCase: React.Dispatch<React.SetStateAction<string>>;
  cratesData:crateDataType[];
  setCratesData: React.Dispatch<React.SetStateAction<crateDataType[]>>;
  currentItemDrop: string;
  setCurrentItemDrop: React.Dispatch<React.SetStateAction<string>>;
};

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

function App() {
  const dataUrl:Record<string,string> = {
    crates:"https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/crates.json",
  }
  const [currentCase,setCurrentCase] = useState("crate-4009");
  const [currentItemDrop,setCurrentItemDrop] = useState("crate-4009");
  const [cratesData,setCratesData] = useState<crateDataType[]>([]);


  useEffect(()=>{
    const apiCrateData = async () => {
      const result = await fetch(dataUrl["crates"]);
      setCratesData(await result.json());
    };
    apiCrateData();

    },[]);




  return (
    <>
    <link rel="stylesheet" href="https://use.typekit.net/aly5duw.css"></link>
    <div id='backgroudImage'></div>
    <div id='backgroudPattern'></div>
    <GlobalContext.Provider value={{currentCase,setCurrentCase,cratesData,setCratesData,currentItemDrop,setCurrentItemDrop}}>
      <div id='simulatorDiv'>
        <ItemList/>
      </div>
      <div id='inventoryBase'>
        <Suspense fallback={<p>Loading...</p>}>
          <InventoryItemCrates page={0}/>
        </Suspense>
      </div>
    </GlobalContext.Provider>
    </>
  )
}

function ItemList() {
  const {currentCase,setCurrentCase,cratesData,setCratesData,currentItemDrop,setCurrentItemDrop} = useContext(GlobalContext);

  if (!cratesData || cratesData.length === 0) {
    return <p>Loading crate info...</p>;
  }

  const items = cratesData.find((element) => {
    return element.id === currentCase;
  }).contains


  return (
    <>
    <div id='openButtonDiv'>
      <button onClick={async ()=>{

        const items = cratesData.find((element) => {
          return element.id === currentCase;
        }).contains

        const itemIDs:string[] = [];

        for (let index = 0; index < items.length; index++) {
          itemIDs.push(items[index].id);
          
        }

        let iterations = ( 10 + Math.random() * (20 - 10))
        
        for (let index = 0; index < iterations ; index++) {
          console.log(0 + Math.floor(Math.random() * (itemIDs.length - 0)))
          setCurrentItemDrop(itemIDs[0 + Math.floor(Math.random() * (itemIDs.length - 0))]);
          await new Promise(resolve => setTimeout(resolve, 1000/((iterations - index))));
          
        }
      }} id='openButton'>
        <p>UNLOCK CASE</p>
      </button>
    </div>

    <div id='allCaseItems'>
      {items.map(crate => (
        <InventoryItem key={crate.id} {...crate} />)

      )}
    </div>
    </>
  );


}

async function chooseWinner() {
  const {currentCase,cratesData,currentItemDrop,setCurrentItemDrop} = useContext(GlobalContext);

  const items = cratesData.find((element) => {
    return element.id === currentCase;
  }).contains

  const itemIDs:string[] = [];

  for (let index = 0; index < items.length; index++) {
    itemIDs.push(items[index].id);
    
  }

  let iterations = ( 10 + Math.random() * (20 - 10))
  
  for (let index = 0; index < iterations ; index++) {
    setCurrentItemDrop(itemIDs[0 + Math.random() * (itemIDs.length - 0)]);
    new Promise(resolve => setTimeout(resolve, 100 * (iterations - index)));
    
  }
}




export default App
