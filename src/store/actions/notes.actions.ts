import { ActionCreator } from 'react-redux-typescript';
import { Note } from '../types/notes';
import * as NOTES_ACTION from './consts/notes';
import { Tag } from '../types/tags';


export const addNote 
    = new ActionCreator<typeof NOTES_ACTION.ADD_NOTE, Partial<Note>>(NOTES_ACTION.ADD_NOTE);
export const removeNote 
    = new ActionCreator<typeof NOTES_ACTION.DELETE_NOTE, Note>(NOTES_ACTION.DELETE_NOTE);
export const updateColor 
    = new ActionCreator<typeof NOTES_ACTION.UPDATE_COLOR, {oldNote: Note, color: string}>(NOTES_ACTION.UPDATE_COLOR);
export const updateText 
    = new ActionCreator<typeof NOTES_ACTION.UPDATE_TEXT, {oldNote: Note, text: string, newTagsFromText: Tag[]}>(NOTES_ACTION.UPDATE_TEXT);
export const updateTitle 
    = new ActionCreator<typeof NOTES_ACTION.UPDATE_TITLE, {oldNote: Note, title: string}>(NOTES_ACTION.UPDATE_TITLE);
export const sortNotes 
    = new ActionCreator<typeof NOTES_ACTION.SORT_NOTES, {oldIndex: number, newIndex: number}>(NOTES_ACTION.SORT_NOTES);


