import { Item } from "@/app/globals";
import { useState } from "react";

function FoodMachine({
  persons,
  items,
  peopleShared,
  itemShared,
  setPeopleShared,
  setItemShared,
  prevStep,
  nextStep,
}: {
  persons: Array<string>;
  items: Array<Item>;
  peopleShared: { [key: string]: Array<string> };
  itemShared: { [key: string]: Array<string> };
  setPeopleShared: (e: { [key: string]: Array<string> }) => void;
  setItemShared: (e: { [key: string]: Array<string> }) => void;
  prevStep: () => void;
  nextStep: () => void;
}) {
  const [curPersonIndex, setCurPersonIndex] = useState(0);
  const [curSelection, setCurSelection] = useState<Array<string>>([]);

  function setNextPerson() {
    const newShared = { ...itemShared };
    curSelection.forEach((selection) => {
      if (!newShared[selection]) newShared[selection] = [];
      newShared[selection].push(persons[curPersonIndex]);
    });

    const updatedPeopleShared = { ...peopleShared };
    updatedPeopleShared[persons[curPersonIndex]] = curSelection;
    setPeopleShared(updatedPeopleShared);

    setItemShared(newShared);

    setCurSelection([]);
    if (curPersonIndex == persons.length - 1) nextStep();
    setCurPersonIndex((prev) => (prev + 1) % persons.length);
  }

  function back() {
    if (curPersonIndex - 1 < 0) prevStep();
    setCurPersonIndex((prev) => (prev - 1 + persons.length) % persons.length);
  }

  return (
    <div className="max-w-[500px] flex flex-col gap-4 w-full">
      <div className="text-center ">Pick out what you are sharing</div>
      <div className="text-center ">{persons[curPersonIndex]}&apos;s turn</div>
      {items.map((item: Item) => {
        return (
          <button
            key={item.name}
            className="flex flex-col items-start justify-center p-2"
            style={{
              color: curSelection.includes(item.name) ? "lime" : "white",
              outline: curSelection.includes(item.name)
                ? "2px solid lime"
                : "none",
            }}
            onClick={() => {
              if (curSelection.includes(item.name)) {
                setCurSelection((prev) =>
                  prev.filter((selection) => selection !== item.name)
                );
                return;
              }
              setCurSelection((prev) => [...prev, item.name]);
            }}
          >
            <div className="flex gap-4 items-center justify-between w-full">
              <span>{item.name}</span>
              <span>{item.price}</span>
            </div>
            {itemShared[item.name]
              ? itemShared[item.name].map((person, idx) => {
                  return (
                    <span
                      key={"p" + idx}
                      className="px-2 py-1 bg-brightlime text-black text-sm"
                    >
                      {person}
                    </span>
                  );
                })
              : null}
          </button>
        );
      })}
      <div className="w-full flex justify-between items-center gap-4 mt-12">
        <button
          className="px-2 py-1 w-full border border-brightlime hover:border-lime-400 active:border-white text-brightlime hover:text-lime-400 active:text-white"
          onClick={back}
        >
          Back
        </button>
        <button
          className="px-2 py-1 w-full border border-brightlime hover:border-lime-400 active:border-white text-brightlime hover:text-lime-400 active:text-white"
          onClick={setNextPerson}
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default FoodMachine;
