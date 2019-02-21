import React from "react";
import { Note } from "../../store/types/notes";
import NoteCard from "./NoteCard";
import { StoreState } from "../../store/types/store";
import { connect } from "react-redux";
import { getNotesWithFilterSettings } from "../../selectors/getTagsForNote";
import { SortableElement, SortableContainer } from "react-sortable-hoc";
import { withStyles } from "@material-ui/core";
import { sortNotes } from "../../store/actions/notes.actions";

const styles = {
	notes: {
		display: 'flex',
		flexFlow: 'row wrap',
		alignItems: 'center',
	}
};

const NoteCardItem = SortableElement<any>(({note}) => {
	return (
			<NoteCard key={note.id} note={note} />
	);
  });


const NoteList = SortableContainer<any>((props: any) => {
	const notes = props.notes.map((note: Note, index) => 
		<NoteCardItem index={index} key={note.id} note={note} />
	);

	return <div className={props.classes.notes}>{notes}</div>;
})

const mapStateToProps = (state: StoreState) => {  
	return { 
		notes: getNotesWithFilterSettings(state),
		distance: 5,
		axis: 'xy'
	 };
};

const mapDispatchToProps = {
	onSortEnd: sortNotes.create,
}


const styledNoteList = withStyles(styles as any)(NoteList);

export default connect(mapStateToProps, mapDispatchToProps)(styledNoteList);
