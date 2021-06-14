import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Errors from "../Errors";
import { func } from "prop-types";
import * as yup from "yup";
import valueMaps from "../valueMaps";
import { Button } from "react-bootstrap";
import CustomSelect from "../CustomSelect";

export const offerSchema = yup
  .object()
  .noUnknown()
  .shape({
    offer: yup
      .object()
      .noUnknown()
      .shape({
        offer_type: yup.string().required('offerType is required').oneOf(Object.keys(valueMaps.offerTypes)),
        offer_value: yup.number("should be number").when("offer_type", {
          is: (val) => val !== "2",
          then: yup.number().required("offer value is required"),
          otherwise: yup.number().notRequired().default(0),
        }),
        offer_activation_date: yup
          .date()
          .min(
            new Date(),
            "ActivationDate should be today or greater than today."
          )
          .required("Activation Date is required."),
        offer_end_date: yup
          .date()
          .test(
            "endate-check",
            "End Date should be greater than activation date",
            function (value, ctx) {
              let { offer_activation_date } = ctx.parent;
              return !(
                typeof value !== "undefined" &&
                new Date(value) <= new Date(offer_activation_date)
              );
            }
          )
          .required("End Date is required."),
        offer_article_types: yup
          .array(yup.string())
          .min(1, "select at least one article Type")
          .default([])
      }),
  });

const FieldComponent = ({ label, type, id }) => (
  <div className="container">
    <span>{label}</span>
    <Field className="input" id={id} name={id} type={type} />
  </div>
);

const AddOffer = ({ handleSubmit, error }) => (
  <div className="addOffer">
    <Formik
      initialValues={offerSchema.default()}
      validationSchema={offerSchema}
      onSubmit={async (values, { setSubmitting, resetForm, setFieldValue }) => {
        await handleSubmit(offerSchema.cast(values));
        setSubmitting(false);
        setFieldValue('offer.offer_activation_date', '')
        setFieldValue('offer.offer_end_date', '')
        setFieldValue('offer.offer_value', '')
        setFieldValue('offer_article_types', '')
        resetForm();
      }}
      render={({ values, isSubmitting, errors, submitCount }) => (
        <Form>
          {(errors || error) &&
            submitCount > 0 &&
            (Object.keys(errors).length > 0 || error) && (
              <Errors
                errors={[
                  <ErrorMessage
                    key="offer.offer_type"
                    name="offer.offer_type"
                  />,
                  <ErrorMessage
                    key="offer.offer_value"
                    name="offer.offer_value"
                  />,
                  <ErrorMessage
                    key="offer.offer_activation_date"
                    name="offer.offer_activation_date"
                  />,
                  <ErrorMessage
                    key="offer.offer_end_date"
                    name="offer.offer_end_date"
                  />,
                  <ErrorMessage
                    key="offer.offer_article_types"
                    name="offer.offer_article_types"
                  />,
                  error,
                ]}
              />
            )}
          <Field
            label="Select Offer Type"
            name="offer.offer_type"
            component={CustomSelect}
            options={valueMaps.offerTypes}
          />
          <FieldComponent
            id="offer.offer_value"
            label="Offer Value"
            type="input"
          />
          <FieldComponent
            id="offer.offer_activation_date"
            label="Activation Date"
            type="date"
          />
          <FieldComponent
            id="offer.offer_end_date"
            label="End Date"
            type="date"
          />
          <Field
            label="Article Types"
            name="offer.offer_article_types"
            component={CustomSelect}
            options={valueMaps.articleTypes}
            multiple={true}
          />
          <Button type="submit" disabled={isSubmitting}>
            AddOffer
          </Button>
        </Form>
      )}
    />
  </div>
);

AddOffer.propTypes = {
  handleSubmit: func,
};

AddOffer.defaultProps = {
  handleSubmit: () => {},
};

export default AddOffer;
