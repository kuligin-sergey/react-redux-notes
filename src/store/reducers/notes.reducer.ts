import { NoteActions, Note } from "../types/notes";
import * as Action from "../actions/notes.actions";
import * as TagAction from "../actions/tags.actions";
import { NotesState } from "../types/store";
import { arrayMove } from "react-sortable-hoc";

const initialState: NotesState = {
	list: [],
};

const updateNote = (state: NotesState, newNote: Note) => {
	const newList = state.list.map(note =>
		note.id === newNote.id ? newNote : note
	);

	return {
		...state,
		list: newList
	};
}

const createNote = (params: Partial<Note>): Note => {
	const newId = Date.now();
	params = params || {};
	return {
		id: params.id || newId,
		color: "",
		text: "",
		title: new Date(newId).toLocaleString(),
		tags: [],
		...params
	};
};

export function notesReducer(
	state = initialState,
	action: NoteActions
): NotesState {
	switch (action.type) {
		case Action.addNote.type: {
      const newNote = createNote(action.payload);
      return {
          ...state,
          list: [...state.list, newNote]
        };
    }

		case Action.removeNote.type:
			return {
				...state,
				list: [...state.list.filter(n => n.id !== action.payload.id)]
			};

		case Action.updateText.type: {
			const {oldNote, text, oldNote: {tags: oldTags}, newTagsFromText} = action.payload;
			const tags = Array.from(new Set([...oldTags, ...newTagsFromText]));
			return updateNote(state, {...oldNote, text, tags});
		}

		case Action.updateTitle.type: {
			const {oldNote, title} = action.payload;
			return updateNote(state, {...oldNote, title});
		}

		case Action.updateColor.type: {
			const {oldNote, color} = action.payload;
			return updateNote(state, {...oldNote, color});
		}

		case Action.sortNotes.type: {
			const {oldIndex, newIndex} = action.payload;
			return {
				...state,
				list: arrayMove(state.list, oldIndex, newIndex),
			};
		}

		case TagAction.addTagToNote.type: {
			const newList = state.list.map(note =>
        note.id === action.payload.note.id ?
          {
            ...note,
            tags: [...note.tags, { label: action.payload.tag }]
          }
           : note
			);

			return {
				...state,
				list: newList
			};
    }
    
    case TagAction.removeTagFromNote.type: {
			const newList = state.list.map(note =>
        note.id === action.payload.note.id ? 
        { 
          ...note,
          tags: note.tags.filter(tag => tag.label !== action.payload.tag),
        }
          : note
			);

			return {
				...state,
				list: newList
			};
		}

		default:
			return state;
	}
}
