import React, { useState, useContext } from "react";
import { addOffer } from "../services/offer";
import Errors from "../components/Errors.js";
import { Link } from "react-router-dom";
import AddOffer from "../components/Offer/AddOffer";
import { Context } from "../context";

const AddOfferContainer = () => {
  const [isError, setError] = useState(false);
  const [isofferAdded, setOfferAdded] = useState(false);
  const [state, dispatch] = useContext(Context);

  const handleAddOffer = async (props) => {
    let { offer } = props;
    try {
      const response = await addOffer(offer);
      dispatch({ type: "addOffer", payload: response.data });
      setOfferAdded(true);
    } catch (e) {
      setOfferAdded(false);
      setError(true);
    }
  };

  return (
    <div>
      {isError ? (
        <Errors
          errors={["some Error occured....Please retry after sometime"]}
        />
      ) : (
        <>
          <AddOffer handleSubmit={ handleAddOffer } />
          {isofferAdded && (
            <p>
              offer Added.....
              <Link to="/offers">Click here to see all offers</Link>
            </p>
          )}
        </>
      )}
    </div>
  );
};
export default AddOfferContainer;
