import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './itemCard.css';
import NonVeg from '../images/nonVeg.svg';
import Vegg from '../images/Veg.svg';
import Eggi from '../images/Egg.svg';


const ItemCard = (props) => {

    const showVegOrNonVegImage = (vegOrNonVeg) => {
        if(vegOrNonVeg === "non-veg") {
            return (
                <img src={NonVeg} alt="non-veg"/>
            )
        } else if(vegOrNonVeg === "egg") {
            return(
                <img src={Eggi} alt="egg"/>
            )
        } else {
            return (
                <img src={Vegg} alt="veg"/>
            )
        }
    }

    const showAddToCartButtonOrStatus = () => {
        if(props.itemAvailability) {
            if(props.showAddToCartButton) {
                return(
                    <div className="in-cart">In cart</div>
                    )
            } else {
                return(
                    <Button className="add-to-cart" onClick={ () => {
                            props.addItem({itemId: props.itemId, itemName: props.itemName, itemPrice: props.price, itemQuantity: 1});
                            }}>
                        Add to Cart
                    </Button>
                    )
            }
        } else {
            return(
                <div className="in-cart">Item Unavailable</div>
                )
        }
    }

    const showPrice = () => {
      if(props.itemVolume) {
          if(props.itemVolume.half === 0) {return(<div className="item-price">₹ {props.itemVolume.full}</div>)}
          else { return(<div className="item-price">₹ {props.itemVolume.half}/{props.itemVolume.full}</div>) }
      } else {
          return(null)
      }
  }

    const showSubcategory = () => {
        if(props.itemSubcategory.length > 0) {
            const list = props.itemSubcategory.map((subcategoryItem) =>
            <div key={subcategoryItem._id} className="dropdown-item">
                {subcategoryItem.half ? <li className="row sub-row"><div className="col-8">{subcategoryItem.itemName}</div><div className="col-4 sub-price-col">{subcategoryItem.full}/{subcategoryItem.half}</div></li> : <li className="row sub-row"><div className="col-9">{subcategoryItem.itemName}</div><div className="col-3 sub-price-col">{subcategoryItem.full}/(n.a)</div></li>}
            </div>
            );

            return (
              <div className="subc-drop dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Subcategories
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <div className="dropdown-item row sub-row sub-drop-head">
                      <div className="col-8">Subcategory Name</div><div className="col-4 sub-price-col">Price: ₹ (F/H)</div>
                  </div>
                  {list}
                </div>
              </div>
            );
        } else {
            return(null);
        }
    }

    return (
        <Card className="show-menu-cards" bg="light">
            <Card.Body>
                <Card.Title className="row">
                    <div className="item-name col-lg-5 col-md-6 col-sm-6">{props.itemName} {props.itemAvailability ? null : <i className="fas fa-low-vision na-icon"></i>}</div>
                    <div className="notif-div col-lg-5 col-md-4 col-sm-4">
                      {props.itemStatusNew ? <span className="new-notif item-notif">New</span> : null}
                      {props.itemStatusPopular ? <span className="popular-notif item-notif">Popular</span> : null}
                      {props.itemStatusChefSpecial ? <span className="special-notif item-notif">Special</span> : null}
                    </div>
                    <div className="vnv-id ml-auto">{showVegOrNonVegImage(props.vegOrNonVeg)}</div>
                </Card.Title>
                <Card.Text className="item-description">
                    {props.description}
                </Card.Text>
                <Card.Text  className="item-price">
                    {showPrice()}
                    {showSubcategory()}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                {showAddToCartButtonOrStatus()}
            </Card.Footer>
        </Card>
    );
}

export default ItemCard;
