import { Reducer, AnyAction } from "redux";
import { Note, NoteActions } from "./notes";
import { Tag, TagActions } from "./tags";


export interface NotesState {
    list: Note[],
}

export interface TagsState {
    byLabel: { [label: string] : Tag },
    filteredLabels: string[],
    allLabels: string[],
}

export interface StoreState {
    notes: NotesState,
    tags: TagsState,
}

interface StoreActions {
    notes: NoteActions,
    tags: TagActions,
}

export interface NoteTagPayload {
    tag: string;
    note: Note;
}

export type ReducersMapObjectType = {[P in keyof (StoreState)]: Reducer<StoreState[P], StoreActions[P]> };