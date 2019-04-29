import React from "react";
import { ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Button from "@material-ui/core/Button";
import "../containers/Main.css";

const WegmansModal = ({ toggle, wegData, wegSubmit }) => {
  return (
    <React.Fragment>
      <ModalHeader toggle={this.toggle}>Wegmans Results</ModalHeader>
      <ModalBody className="scrollModal">
        <div className="row align-items-center">
          {wegData.length === 0 ? (
            <React.Fragment>
              <h3 className="p-3 text-center">Product Results</h3>
              <p className="p-3 wait-msg">
                If search items don't show up quickly, Close this modal and try
                again.
              </p>
            </React.Fragment>
          ) : (
            wegData.map((item, index) => {
              // if (item.salePrice) {
              return (
                <p>{item.name}</p>
                // <div key={index} className="col-12 col-md-12 text-center">
                //   <img
                //     src={item.largeImage}
                //     alt={item}
                //     className="img-fluid rounded border border-dark my-2 productImg"
                //   />
                //   <p className="itemName font-weight-bold">{item.name}</p>
                //   {item.shortDescription && (
                //     <p className="itemDesc">
                //       {item.shortDescription.length > 200
                //         ? `${item.shortDescription.slice(0, 200)}...`
                //         : item.shortDescription}
                //     </p>
                //   )}
                //   <p className="itemPrice font-weight-bold">
                //     ${item.salePrice}
                //   </p>
                //   {item.standardShipRate === 0 ? (
                //     <p className="itemShip">FREE SHIPPING</p>
                //   ) : (
                //     <p className="itemShip">
                //       SHIPPING: ${item.standardShipRate}
                //     </p>
                //   )}
                //   <a
                //     target="_blank"
                //     href={item.productUrl}
                //     rel="noopener noreferrer"
                //     className="my-2 mx-1 text-center btn btn-outline-dark"
                //   >
                //     View on wegmans.com
                //   </a>
                //   <a
                //     target="_blank"
                //     href={item.addToCartUrl}
                //     rel="noopener noreferrer"
                //     className="my-2 mx-1 text-center btn btn-outline-dark"
                //   >
                //     Add To Cart
                //   </a>
                //   <button
                //     className="my-2 mx-1 text-center btn btn-dark"
                //     name={item.name}
                //     value={item.salePrice}
                //     onClick={wegSubmit}
                //   >
                //     Add to Budget
                //   </button>
                // </div>
              );
              // }
            })
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="contained" className="button" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </React.Fragment>
  );
};

export default WegmansModal;
