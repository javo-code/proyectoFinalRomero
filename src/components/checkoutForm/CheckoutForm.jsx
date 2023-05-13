import { useState } from "react";
import { Link } from 'react-router-dom';
import './checkoutForm.css'

const CheckoutForm = ({ onConfirm }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleConfirm = (event) => {
    event.preventDefault();

    const userData = {
      name,
      phone,
      email,
    };
    onConfirm(userData);
  };
  return (
    <div className="Container">
      <form onSubmit={handleConfirm} className="Form">
        <label htmlFor="name" className="Label">Nombre:
          <input
            className="Input"
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </label>
        <label htmlFor="phone" className="Label">Celular:
          <input
            className="Input"
            type="number"
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </label>
        <label htmlFor="email" className="Label">E-mail:
          <input
            className="Input"
            type="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </label>
        <div className="label label-submit">
          <button href='../checkout/Checkout.jsx' type="submit" className="Button">
            <Link
              to="/checkout"
              className="btn btn-block btn-kepBuying"
            >
              Crear Orden
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;