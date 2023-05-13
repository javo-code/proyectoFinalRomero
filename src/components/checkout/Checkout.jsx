import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import CheckoutForm from '../checkoutForm/CheckoutForm';
import './checkout.css';
import { Timestamp } from 'firebase/firestore';
import { writeBatch, collection, query, where, documentId, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../services/firebase/firebaseConfig';

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [orderContent, setOrderContent] = useState(null);

  const { cart, totalPrice, clearCart } = useContext(CartContext);

  const createOrder = async ({ name, phone, email }) => {
    setLoading(true);
    try {
      const objOrder = {
        buyer: {
          name, phone, email
        },
        items: cart,
        price: totalPrice(),
        date: Timestamp.fromDate(new Date())
      }
      const batch = writeBatch(db);

      const outOfStock = [];

      const ids = cart.map(prod => prod.id);

      const productsRef = collection(db, 'products');

      const producsAddedFromFirestore = await getDocs(query(productsRef, where(documentId(), 'in', ids)));

      const { docs } = producsAddedFromFirestore;

      docs.forEach(doc => {
        const dataDoc = doc.data();
        const stockDb = dataDoc.stock

        const producsAddedToCart = cart.find(prod => prod.id === doc.id);
        const prodQuantity = producsAddedToCart?.quantity

        if (stockDb >= prodQuantity) {
          batch.update(doc.ref, { stock: stockDb - prodQuantity })
        } else {
          outOfStock.push({ id: doc.id, ...dataDoc })
        }
      })

      if (outOfStock.length === 0) {
        await batch.commit()

        const orderRef = collection(db, 'orders');
        const orderAdded = await addDoc(orderRef, objOrder);

        setOrderId(orderAdded.id);
        setOrderContent(objOrder);
        clearCart();
      } else {
        console.error('Hay productos sin stock')
      }

    } catch (error) {
      console.log(error)

    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <h2>Se está generando su orden...</h2>
  }

  if (orderId) {
    return (
      <>
        <h2>El ID de su orden es: {orderId}</h2>
        
        {orderContent && (
          <div>
            <h3>Contenido de la orden:</h3>
            <p> <b>Comprador: </b>{orderContent.buyer.name}</p>
            <p> <b>Teléfono: </b>{orderContent.buyer.phone}</p>
            <p> <b>El comprobante de la operacion fue enviada a: </b>{orderContent.buyer.email}</p>
            <p> <b>Precio total: </b>${orderContent.price}</p>
            <p> <b> Fecha: </b>{orderContent.date.toDate().toLocaleDateString()}</p>
          </div>
        )}
      </>
    );
  }

  return (
    <div className='Form'>
      <CheckoutForm onConfirm={createOrder} />
    </div>
  )
}

export default Checkout;  