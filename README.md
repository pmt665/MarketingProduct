### Marketing Product

An application which allows user to add offer, view offers, add advertisement and also an option to link offer with it and view advertisements.

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To Run Test Suite:  

`npm test`  

To Run App:

`npm start`

Runs the app in the development mode.
This will automatically launch your browser with Hot Module Reload running. Saved changes to file in src/ will automatically reload the page.

To Visit App:

`localhost:3000`  

To build for production:

`npm run build`

Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!
    
### Project Structure

```bash
├── README.md                         <-- This instructions file
├── src                               <-- Source code
│   └──components
|      └──Advertisement
|      |  ├── AddAdvertisement.js    <-- This component is used for adding an advertisement and linking an offer with it (specific articleTypes of an offer can be |      |                                   linked to the advertisement and as well as multiple offers can also be linked.
|      |  |── AdvertisementOffer.js  <-- A reusable component to display what offers and article types are linked to the advertisement.
|      |  |── Advertisements.js      <--  To view all the added advertisements.
|      └──Offer
|      |  ├── AddOffer.js            <-- To add an offer.
|      |  |── Offers.js              <-- To view all the added offers.
|      └──Layout
|      |  ├── MainHeader.js          <-- To display the header on the top
|      |  |── MainHeader.module.css
|      └──containers
|      |  ├── AddAdvertisement.js    <-- This container renders 'addAdvertisement' component  and executes API once the form is submitted.
|      |  |── AddOffer.js            <-- This container renders 'addOffer' component and executes API once the form is submitted.
|      └──services
|      |  ├── advertisement.js        <-- API calls for advertisement
|      |  |── offer.js                <-- API calls for offer
|      └──tests
|      |  ├── advertisement.test.js   <-- tests of advertisement
|      |  |── Offer.testjs            <-- tests of offer
|.     └──customSelect.js             <-- reusable custom select component.
|      └──Errors.js                   <-- errors component which is rendered if any error occur
|      └──NotFound.js                 <-- This component is rendered if user tries to navigate to that page which does not exist.
|      └──valueMaps.js                <-- enums used to populate offerTypes and articleTypes 
|      └──App.js                      <-- Main app file (which uses context) 
|      └──index.js                    <-- renders app.js
|      └──Routes.js                   <-- all the routes used for this project defind this file
|      └──reducer.js                  <-- reducer to maintain state for offers data which is used in different components.
|      └──context.js                  <-- global store
|      └──styles.css                  <-- styling file

```

## Routes

1) 'add-offer' - To add an offer
2) 'offer' - To view all offers
3) 'add-advertisement' - To add an advertisement
4) 'advertisements' - To view all advertisements


## Validations
Following validations are fired on add-offer page:

1) All the fields are required except offerValue which can be 0 if offerType is (freeShipping).
2) offer_activation_date should be today or greater than today and should be date value.
3) offer_end_date cannot be less than and same as of offer_activation_date.
4) offer_type can have only one of the values as('1','2', '3') as they are validated against enum 'offerTypes'
5) offer_article_types should be array and can also have values only ranging in between 1-3 as they are also validated against enum 'articleTypes'

Following validations are fired on the add-advertisement page:

1) All the fields are required except offers array.
2) if offers array is passed it should have {offer_id : string, article_types : array[string]}.Either of them missing gives valdiation error.
3) if invalid offer_id is passed or articles does not belong to the same offer an error is thrown.

### Tools and Technologies
react, contexthook, useEffect, useState, yup, formik, bootstrap, react-router
