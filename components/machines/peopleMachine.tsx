import { useState } from "react";

function PeopleMachine({
  people,
  addPerson,
  removePerson,
  prevStep,
  nextStep,
}: {
  people: Array<string>;
  addPerson: (name: string) => void;
  removePerson: (name: string) => void;
  prevStep: () => void;
  nextStep: () => void;
}) {
  const [tempHost, setTempHost] = useState<string>("");
  const [tempPerson, setTempPerson] = useState<string>("");
  return people.length > 0 ? (<div className="max-w-[500px] flex flex-col gap-4 w-full">
      {people.map((person, index) => {
        return (
          <div
            key={index}
            className="grid grid-cols-5 gap-2 items-center"
            style={{
              color: index == 0 ? "lime" : "white",
            }}
          >
            <span className="col-span-4">{person}</span>
            {index == 0 ? (
              <span className="border text-white text-center">Payer</span>
            ) : (
              <button
                onClick={() => removePerson(person)}
                className="border border-red-500 text-red-500 text-center"
              >
                x
              </button>
            )}
          </div>

        );
      })}
      <div className="grid grid-cols-5 items-center w-full gap-2">
        <input
          type="text"
          value={tempPerson}
          placeholder="Person name"
          className="bg-transparent border-b outline-none py-1 w-full col-span-4"
          onChange={(e) => setTempPerson(e.currentTarget.value.toUpperCase())}
          onKeyDown={(e) => {
            if (e.key === "Enter" && tempPerson.length > 0) {
              addPerson(tempPerson);
              setTempPerson("");
              return;
            }
          }}
        />
        <button
          className="px-2 py-1 border border-brightlime hover:border-lime-400 active:border-white text-brightlime hover:text-lime-400 active:text-white"
          onClick={() => {
            addPerson(tempPerson);
            setTempPerson("");
          }}
        >
          Add
        </button>
      </div>
      <div className="flex items-center justify-between w-full mt-12">
        <button
          className="px-2 py-1 w-full border border-brightlime hover:border-lime-400 active:border-white text-brightlime hover:text-lime-400 active:text-white"
          onClick={prevStep}
        >
          Previous Step
        </button>
        <button
          className="px-2 py-1 w-full border border-brightlime  hover:border-lime-400 active:border-white text-brightlime hover:text-lime-400 active:text-white"
          onClick={
            people.length > 1
              ? nextStep
              : () => {alert("Please add more people");}
          }
        >
          Next Step
        </button>
      </div>
    </div> ):(
      <div>
        <input
            placeholder="enter Payer's name"
            value={tempHost}
            className="my-4 w-full bg-transparent border-b outline-none py-1 text-center text-white"
            onChange={(e) => setTempHost(e.currentTarget.value.toUpperCase())}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
              addPerson(tempHost);
                
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
    );
}

export default PeopleMachine;
