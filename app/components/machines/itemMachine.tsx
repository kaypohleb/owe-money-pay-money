import { Item } from "@/app/globals";
import BigNumber from "bignumber.js";
import { useMemo } from "react";

function ItemMachine({
  items,
  tempItem,
  itemCount,
  taxMode,
  taxValue,
  setTaxMode,
  setTaxValue,
  onItemChange,
  onItemAdd,
  nextStep,
}: {
  items: Array<Item>;
  tempItem: Item;
  itemCount: number;
  taxMode: number;
  taxValue: number;
  setTaxMode: (e: number) => void;
  setTaxValue: (e: number) => void;
  onItemChange: (e: string | number | null, key: string) => void;
  onItemAdd: () => void;
  nextStep: () => void;
}) {
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
    if (taxMode == 10) total = total.times(1.1);
    else if (taxMode != 0) total = total.times(1 + taxValue / 100);
    return total;
  }, [items, taxMode, taxValue]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-[500px] w-full p-4 flex flex-col gap-4 items-center justify-center flex-wrap">
        <div className="flex flex-col gap-4 items-center justify-between  mt-4">
          {items.length > 0 ? <h2>List of items</h2> : null}
          <hr className="w-full border-dotted" />
          <div className="flex flex-col w-full gap-2">
            {items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-6 gap-4 justify-between"
              >
                <span className="col-span-2">{item.name}</span>
                <span className="text-right col-span-2">${item.price}</span>
                <span className="text-right">{item.quantity}</span>
              </div>
            ))}
            <div className="grid grid-cols-6 gap-4 w-full">
              <input
                type="text"
                value={tempItem.name}
                placeholder="Item name"
                className="bg-transparent border-b col-span-3 outline-none py-1"
                onChange={(e) => onItemChange(e.currentTarget.value, "name")}
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
                    onItemChange(e.currentTarget.value, "price");
                  }}
                  onBlur={(e) => {
                    if (e.currentTarget.value == null) onItemChange(0, "price");
                    if (tempItem.price < 0) onItemChange(0, "price");
                    //if number is not 2 decimal places, round to 2 decimal places
                    const rounded = BigNumber(tempItem.price)
                      .decimalPlaces(2)
                      .toNumber();
                    onItemChange(rounded, "price");
                  }}
                />
              </div>
              <input
                type="number"
                placeholder="No."
                value={tempItem.quantity}
                className="bg-transparent border-b outline-none py-1"
                onInput={(e) => onItemChange(e.currentTarget.value, "quantity")}
              />
            </div>
            <button
              className="px-2 py-1 w-full border border-brightlime hover:border-lime-400 active:border-white text-brightlime hover:text-lime-400 active:text-white"
              onClick={onItemAdd}
            >
              Add
            </button>
            {itemCount > 0 ? (
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
            <label htmlFor="10-tax">10%</label>
            <input
              id="10p"
              type="checkbox"
              name="tax"
              className=""
              checked={taxMode == 10}
              onChange={() => {
                setTaxMode(10);
                setTaxValue(10);
              }}
            />
            <label htmlFor="no-tax">No</label>
            <input
              id="no-tax"
              type="checkbox"
              name="tax"
              checked={taxMode == 0}
              onChange={() => {
                setTaxMode(0);
                setTaxValue(0);
              }}
            />
            <label htmlFor="other-tax">Other</label>
            <input
              id="other-tax"
              type="checkbox"
              name="tax"
              checked={taxMode != 0 && taxMode != 10}
              onChange={() => {
                setTaxMode(1);
                setTaxValue(1);
              }}
            />
          </div>
          {taxMode != 0 && taxMode != 10 && (
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
        </div>
        {itemCount > 0 ? (
          <div>
            Total<span className="ml-2">${totalValue.toFixed(2)}</span>
          </div>
        ) : null}
        {itemCount > 0 ? (
          <button
            className="px-2 py-1 w-full border border-brightlime hover:border-lime-400 active:border-white text-brightlime hover:text-lime-400 active:text-white mt-12"
            onClick={nextStep}
          >
            Next
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default ItemMachine;
