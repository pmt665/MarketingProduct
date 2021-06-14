const offerReducer = (state, action) => {
    switch (action.type) {
      case "setOffers":
        return { ...state, offers: action.payload };
      case "addOffer":
        return { ...state, offers: [...state.offers, action.payload] };
      default:
        console.log(`Unhandle action: ${action.type}`);
        return state;
    }
};

export default offerReducer