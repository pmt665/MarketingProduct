import { advertisementSchema } from '../components/Advertisement/AddAdvertisment'

describe('addAdvertisement request validation schema testing',() => {
    it('if Title is not passed should throw an error', async() => {
        let input =  {advertisement: {"advertisement_link": "link","advertisement_asset_path": "path"}};
        let res =  await validate(input);
        expect(res.error.toString()).toMatch('Title is required')
    })
    it('if Link is not passed should throw an error', async() => {
        let input =  {advertisement: {"advertisement_title": 'Ad1',"advertisement_asset_path": "path"}};
        let res =  await validate(input);
        expect(res.error.toString()).toMatch('Link is required')
    })
    it('if path is not passed should throw an error', async() => {
        let input = {advertisement: {"advertisement_title": 'Ad1',"advertisement_link": "link"}} ;
        let res =  await validate(input);
        expect(res.error.toString()).toMatch('Path is required')
    })
});

const validate = async(input) => {
    try{
        let res = await advertisementSchema.validate(input);
        return res;
    }
    catch(err) {
        return { 
            error: err,
            errors: err.errors
        }
    }
}