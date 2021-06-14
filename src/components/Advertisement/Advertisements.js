import React, {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table'
import { getAdvertisements } from '../../services/advertisement';
import AdvertisementOffer from './AdvertisementOffer';

const Advertisements = () => {
    const [advertisements, setAdvertisements] = useState([]);
    useEffect(() => {
       async function fetchAdvertisements(){
        setAdvertisements(await getAdvertisements());
       }
       fetchAdvertisements();
    }, []);

    return(
        <div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th> Link</th>
                        <th>Path</th>
                        {<th>offers</th>}
                    </tr>
                </thead>
                {advertisements.map((item) => {
                    const { advertisement_title, advertisement_link, advertisement_asset_path, offers } = item;
                    return( <tbody key={item._id}>
                            <tr>
                                <td>{advertisement_title}</td>
                                <td><a href={advertisement_link} target='_blank'>click Here</a></td>
                                <td>{advertisement_asset_path}</td>
                                <td>{offers && offers.length > 0 ? <AdvertisementOffer offers ={offers}/> : 'no offer associated'}</td>
                            </tr>
                        </tbody>
                )})}
            </Table>
        </div>
    );
}
export default Advertisements;