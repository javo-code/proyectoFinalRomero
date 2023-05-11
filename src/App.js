import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ItemDetailContainer from './components/itemDetailContainer/ItemDetailContainer';
import ItemListContainer from './components/itemListContainer/ItemListContainer';
import NavBar from './components/navBar/NavBar';
import Footer from './components/footer/Footer';
import Cart from './components/cart/Cart';
import Checkout from './components/checkout/Checkout';
import CartModal from './components/cartModal/CartModal';
import CheckoutForm from './components/checkoutForm/CheckoutForm';
import { CartProvider } from './components/context/CartContext'; 
import CategoryItemListContainer from './components/categoryItemListContainer/categoryItemListContainer'

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <CartProvider>
        <NavBar />  
        <Routes>
          <Route path='/' element={<ItemListContainer greeting={'BIENVENID@S!'}/>} />
            <Route path='/category/:categoryId' element={<CategoryItemListContainer />} />
            <Route path='/item/:itemId' element={<ItemDetailContainer />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/cartModal' element={<CartModal />} />
            <Route path='/checkoutform' element={<CheckoutForm />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='*' element={<h1>404 NOT FOUND</h1>} />
          </Routes>
      </CartProvider>
      </BrowserRouter>
      <Footer /> 
    </div>
  );
}

export default App;