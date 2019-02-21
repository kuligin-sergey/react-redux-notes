import { withStyles } from "@material-ui/core/styles";
import { StoreState } from "../../store/types/store";
import { connect } from "react-redux";
import { addTagToFilter, removeTagFromFilter, removeTagFromNote } from "../../store/actions/tags.actions";
import TagsSuggest from "../tags/TagsSuggest";
import { addTagToNote } from './../../store/actions/tags.actions';

const styles = () => ({
	container: {
		flexGrow: 1,
		position: "relative",
	},
	suggestionsContainerOpen: {
		position: "absolute",
		width: '100%',
		zIndex: 1,
	},
	suggestionsList: {
		margin: 0,
		padding: 0,
		listStyleType: "none"
	},
	root: {
		width: "100%",
		position: 'relative',
	}
});

const mapStateToProps = (state: StoreState, {note}) => {
	return { 
		suggestions: state.tags.allLabels.filter(label => !note.tags.map(tag => tag.label).includes(label)),
		canAddTag: true,
		canClickTag: true,
		tags: note.tags,
	};
};

const dispatchToProps = (dispatch, {note}) => {
	return {
		addTag: tag => dispatch(addTagToNote.create({tag, note})),
		deleteTag: tag => dispatch(removeTagFromNote.create({tag, note})),				 
		updateTag: ({filter, label}) => filter ?
			 dispatch(addTagToFilter.create(label))
			  : dispatch(removeTagFromFilter.create(label)),					 
	}
};

const styledTagsSuggest = withStyles(styles as any)(TagsSuggest);

export default connect(
	mapStateToProps,
	dispatchToProps
)(styledTagsSuggest);
