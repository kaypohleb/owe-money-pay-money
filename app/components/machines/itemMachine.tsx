import { Item } from "@/app/globals";
import BigNumber from "bignumber.js";
import { useMemo, useState } from "react";

function ItemMachine({
  items,
  tempItem,
  taxValue,
  serviceCharge,
  setTaxValue,
  setServiceCharge,
  onItemChange,
  onTempItemChange,
  onItemAdd,
  otherCharge,
  setOtherCharge,
  nextStep,
}: {
  items: Array<Item>;
  tempItem: Item;
  taxValue: number;
  serviceCharge: number;
  setTaxValue: (e: number) => void;
  setServiceCharge: (e: number) => void;
  onItemChange: (e: Item, key: number) => void;
  onTempItemChange: (e: string | number | null, key: string) => void;
  onItemAdd: () => void;
  otherCharge: number;
  setOtherCharge: (e: number) => void;
  nextStep: () => void;
}) {
  const [tempEditItem, setTempEditItem] = useState<Item>({
    name: "",
    price: 0,
    quantity: 1,
  });
  const [selItemIndex, setSelItemIndex] = useState(-1);
  const subTotal = useMemo(() => {
    let subTotal = new BigNumber(0);
    items.map((item) => {
      subTotal = subTotal.plus(new BigNumber(item.price).times(item.quantity));
    });
    return subTotal;
  }, [items]);

  const totalValue = useMemo(() => {
    let total = new BigNumber(0);
    items.map((item) => {
      total = total.plus(new BigNumber(item.price).times(item.quantity));
    });
    if (taxValue != 0) total = total.times(1 + taxValue / 100);
    if (serviceCharge != 0) total = total.times(1 + serviceCharge / 100);
    if (otherCharge != 0) total = total.plus(otherCharge);
    return total;
  }, [items, otherCharge, serviceCharge, taxValue]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-[500px] w-full p-4 flex flex-col gap-4 items-center justify-center flex-wrap">
        <div className="flex flex-col gap-4 items-center justify-between  mt-4">
          {items.length > 0 ? <h2>List of items</h2> : null}
          <hr className="w-full border-dotted" />
          <div className="flex flex-col w-full gap-2">
            {items.map((item, index) => {
              return selItemIndex == index ? (
              <div
                key={index}
                className="grid grid-cols-6 gap-4 justify-between"
              >
                <input className="bg-transparent border-b outline-none py-1 w-full col-span-3" value={
                  tempEditItem.name
                } onChange={(e) => onItemChange(
                  {
                    name: e.currentTarget.value,
                    price: tempEditItem.price,
                    quantity: tempEditItem.quantity,
                  }, index)}></input>
                <input
                  type="number"
                  value={tempEditItem.price}
                  className="bg-transparent border-b outline-none py-1 w-full col-span-2 text-right"
                  onChange={(e) => {
                    if (e.currentTarget.value == null) return;
                    onItemChange({
                      name: tempEditItem.name,
                      price: BigNumber(e.currentTarget.value).decimalPlaces(2).toNumber(),
                      quantity: tempEditItem.quantity,
                    }, index);
                  }}
                  onBlur={(e) => {
                    let tempPrice = BigNumber(tempItem.price)
                    .decimalPlaces(2)
                    .toNumber();
                    if (e.currentTarget.value == null) tempPrice = 0;
                    if (tempEditItem.price < 0) tempPrice = 0;
                    //if number is not 2 decimal places, round to 2 decimal places
  
                    onItemChange({
                      name: tempEditItem.name,
                      price: tempPrice,
                      quantity: tempEditItem.quantity,
                    }, index);
                  }}
                />
                <input type="number" value={tempItem.quantity} className="bg-transparent border-b outline-none py-1 w-full text-right" onInput={(e) => onItemChange({
                  name: tempEditItem.name,
                  price: tempEditItem.price,
                  quantity: BigNumber(e.currentTarget.value).decimalPlaces(0).toNumber(),
                }, index)}></input>
              </div>
              ): (
                <div
                key={index}
                className="grid grid-cols-6 gap-4 justify-between"
                onClick={() => {
                  setSelItemIndex(index);
                  setTempEditItem(item);
                }}
              >
                <span className="col-span-3 py-1">{item.name}</span>
                <span className="text-right col-span-2 py-1">${item.price}</span>
                <span className="text-right py-1">{item.quantity}</span>
              </div>
              )    
            })}
            <div className="grid grid-cols-6 gap-4 w-full">
              <input
                type="text"
                value={tempItem.name}
                placeholder="Item name"
                className="bg-transparent border-b col-span-3 outline-none py-1"
                onChange={(e) => onTempItemChange(e.currentTarget.value, "name")}
              />
              <div className="flex gap-1 items-center justify-center col-span-2">
                <span>$</span>
                <input
                  type="number"
                  placeholder="Price"
                  value={tempItem.price}
                  className="bg-transparent border-b outline-none py-1 w-full"
                  onChange={(e) => {
                    if (e.currentTarget.value == null) return;
                    onTempItemChange(e.currentTarget.value, "price");
                  }}
                  onBlur={(e) => {
                    if (e.currentTarget.value == null) onTempItemChange(0, "price");
                    if (tempItem.price < 0) onTempItemChange(0, "price");
                    //if number is not 2 decimal places, round to 2 decimal places
                    const rounded = BigNumber(tempItem.price)
                      .decimalPlaces(2)
                      .toNumber();
                      onTempItemChange(rounded, "price");
                  }}
                />
              </div>
              <input
                type="number"
                placeholder="No."
                value={tempItem.quantity}
                className="bg-transparent border-b outline-none py-1"
                onInput={(e) => onTempItemChange(e.currentTarget.value, "quantity")}
              />
            </div>
            <button
              className="px-2 py-1 w-full border border-brightlime hover:border-lime-400 active:border-white text-brightlime hover:text-lime-400 active:text-white"
              onClick={onItemAdd}
            >
              Add
            </button>
            {items.length > 0 ? (
              <div className="flex justify-between">
                <span>SubTotal</span>
                <span>${subTotal.toFixed(2)}</span>
              </div>
            ) : null}
          </div>
        </div>
        <hr className="w-full border-dotted" />
        <div className="w-full flex flex-col gap-4 items-center">
          <h2>Tax</h2>
          <div className="flex gap-4 items-center">
            <label htmlFor="yes-tax">Yes</label>
            <input
              id="yes-tax"
              type="checkbox"
              name="tax"
              checked={taxValue != 0}
              onChange={() => {
                setTaxValue(10);
              }}
            />
            <label htmlFor="no-tax">No</label>
            <input
              id="no-tax"
              type="checkbox"
              name="tax"
              checked={taxValue == 0}
              onChange={() => {
                setTaxValue(0);
              }}
            />
            
          </div>
          {taxValue != 0 && (
            <div className="flex items-center">
              <input
                className="w-fit bg-transparent border-b border-white outline-none text-right px-2 py-1"
                type="number"
                step="0.5"
                value={taxValue}
                onChange={(e) => setTaxValue(parseFloat(e.target.value))}
                onBlur={() => {
                  if (taxValue < 0) setTaxValue(0);
                  //if number is not 1 decimal place, round to 1 decimal place
                  const rounded = Math.round(taxValue * 10) / 10;
                  setTaxValue(rounded);
                }}
              />
              <span>%</span>
            </div>
          )}
          <hr className="w-full border-dotted" />
          <h2>Service Charge</h2>
          <div className="flex gap-4 items-center">
            <label htmlFor="yes-tax">Yes</label>
            <input
              id="yes-service"
              type="checkbox"
              name="serviceCharge"
              checked={serviceCharge != 0}
              onChange={() => {
                setServiceCharge(10);
              }}
            />
            <label htmlFor="no-service">No</label>
            <input
              id="no-service"
              type="checkbox"
              name="serviceCharge"
              checked={serviceCharge == 0}
              onChange={() => {
                setServiceCharge(0);
              }}
            />
            
          </div>
          {serviceCharge != 0 && (
            <div className="flex items-center">
              <input
                className="w-fit bg-transparent border-b border-white outline-none text-right px-2 py-1"
                type="number"
                step="0.5"
                value={serviceCharge}
                onChange={(e) => setServiceCharge(parseFloat(e.target.value))}
                onBlur={() => {
                  if (serviceCharge < 0) setServiceCharge(0);
                  //if number is not 1 decimal place, round to 1 decimal place
                  const rounded = Math.round(serviceCharge * 10) / 10;
                  setServiceCharge(rounded);
                }}
              />
              <span>%</span>
            </div>
          )}
          <hr className="w-full border-dotted" />
          <h2>Other Charge</h2>
          <div className="flex gap-4 items-center">
            <label htmlFor="yes-other">Yes</label>
            <input
              id="yes-other"
              type="checkbox"
              name="otherCharge"
              checked={otherCharge != 0}
              onChange={() => {
                setOtherCharge(10);
              }}
            />
            <label htmlFor="no-other">No</label>
            <input
              id="no-other"
              type="checkbox"
              name="otherCharge"
              checked={otherCharge == 0}
              onChange={() => {
                setOtherCharge(0);
              }}
            />
            
          </div>
          {otherCharge != 0 && (
            <div className="flex items-center">
              <span>$</span>
              <input
                className="w-fit bg-transparent border-b border-white outline-none text-right px-2 py-1"
                type="number"
                step="0.5"
                value={otherCharge}
                onChange={(e) => setOtherCharge(parseFloat(e.target.value))}
                onBlur={() => {
                  if (otherCharge < 0) setOtherCharge(0);
                  //if number is not 2 decimal place, round to 2 decimal place
                  const rounded = Math.round(otherCharge * 100) / 100;
                  setOtherCharge(rounded);
                }}
              />
            
            </div>
          )}
        </div>
        {items.length > 0 ? (
          <div>
            Total<span className="ml-2">${totalValue.toFixed(2)}</span>
          </div>
        ) : null}
        <button
          className="px-2 py-1 w-full border border-brightlime hover:border-lime-400 active:border-white text-brightlime hover:text-lime-400 active:text-white mt-12"
          onClick={
            items.length > 0
              ? nextStep
              : () => {
                  alert("Please add at least one item");
                }
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ItemMachine;
