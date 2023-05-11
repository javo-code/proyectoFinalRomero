import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./cartItem.css";

const CartItem = ({ id, img, name, price, quantity, category }) => {
  const { removeItem } = useContext(CartContext);

  const handleRemove = () => {
    removeItem(id);
  };

  return (
    <main>
      <div className="container">
        <div className="row mt-3">
          <div className="col">
            <h2 className="d-flex justify-content-center mb-3">
              Realizar Compra
            </h2>
            <form id="procesar-pago" method="POST">
              <div id="carrito" className="form-group table-responsive">
                <table className="table" id="lista-compra">
                  <thead>
                    <tr>
                      <th scope="col">Imagen</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Precio</th>
                      <th scope="col">Cantidad</th>
                      <th scope="col">Sub Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>
                        <img src={img} alt="" />
                      </td>
                      <td>{name}</td>
                      <td>$ {price}</td>
                      <td>{quantity}</td>
                      <td>$ {price * quantity}</td>
                      <td>
                        <button
                          className="btn btn-danger botonEliminar"
                          onClick={handleRemove}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="row justify-content-center d-none" id="spinner">
                <div className="spinner">
                  <div className="dot1"></div>
                  <div className="dot2"></div>
                </div>
              </div>

              <div className="row justify-content-between">
                <div className="col-md-4 mb-2">
                  <Link
                    to="/"
                    className="btn btn-success btn-block btn-kepBuying"
                  >
                    Seguir comprando
                  </Link>
                </div>

                <div className="col-xs-12 col-md-4">
                  <div className="col-md-4 mb-2">
                    <Link
                      to="/cartModal"
                      className="btn btn-info btn-block btn-kepBuying"
                    >
                      Ver resumen
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartItem;
