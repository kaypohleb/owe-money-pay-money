"use client";

import { useState } from "react";
import { Item } from "./globals";
import ItemMachine from "./components/machines/itemMachine";
import PeopleMachine from "./components/machines/peopleMachine";
import FoodMachine from "./components/machines/foodMachine";
import SummaryMachine from "./components/machines/summaryMachine";

export default function Home() {
  const [start, setStart] = useState(false);
  const [step, setStep] = useState(0);
  const [items, setItems] = useState<Array<Item>>([]);
  const [itemsShared, setItemsShared] = useState<{
    [key: string]: Array<string>;
  }>({});
  const [peopleShared, setPeopleShared] = useState<{
    [key: string]: Array<string>;
  }>({});
  const [tempItem, setTempItem] = useState<Item>({
    name: "",
    price: 0,
    quantity: 1,
  });
  const [itemCount, setItemCount] = useState(0);
  const [taxMode, setTaxMode] = useState(0);
  const [taxValue, setTaxValue] = useState(0);
  const [people, setPeople] = useState<Array<string>>([]);
  const [tempHost, setTempHost] = useState<string>("");

  function onItemChange(e: string | number | null, key: string) {
    setTempItem((prev) => ({ ...prev, [key]: e }));
  }

  function onItemAdd() {
    if (tempItem.price == 0 || tempItem.quantity == 0) return;
    if (tempItem.name == "") tempItem.name = "Item " + itemCount;
    setItems((prev) => [...prev, tempItem]);
    setTempItem({ name: "", price: 0, quantity: 1 });
    setItemCount((prev) => prev + 1);
    console.log("added");
  }

  function nextStep() {
    setStep((prev) => prev + 1);
  }

  function prevStep() {
    setStep((prev) => prev - 1);
  }

  function getStepMachine() {
    switch (step) {
      case 0:
        return (
          <ItemMachine
            items={items}
            tempItem={tempItem}
            itemCount={itemCount}
            taxMode={taxMode}
            taxValue={taxValue}
            setTaxMode={setTaxMode}
            setTaxValue={setTaxValue}
            onItemChange={onItemChange}
            onItemAdd={onItemAdd}
            nextStep={nextStep}
          />
        );
      case 1:
        return (
          <PeopleMachine
            people={people}
            addPerson={(name: string) => setPeople((prev) => [...prev, name])}
            removePerson={(name: string) =>
              setPeople((prev) => prev.filter((person) => person !== name))
            }
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <FoodMachine
            persons={people}
            items={items}
            peopleShared={peopleShared}
            itemShared={itemsShared}
            setPeopleShared={(e: { [key: string]: Array<string> }) =>
              setPeopleShared(e)
            }
            setItemShared={(e: { [key: string]: Array<string> }) =>
              setItemsShared(e)
            }
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 3:
        return (
          <SummaryMachine
            people={people}
            items={items}
            tax={taxValue}
            peopleShared={peopleShared}
            itemsShared={itemsShared}
          />
        );
    }
  }

  return (
    <main className="w-full min-h-full-footer flex flex-col justify-center items-center p-8 ">
      {start ? (
        getStepMachine()
      ) : (
        <div className="flex flex-col items-center justify-center text-brightlime">
          <hr className="w-full border-brightlime"></hr>
          <pre>{"  $$$$$$$     $$$$$$$$  $$$$$$$$   $$$$$$$$  "}</pre>
          <pre>{" $$     $$   $$  $$     $$     $$ $$  $$     "}</pre>
          <pre>{" $$     $$   $$  $$     $$     $$ $$  $$     "}</pre>
          <pre>{" $$     $$    $$$$$$$$  $$$$$$$$   $$$$$$$$  "}</pre>
          <pre>{" $$     $$       $$  $$ $$            $$  $$ "}</pre>
          <pre>{" $$     $$   $$  $$  $$ $$        $$  $$  $$ "}</pre>
          <pre>{"  $$$$$$$     $$$$$$$$  $$         $$$$$$$$  "}</pre>
          <hr className="w-full border-brightlime"></hr>
          <br />
          <span className="text-gray-400 text-center">
            splitting hairs for a large bill <br /> or just dim sum
          </span>

          <input
            placeholder="enter your name"
            value={tempHost}
            className="my-4 w-full bg-transparent border-b outline-none py-1 text-center text-white"
            onChange={(e) => setTempHost(e.currentTarget.value.toUpperCase())}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setPeople((prev) => [...prev, tempHost]);
                setStart(true);
                return;
              }
            }}
          />
          {tempHost ? (
            <div className="animate-pulse text-white">
              &quot;press enter when done&quot;
            </div>
          ) : null}
        </div>
      )}
    </main>
  );
}
