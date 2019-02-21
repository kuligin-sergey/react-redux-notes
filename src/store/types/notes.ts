import * as Actions from '../actions/notes.actions';
import * as TagAction from '../actions/tags.actions'
import { Tag } from './tags';

export interface Note {
	id: number;
	title: string;
	text: string;
	color: string;
	tags: Tag[];
	filtered?: boolean;
}

export type NoteActions = 
	| typeof Actions[keyof typeof Actions]
	| typeof TagAction.addTagToNote 
	| typeof TagAction.removeTagFromNote; 