import { combineReducers } from "redux";
import { StoreState, ReducersMapObjectType } from "./types/store";
import { notesReducer as notes } from "./reducers/notes.reducer";
import { tagsReducer as tags } from "./reducers/tags.reducer";

const reducerMap: ReducersMapObjectType = {
    notes,
    tags,
};

export default combineReducers<StoreState>(reducerMap);