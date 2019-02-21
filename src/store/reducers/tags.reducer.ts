import * as Action from '../actions/tags.actions';
import * as NotesAction from "../actions/notes.actions";
import { TagsState } from '../types/store';
import { TagActions, Tag } from '../types/tags';

const initialState: TagsState = {
  byLabel: {},
  filteredLabels: [],
  allLabels: [],
};

const removeTags = (state: TagsState, tags: string[]) => {
  let {filteredLabels, byLabel, allLabels} = state;

  tags.forEach(tag => {
    const currentTag = byLabel[tag];
    const count = (currentTag && currentTag.count ? currentTag.count : 1) - 1;
  
    if (count === 0) {
      filteredLabels = filteredLabels.filter(label => label !== tag);
      allLabels = allLabels.filter(label => label !== tag);
      delete byLabel[tag];
    }
    else {
      byLabel = {
        ...byLabel,
        [tag]: {
          ...currentTag,
          count
        }
      }
    }
  });
  
  return  {
    ...state,
    allLabels,
    filteredLabels,
    byLabel,
  };
}

const addTags =(state: TagsState, tags: Tag[]) => {
  return tags.reduce((state, {label}) => {
      const currentTag = state.byLabel[label];
      return {
        ...state,
        allLabels: Array.from(new Set([...state.allLabels, label])),
        byLabel: {
          ...state.byLabel,
          [label]: {
            ...currentTag,
            count: (currentTag && currentTag.count ? currentTag.count : 0) + 1
          }
        },
      };
    }, state);
}

export function tagsReducer(state: TagsState = initialState, action: TagActions): TagsState {
  switch (action.type) {
    case Action.addTagToNote.type: {
      return addTags(state, [{label: action.payload.tag}])
    }
    
    case NotesAction.updateText.type: { 
      return addTags(state, action.payload.newTagsFromText);
    }
    
    case Action.removeTagFromNote.type: { 
      return removeTags(state, [action.payload.tag]);
    }
    
    case NotesAction.removeNote.type: { 
      return removeTags(state, action.payload.tags.map(tag => tag.label));
    }

    case Action.addTagToFilter.type:
      return {
        ...state,
        filteredLabels: [...state.filteredLabels, action.payload],
      };

    case Action.removeTagFromFilter.type:
      return {
        ...state,
        filteredLabels: state.filteredLabels.filter(label => label !== action.payload),
      };
    
    
    default:
      return state;
  }
}
