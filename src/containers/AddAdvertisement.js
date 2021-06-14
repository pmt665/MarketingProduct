import React, { useState, useContext } from "react";
import AddAdvertisment from "../components/Advertisement/AddAdvertisment";
import { addAdvertisement } from "../services/advertisement";
import Errors from "../components/Errors.js";
import { Context } from "../context";
import { Link } from "react-router-dom";

const AddAdvertisementContainer = () => {
  const [state, dispatch] = useContext(Context);
  const [isAdvertisementAdded, setAdvertisementAdded] = useState(false);
  const { offers } = state;
  const [isError, setError] = useState(false);

  const handleAddAdvertisement = async (advertisement) => {
    try {
      await addAdvertisement(advertisement);
      setAdvertisementAdded(true);
    } catch (e) {
      setAdvertisementAdded(false);
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
          <AddAdvertisment
            handleSubmit={ handleAddAdvertisement }
            offers={ offers }
          />
          {isAdvertisementAdded && (
            <p className='padding_all'>
              Advertisement Added.....
              <Link to="/advertisements">Click here to see all advertisements</Link>
            </p>
          )}
        </>
    )}
    </div>
  );
};
export default AddAdvertisementContainer;
