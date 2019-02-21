import { createSelector } from 'reselect'
import { StoreState } from '../store/types/store';

const getTagsByLabel = (state: StoreState) => state.tags.byLabel
const getFilteredLabels = (state: StoreState) => state.tags.filteredLabels

export const getTagsWithCount = createSelector(
  [ getTagsByLabel, getFilteredLabels ],
  (tagsByLabel, filteredLabels) => {
    return filteredLabels.map(label => ({label, count: tagsByLabel[label].count}))
	});