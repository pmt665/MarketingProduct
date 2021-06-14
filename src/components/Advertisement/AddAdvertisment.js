import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Errors from "../Errors";
import { array, func } from "prop-types";
import * as yup from "yup";
import { Button } from "react-bootstrap";
import valueMaps from "../valueMaps";
import CustomSelect from "../CustomSelect";
import AdvertisementOffer from "./AdvertisementOffer";

export const advertisementSchema = yup
  .object()
  .noUnknown()
  .shape({
    advertisement: yup
      .object()
      .noUnknown()
      .shape({
        advertisement_title: yup.string().required("Title is required"),
        advertisement_link: yup.string().required("Link is required"),
        advertisement_asset_path: yup.string().required("Path is required."),
      }),
  });

const FieldComponent = ({ label, type, id }) => (
  <div className="container">
    <span>{label}</span>
    <Field className="input" id={id} name={id} type={type} />
  </div>
);

const AddAdvertisment = ({ handleSubmit, offers, error }) => {
  const [offerId, setOfferId] = useState("");
  const [offerIdWithArticles, setOfferIdWithArticles] = useState({});

  let offerTypes = offers.map((a) => {
    return {
      value: a._id,
      label: valueMaps.offerTypes[a.offer_type],
    };
  });

  const getArticleTypes = (offerId) => {
    const articleTypes = offers
      .find((v) => v._id === offerId)
      .offer_article_types.map((v) => ({
        value: v,
        label: valueMaps.articleTypes[v],
      }));
      return articleTypes;
  };

  const selectedOffersWithArticles = Object.keys(offerIdWithArticles)
    .map((v) => ({ offer_id: v,  offer_type: offers.find(a => a._id === v).offer_type, article_types: offerIdWithArticles[v]}))
    .filter((v) => v.article_types && v.article_types.length > 0);
  
  return (
    <div className="addOffer">
      <Formik
        initialValues={advertisementSchema.default()}
        validationSchema={advertisementSchema}
        onSubmit={async (values, { setSubmitting, resetForm, setFieldValue }) => {
          const offers = Object.keys(offerIdWithArticles)
            .map((v) => ({
              offer_id: v,
              article_types: offerIdWithArticles[v],
            }))
            .filter((v) => v.article_types && v.article_types.length > 0);
          const finalValues = { ...values.advertisement, offers };
          await handleSubmit(finalValues);
          setSubmitting(false);
          setFieldValue('advertisement.advertisement_title', '')
          setFieldValue('advertisement.advertisement_link', '')
          setFieldValue('advertisement.advertisement_asset_path', '')
          setOfferIdWithArticles({})
          resetForm()
        }}
        render={({ values, isSubmitting, errors, submitCount }) => (
          <Form>
            {(errors || error) &&
              submitCount > 0 &&
              (Object.keys(errors).length > 0 || error) && (
                <Errors
                  errors={[
                    <ErrorMessage
                      key="advertisement.advertisement_title"
                      name="advertisement.advertisement_title"
                    />,
                    <ErrorMessage
                      key="advertisement.advertisement_link"
                      name="advertisement.advertisement_link"
                    />,
                    <ErrorMessage
                      key="advertisement.advertisement_asset_path"
                      name="advertisement.advertisement_asset_path"
                    />,
                    error,
                  ]}
                />
              )}
            <FieldComponent
              id="advertisement.advertisement_title"
              label="Title"
              type="input"
            />
            <FieldComponent
              id="advertisement.advertisement_link"
              label="Link"
              type="input"
            />
            <FieldComponent
              id="advertisement.advertisement_asset_path"
              label="Path"
              type="input"
            />
            <Field
              label="Offer Types"
              name="offer_id"
              component={CustomSelect}
              options={offerTypes}
              value={offerId}
              onChange={(v) => {
                setOfferId(v);
              }}
            />
            {offerId && (
              <Field
                label="Article Types"
                name="article_types"
                component={CustomSelect}
                options={offerId !== 'Select' && getArticleTypes(offerId)}
                onChange={(v) => {
                  setOfferIdWithArticles({
                    ...offerIdWithArticles,
                    [offerId]: v,
                  });
                }}
                multiple={true}
              />
            )}
            {selectedOffersWithArticles &&
              <div>
                <h5>Selected Offers</h5>
                <AdvertisementOffer offers = {selectedOffersWithArticles}/>
              </div>
            }
            <Button type="submit" disabled={isSubmitting}>
              Add Advertisment
            </Button>
          </Form>
        )}
      />
    </div>
  );
};

AddAdvertisment.propTypes = {
  handleSubmit: func,
  offers: array,
};

AddAdvertisment.defaultProps = {
  handleSubmit: () => {},
  offers: [],
};

export default AddAdvertisment;
