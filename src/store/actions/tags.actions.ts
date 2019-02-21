import { ActionCreator } from 'react-redux-typescript';
import * as  TAGS_ACTION from './consts/tags';
import { NoteTagPayload } from '../types/store';

export const addTagToNote
    = new ActionCreator<typeof TAGS_ACTION.ADD_TAG_TO_NOTE, NoteTagPayload>(TAGS_ACTION.ADD_TAG_TO_NOTE);
export const removeTagFromNote 
    = new ActionCreator<typeof TAGS_ACTION.REMOVE_TAG_FROM_NOTE, NoteTagPayload>(TAGS_ACTION.REMOVE_TAG_FROM_NOTE);
export const addTagToFilter 
    = new ActionCreator<typeof TAGS_ACTION.ADD_TAG_TO_FILTER, string>(TAGS_ACTION.ADD_TAG_TO_FILTER);
export const removeTagFromFilter
    = new ActionCreator<typeof TAGS_ACTION.REMOVE_TAG_FROM_FILTER, string>(TAGS_ACTION.REMOVE_TAG_FROM_FILTER);
