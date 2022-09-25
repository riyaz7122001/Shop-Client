import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../Store";

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  return (
    <Card>
      <Link style={{ textDecoration: "none" }} to={`/product/${product.slug}`}>
        <img
          style={{ textDecoration: "none" }}
          src={product.image}
          className="card-img-top images-home"
          alt={product.name}
        />
      </Link>
      <Card.Body>
        <Link
          style={{ textDecoration: "none" }}
          to={`/product/${product.slug}`}
        >
          <Card.Title style={{ textDecoration: "none" }}>
            {product.name}
          </Card.Title>
        </Link>
        <Rating
          style={{ textDecoration: "none" }}
          rating={product.rating}
          numReviews={product.numReviews}
        />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <button
            className="login_register_button"
            style={{
              textDecoration: "none",
              width: "auto",
              fontSize: "1.3rem",
            }}
            variant="info"
            onClick={() => addToCartHandler(product)}
          >
            Add to cart
          </button>
        )}
      </Card.Body>
    </Card>
  );
  // return (
  //   <div className="product">
  //     <div className="product_info">
  //       <Card.Body>
  //         <Link to={`/product/${product.slug}`}>
  //           <img
  //             style={{ textDecoration: "none", width: "400px" }}
  //             src={product.image}
  //             className="card-img-top"
  //             alt={product.name}
  //           />
  //         </Link>
  //         <div className="product_rating">
  //           <div style={{ textDecoration: "none" }}>
  //             <span>{product.rating}</span>
  //             <span>{product.numReviews}</span>
  //           </div>
            
  //         </div>
  //       </Card.Body>
  //     </div>
  //   </div>
  // );
}
export default Product;
// {
//   /* <div className="product">
//   <div className="product_info">
//     <p>{title}</p>
//     <p className="product_price">
//       <small>{dollar}</small>&nbsp;
//       <strong>{price}</strong>
//     </p>
//     <div className="product_rating">
//       {Array(rating)
//         .fill()
//         .map((_, i) => (
//           <p>🌟</p>
//         ))}
//     </div>
//   </div>

//   <div className="product_image">
//     <img src={image} alt="" />

//     <button onClick={addToBasket}>Add to Basket</button>
//   </div>
// </div>;
//    */
// }
  