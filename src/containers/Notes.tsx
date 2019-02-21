import React from 'react'
import NoteList from '../components/notes/NoteList';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { addNote } from './../store/actions/notes.actions';
import { StoreState } from '../store/types/store';
import { addTagToFilter } from '../store/actions/tags.actions';
import FilterTagsSuggest from '../components/tags/FilterTagsSuggest';

const styles = theme => ({
	container: {
		display: 'flex',
		flexDirection: 'row',
		
	},
	left: {
		flex: 'auto',
		height: '100vh',
		overflow: 'auto',
	},
	right: {
		flex: '0 0 250px',
    display: 'flex',
		flexDirection: 'column',
    alignItems: 'center',
	},
	fab: {
		top: 20,
		marginBottom: 120
	},
	filter: {
	}
  });

function Notes({classes, addNote, showFilter, addTagToFilter, filter}) {
  return (
	<div className={classes.container}>
		<div className={classes.left}>
			<NoteList className={classes.container}/>
		</div>
		<div className={classes.right}>
			<Fab
			 	color="primary"
				onClick={addNote}
				aria-label="Add"
				className={classes.fab}
			 >
				<AddIcon />
			</Fab>
				{
					showFilter ?
						<FilterTagsSuggest
							className={classes.filter}
						/>
						: ''
				}
		</div>
	</div>
  )
}

const mapStateToProps = (state: StoreState) => {
	return { 
			filter: state.tags.filteredLabels,
			showFilter: state.tags.allLabels.length,
	 };
};
const mapDispatchToProps = {
	addNote: () => addNote.create({}),
	addTagToFilter: addTagToFilter.create
};
const styledNotes = withStyles(styles as any)(Notes);

export default connect(mapStateToProps,mapDispatchToProps)(styledNotes);
