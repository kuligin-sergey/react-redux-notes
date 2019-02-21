import { createSelector } from 'reselect'
import { StoreState } from '../store/types/store';

const getNotes = (state: StoreState) => state.notes.list
const getFilteredLabels = (state: StoreState) => state.tags.filteredLabels

export const getNotesWithFilterSettings = createSelector(
  [ getNotes, getFilteredLabels ],
  (notes, filteredLabels) => {
    return notes.map(note => {
		let filtered = false;
		const tags = note.tags.map(tag => {
			const filter = filteredLabels.includes(tag.label);
			filtered = filtered || filter;
			return {
				...tag,
				filter,
			}
		});

		return {
			...note,
			tags,
			filtered,
		}
	})
  }
)