import MainHeader from "./components/Layout/MainHeader";
import Routes from "./Routes";
import { Context } from "./context";
import { getOffers } from "./services/offer";
import React, { useEffect, useReducer } from "react";
import offerReducer from '../src/reducer'


function App() {

  const [state, dispatch] = useReducer(offerReducer, { offers: [] });
  const { offers } = state;

  useEffect(() => {
    async function fetchOffers() {
      dispatch({ type: "setOffers", payload: await getOffers() });
    }
    offers.length === 0 && fetchOffers();
  }, []);

  return (
    <Context.Provider value={[state, dispatch]}>
      <div>
        <MainHeader />
        <main>
          <Routes />
        </main>
      </div>
    </Context.Provider>
  );
}

export default App;
