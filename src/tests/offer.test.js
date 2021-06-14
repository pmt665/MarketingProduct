import { offerSchema } from '../components/Offer/AddOffer'

describe('addOffer request validation schema testing',() => {
    it('if offerType is not passed should throw an error', async() => {
        let input = {offer: {"offer_value": 6,"offer_activation_date": "2021-06-30","offer_end_date": "2021-07-12","offer_article_types": ["1"]}};
        let res =  await validate(input);
        expect(res.error.toString()).toMatch('offerType is required')
    })
    it('if offerType is either(1-percentage,3-fixedAmount) and offer value is not passed then offer value is required error is thrown.', async() => {
        let input = {offer: {"offer_type":"1", "offer_activation_date": "2021-06-30","offer_end_date": "2021-07-12","offer_article_types": ["1", "2"]}};
        let res =  await validate(input);
        expect(res.error.toString()).toMatch('offer value is required')
    })
    it('if activation_date is missing should throw an error.', async() => {
        let input = {offer: {"offer_type":"1","offer_value": "5","offer_end_date": "2021-07-12","offer_article_types": ["1", "2"]} };
        let res =  await validate(input);
        expect(res.error.toString()).toMatch('Activation Date is required')
    })
    it('if activation_date is not a valid date  should throw an error.', async() => {
        let input = {offer: {"offer_type":"1","offer_value": "5","offer_activation_date": 'date' , "offer_end_date": "2021-07-12","offer_article_types": ["1", "2"]} };
        let res =  await validate(input);
        expect(res.error.toString()).toMatch('offer_activation_date must be a `date` type')
    })
    it('if end_date is less than activation_date should throw an error.', async() => {
        let input = {offer: {"offer_type":"1","offer_value": "5","offer_activation_date": '2021-06-30', "offer_end_date": "2021-06-11","offer_article_types": ["1", "2"]}};
        let res =  await validate(input);
        expect(res.error.toString()).toMatch('End Date should be greater than activation date')
    })
    it('if offer_article_types is not passed as an array should not throw an error.', async() => {
        let input = {offer: {"offer_type":"1","offer_value": "5","offer_activation_date": '2021-07-12', "offer_end_date": "2021-08-11", 'offer_article_types': '1'}};
        let res =  await validate(input);
        expect(res.error.toString()).toMatch('offer_article_types must be a `array` type')
    })
    it('if all correct values are passed schema should pass', async() => {
        let d = new Date();
        d.setDate(d.getDate() + 5);
        let input = {offer: {"offer_type":"1","offer_value": 5,"offer_activation_date": new Date(), "offer_end_date": d, 'offer_article_types': ['1','2']}};
        let res =  await validate(input);
        expect(res).toBe(input)
    })
})
const validate = async(input) => {
    try{
        let res = await offerSchema.validate(input);
        return res;
    }
    catch(err) {
        return { 
            error: err,
            errors: err.errors
        }
    }
}