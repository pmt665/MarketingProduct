import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import valueMaps from "../valueMaps";
import { Context } from "../../context";

const Offers = () => {
  const [state, dispatch] = useContext(Context);
  const { offers } = state;

  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Offer Type</th>
            <th>Offer Value</th>
            <th>Activation Date</th>
            <th>End Date</th>
            <th>Article Types</th>
          </tr>
        </thead>
        {offers.map((item) => {
          const {
            offer_type,
            offer_value,
            offer_activation_date,
            offer_end_date,
            offer_article_types,
          } = item;
          let article_types = offer_article_types
            .map((art) => valueMaps.articleTypes[art])
            .join(",");
          return (
            <tbody key={item._id}>
              <tr>
                <td>{valueMaps.offerTypes[offer_type]}</td>
                <td>{offer_value}</td>
                <td>{offer_activation_date}</td>
                <td>{offer_end_date}</td>
                <td>{article_types}</td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
};
export default Offers;
