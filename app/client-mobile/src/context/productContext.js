import { createContext, useEffect, useReducer } from "react";
import ProductReducer, { initialState } from "../reducer/productReducer";
import { setLocalStorageItem } from "../service/helper";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(ProductReducer, initialState);

/* 	useEffect(() => {
		if (state.products) {
			setLocalStorageItem('products', state.products);
		}
	}, [state.products]); */

	return (
		<ProductContext.Provider value={{ state, dispatch }}>
			{
				children
			}
		</ProductContext.Provider>
	)
}

export default ProductContextProvider;