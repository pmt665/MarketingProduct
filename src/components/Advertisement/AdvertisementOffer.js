import valueMaps  from '../valueMaps'

const AdvertisementOffer = (props) => {
    const { offers } = props;

    return(
        offers.map(offer => {
            let { offer_id, offer_type : offerType , article_types } = offer;
            offerType = valueMaps.offerTypes[offerType]
            let articleTypes = article_types.map(art => valueMaps.articleTypes[art]).join(',');
            return(
                <li key={offer_id}>{offerType} ({articleTypes})</li>
            )
        })
    )
}
export default AdvertisementOffer;