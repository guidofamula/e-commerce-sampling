import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [totalPrice, setTotalPrice] = useState();
	const [totalQuantities, setTotalQuantities] = useState();
	const [qty, setQty] = useState(1);

	// Kondisi callback untuk barang ditambah 1 qty
	const incQty = () => {
		setQty((prevQty) => prevQty +1);
	}


	// Kondisi callback untuk barang dikurangi 1 qty
	const decQty = () => {
		setQty((prevQty) => {
			if (prevQty -1 < 1) return 1;

			return prevQty -1;
		});
	}

	// System cart ketika user memasukkan barang ke keranjang
	const onAdd = ( product, quantity ) => {
		const checkProductInCart = cartItems.find((item) => item._id === product._id);
		// Rumus menghitung jumlah belanja dengan jumlah quantity
		setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);

		// Rumus menghitung jumlah quantity dari semua belanjaan
		setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

		if(checkProductInCart) {
			// Proses update keterangan, jika setTotalPrice dan setTotalQuantities sudah dilakukan.
			const updatedCartItems = cartItems.map((cartProduct) => {
				if (cartProduct._id === product._id) return {
					...cartProduct,
					quantity: cartProduct.quantity + quantity
				}
			})
			setCartItems(updatedCartItems);
		} else {
			product.quantity = quantity;
			setCartItems([...cartItems, {...product}]);
		}
		// Setting untuk update popup tampilan cart
		toast.success(`${qty} ${product.name} added to the cart.`);
	}

	return (
		<Context.Provider
		value = {{
			showCart,
			cartItems,
			totalPrice,
			totalQuantities,
			qty,
			incQty,
			decQty,
			onAdd
		}}
		>
			{children}
		</Context.Provider>
	);
}

export const useStateContext = () => useContext(Context);