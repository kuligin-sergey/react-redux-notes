import * as Actions from '../actions/tags.actions';
import * as NoteAction from '../actions/notes.actions';

export interface Tag {
	label: string;
	color?: string;
	filter?: boolean;
	count?: number;
}

export type TagActions = 
	| typeof Actions[keyof typeof Actions]
	| typeof NoteAction.updateText
	| typeof NoteAction.removeNote; 