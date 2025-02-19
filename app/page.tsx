"use client";

import { ChangeEvent, useState } from "react";
import { Item } from "./globals";
import ItemMachine from "@components/machines/itemMachine";
import PeopleMachine from "@components/machines/peopleMachine";
import FoodMachine from "@components/machines/foodMachine";
import SummaryMachine from "@components/machines/summaryMachine";
import { runOCRish } from "./gemini";

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
  const [taxValue, setTaxValue] = useState(0);
  const [receiptLoading, setReceiptLoading] = useState(false);
  const [serviceCharge, setServiceCharge] = useState(0);
  const [otherCharge, setOtherCharge] = useState(0);
  const [people, setPeople] = useState<Array<string>>([]);

  function handleImageChange(e: ChangeEvent<HTMLInputElement>){
    if(!e.target.files) return;
    const file = e.target.files[0];
    setReceiptLoading(true);
    runOCRish(file).then((res) => {
      console.log(res);
      const re = /\{(.*)\}/gm
      const matches = res.match(re);
      console.log(matches)
      if(!matches) return;
      const newItems: Array<Item> = [];
      matches.map((match) => {
        const temp = JSON.parse(match);
        
        const itemList = temp["items"];
        if(!itemList) return;
        itemList.map((item: {name: string, price: number}) => {
          newItems.push({name: item.name, price: item.price, quantity: 1});
        });
      });
      setReceiptLoading(false);
      setItems(newItems);
      setItemCount((prev) => prev + newItems.length);
      setStart(true);
    });
}

  function onItemChange(e: Item, key: number) {
    setItems((prev) => {
      prev[key] = e;
      return prev;
    });
  }

  function onTempItemChange(e: string | number | null, key: string) {
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
            taxValue={taxValue}
            serviceCharge={serviceCharge}
            setTaxValue={setTaxValue}
            setServiceCharge={setServiceCharge}
            onItemChange={onItemChange}
            onTempItemChange={onTempItemChange}
            otherCharge={otherCharge}
            setOtherCharge={setOtherCharge}
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
          <br />
          { receiptLoading ? <span className="text-brightlime">Loading...</span> : 
          (
            <div className="flex flex-col items-center justify-center">
              <button className="px-2 py-2 w-full border border-brightlime hover:border-lime-400 active:border-white text-brightlime hover:text-lime-400 active:text-white mb-4" onClick={() => setStart(true)}>
              Start
              </button>
            <label htmlFor="image-upload" className="px-2 py-2 w-full border border-brightlime hover:border-lime-400 active:border-white text-brightlime hover:text-lime-400 active:text-white text-center">
              Receipt Upload
            </label>
            <input id="image-upload" type="file" accept="image/*"  className="hidden"
              onChange={(e) => handleImageChange(e)}/>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
