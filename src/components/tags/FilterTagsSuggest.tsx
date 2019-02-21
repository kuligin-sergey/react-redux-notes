import { withStyles } from "@material-ui/core/styles";
import { StoreState } from "../../store/types/store";
import { connect } from "react-redux";
import { addTagToNote, removeTagFromNote, addTagToFilter, removeTagFromFilter } from "../../store/actions/tags.actions";
import TagsSuggest from "./TagsSuggest";
import { green } from "../../shared/constants/colors";
import { getTagsWithCount } from "../../selectors/getTagsWithCount";

const styles = theme => ({
	container: {
		justifyContent: 'center',
	},
	// input: {
	// 	textAlign: 'center',
	// },
	// suggestionsContainerOpen: {
	// },
	root: {
		width: 200
	},
	suggestion: {
		display: "block"
	},
	suggestionsList: {
		margin: 0,
		padding: 0,
		listStyleType: "none"
	},
	chip: {
		backgroundColor: green,
		fontSize: 15,
		padding: 10,
	},
});

const mapStateToProps = (state: StoreState) => {
	return { 
		suggestions: state.tags.allLabels.filter(label => !state.tags.filteredLabels.includes(label)),
		tags: getTagsWithCount(state),
		placeholder: 'Добавьте фильтр...',
		withCount: true,
	 };
};

const dispatchToProps = {
	addTag: addTagToFilter.create,
	deleteTag: removeTagFromFilter.create,
};

const styledTagsSuggest = withStyles(styles as any)(TagsSuggest);

export default connect(
	mapStateToProps,
	dispatchToProps
)(styledTagsSuggest);
