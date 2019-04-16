import React from "react";
import Grid from "@material-ui/core/Grid";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Button from "@material-ui/core/Button";
import "../containers/Main.css";

const WalmartModal = props => {
  return (
    <Grid container justify="center">
      <Modal
        style={{ marginTop: 80 }}
        isOpen={props.modal}
        // toggle={() => props.toggle()}
        className={props.className}
        id="modalContainer"
      >
        <ModalHeader toggle={props.toggle}>Walmart Results</ModalHeader>
        <ModalBody className="scrollModal">
          <div className="row align-items-center">
            {props.itemImages.length === 0 ? (
              <React.Fragment>
                <h3 className="p-3 text-center">Product Results</h3>
                <p className="p-3 wait-msg">
                  If search items don't show up quickly, Close this modal and
                  try again.
                </p>
              </React.Fragment>
            ) : (
              props.itemImages.map((item, index) => {
                return (
                  <div key={index} className="col-12 col-md-12 text-center">
                    <img
                      src={item.largeImage}
                      alt={item}
                      className="img-fluid rounded border border-dark my-2 productImg"
                    />
                    <p className="itemName font-weight-bold">{item.name}</p>
                    <p className="itemPrice font-weight-bold">
                      ${item.salePrice}
                    </p>
                    <a
                      target="_blank"
                      href={item.productUrl}
                      rel="noopener noreferrer"
                      className="m-2 text-center btn btn-outline-dark"
                    >
                      View on Walmart.com
                    </a>
                    <button
                      className="m-2 text-center btn btn-dark"
                      name={item.name}
                      value={item.salePrice}
                      onClick={props.handleWalmartSubmit}
                    >
                      Add to Budget
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="contained"
            className="button"
            onClick={props.toggle()}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </Grid>
  );
};

export default WalmartModal;
