import { Item } from "@/app/globals";
import BigNumber from "bignumber.js";
import { useMemo } from "react";

function SummaryMachine({
  people,
  items,
  tax,
  peopleShared,
  itemsShared,
}: {
  people: Array<string>;
  items: Array<Item>;
  tax: number;
  peopleShared: { [key: string]: Array<string> };
  itemsShared: { [key: string]: Array<string> };
}) {
  const sharedItemPricePerPerson = useMemo(() => {
    const tempItemListPerPerson: { [key: string]: number } = {};
    people.map((person) => {
      tempItemListPerPerson[person] = 0;
      console.log(person, peopleShared[person]);
      peopleShared[person].map((item) => {
        if (itemsShared[item].length == 0) return;
        const tempItem = items.find((e) => e.name == item);
        if (!tempItem) return;
        tempItemListPerPerson[person] = BigNumber(tempItemListPerPerson[person])
          .plus(BigNumber(tempItem.price).dividedBy(itemsShared[item].length))
          .multipliedBy(100 + tax)
          .dividedBy(100)
          .toNumber();
      });
    });
    return tempItemListPerPerson;
  }, [items, itemsShared, people, peopleShared, tax]);

  return (

      <div
        
        className="max-w-[500px] w-full p-4 flex flex-col gap-4 items-center justify-center flex-wrap"
      >
        <div>Payee Summary</div>
        <hr className="w-full mb-6" />
        {people.map((person, index) => {
          if (!index) return null;
          return (
            <div key={person} className="w-full flex flex-row justify-between">
              <span>{person}</span>
              <span>{sharedItemPricePerPerson[person].toFixed(2)}</span> 
            </div>
          );
        })}
      <button
        className="mt-4 px-2 py-1 border border-brightlime hover:border-lime-400 active:border-white text-brightlime hover:text-lime-400 active:text-white"
        onClick={() => {
          //create Text
          let text = `Pay to ${people[0]}\n`;
          text += `Horizontal: ${sharedItemPricePerPerson[people[0]].toFixed(2)}\n`;
          people.map((person, index) => {
            if (index == 0) return null;
            text += `${person} : ${sharedItemPricePerPerson[person].toFixed(2)}\n`;
          });
          //copy to clipboard
          navigator.clipboard.writeText(text);
        }}
      >
        Copy Text
      </button>
    </div>
  );
}

export default SummaryMachine;
