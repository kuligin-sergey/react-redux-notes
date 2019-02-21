import { createStore, Store, Action } from "redux";
import reducer from "./reducer";

import { StoreState } from "./types/store";



let storeInStorage = JSON.parse(localStorage.getItem('state') as any);
let initState = storeInStorage || {};

const store = createStore<StoreState, Action, {}, {}>(
	reducer,
	initState,
	(window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
	(window as any).__REDUX_DEVTOOLS_EXTENSION__()
	);

// window.addEventListener('beforeunload',() => {
// 	const state = store.getState();
// 	localStorage.setItem('state', JSON.stringify(state));
// 	return null;
// })

export default store;
