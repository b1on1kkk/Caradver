import { useEffect } from "react";
import { useParams } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getCars } from "../../store/features/getCars.slice";
//

// components
import BiggestH1 from "../../util_components/BiggestH1";
import MainSellerBlock from "../../util_components/MainSellerBlock";
import DetailedCarInf from "../../util_components/DetailedCarInf";
//

// utils
import { FakeArrayGenerator } from "./utils/fakeArray";
import { getRandomInt } from "../../utils/random";
//

export default function Assets() {
  const id = useParams().id;
  let fakeArray: { title: string; value: string; icon: string }[] = [];

  const dispatch = useDispatch<AppDispatch>();
  const cars = useSelector((state: RootState) => state.getCars.cars[0]);

  if (cars) fakeArray = [...FakeArrayGenerator(cars)];

  useEffect(() => {
    dispatch(getCars(`car_id=${id!}`));
  }, [id]);

  return (
    <main className="p-11 flex flex-col gap-9 m-auto w-50">
      {cars && (
        <>
          <header className="flex justify-between">
            <BiggestH1 text={`${cars.brand} ${cars.make}`} />
            <BiggestH1 text={`$ ${cars.price}`} />
          </header>
          <main className="flex gap-6">
            <div className="flex flex-1">
              <img
                src={JSON.parse(cars.pictures)[0]}
                alt={cars.brand}
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col border-2 rounded-2xl">
                <div className="p-6 flex flex-col gap-6">
                  <header className="flex gap-7 items-center">
                    <div className="w-55 h-55 bg-gray-300 rounded-full"></div>
                    <div className="flex flex-col">
                      <div className="text-xl font-bold">Eric Colwell</div>
                      <div className="text-sm font-semibold text-gray-400">
                        Account opening date : {getRandomInt(1, 30)} june,{" "}
                        {getRandomInt(2010, 2023)}
                      </div>
                    </div>
                  </header>
                  <MainSellerBlock
                    first_title="California, USA"
                    second_title="Pro Account"
                    link_text="Visit profile"
                    icon_names={["MapPin", "Zap", "ChevronRight"]}
                    id={id!}
                    to="Seller"
                  />
                </div>

                <footer className="p-8 bg-gray-300 rounded-b-2xl">
                  <div className="flex gap-2">
                    <div>Contact:</div>
                    <MainSellerBlock
                      first_title="+01 213 XXX XX XX"
                      second_title="ericcolwell@gmail.com"
                      link_text="Message the seller"
                      icon_names={["Phone", "Mail", "ChevronRight"]}
                      id={id!}
                      to="MessageSeller"
                    />
                  </div>
                </footer>
              </div>
              <div className="grid grid-cols-2 grid-rows-2 gap-5">
                {fakeArray.map((inf, idx) => {
                  return (
                    <DetailedCarInf
                      text={`${
                        inf.title.charAt(0).toUpperCase() + inf.title.slice(1)
                      }: ${
                        inf.title === "price" ? `$${inf.value}` : inf.value
                      }`}
                      icon_name={inf.icon}
                      key={idx}
                    />
                  );
                })}
              </div>
            </div>
          </main>
          <footer>
            <div className="flex flex-wrap gap-6">
              {JSON.parse(cars.pictures).map((picture: string, idx: number) => {
                return (
                  <div key={idx}>
                    {picture && (
                      <div className="shadow-lg hover:shadow-2xl transition-all duration-200 ease-in hover:-translate-y-1 rounded-lg">
                        <img
                          src={picture}
                          alt={cars.brand}
                          className="rounded-lg object-cover"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </footer>
        </>
      )}
    </main>
  );
}
