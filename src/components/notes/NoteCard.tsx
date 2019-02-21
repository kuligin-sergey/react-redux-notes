import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { withStyles } from "@material-ui/core/styles";
import { IconButton, Icon, CardActions, FormLabel } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import * as Actions from "../../store/actions/notes.actions";
import { connect } from "react-redux";
import TagsInput from "../tags/TagsInput";
import { GithubPicker } from "react-color";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import NoteTagsSuggest from "./NoteTagsSuggest";
import { Note } from "../../store/types/notes";
import { green } from "../../shared/constants/colors";
import { Tag } from "../../store/types/tags";
import { SortableHandle } from "react-sortable-hoc";

const cardStyle = {
	maxWidth: 275,
	overflow: "initial",
	margin: 8,
	backgroundColor: '#FFF9C4',
	display: 'inline-block',
};

const styles = {
	card: cardStyle,
	filtered: {
		...cardStyle,
		boxShadow: `0px 0px 20px 3px ${green}`
	},
	content: {
		padding: 7,
		"& > *": {
			marginBottom: 10,
			width: "100%"
		},
		"&:last-child": {
			marginTop: 10,
			paddingBottom: 7
		}
	},
	title: {
		// fontSize: 14,
	},
	actions: {
		cursor: 'grab',
		justifyContent: "space-between",
		padding: 0,
		"& > span" : {
			"& > *": {
				padding: 5
			},
			"& > *:first-child": {
				alignSelf: "start"
			}
		}
	}
};

const Handle = SortableHandle(() => <Icon>drag_handle</Icon>);

function DeleteConfirmation(props): React.ReactElement<any> {
	const { open, onClose, onConfirm, note } = props;

	return (
		<Dialog open={open} onClose={onClose} PaperComponent={Paper}>
			<DialogContent>
				<DialogContentText>Удалить "{note.title}"?</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary">
					Нет
				</Button>
				<Button onClick={onConfirm} color="primary">
					Да
				</Button>
			</DialogActions>
		</Dialog>
	);
}

function getTagLabelsFromText(text: string): string[] {
	const regexp = /\#([\wа-яА-Я]*)/gm; 
	let labels: string[] = [];

	let match = regexp.exec(text);
	while (match != null) {
		const label = match ? match[1] : null;
		label && labels.push(label);
		match = regexp.exec(text);
	}

	return labels;
}

function NoteCard(props: {note: Note, [key:string]: any}) {
	const { note, deleteNote, updateText, updateTitle, updateColor, classes = {} } = props;
	const [bgColor, setBgColor] = useState(note.color);
	const [colorPicker, toggleColorPicker] = useState(false);
	const [confirmation, openConfirmation] = useState(false);
	const [title, setTitle] = useState(note.title);
	const [text, setText] = useState(note.text);

	const colors = [
		"#FFCDD2",
		"#D1C4E9",
		"#B3E5FC",
		"#C8E6C9",
		"#FFF9C4",
		"#FFCCBC",
		"#CFD8DC",
		"#FFF"
	];

	const onColorChange = ({hex: color}: {hex:string}) => {
		updateColor({oldNote: note, color});
		setBgColor(color);
		toggleColorPicker(false);
	};
	const onTitleBlur = (title: string) => {
		updateTitle({oldNote: note, title});
	};
	const onTextBlur = (text: string) => {
		const labelsFromText = getTagLabelsFromText(text);
		const noteTagLabels = note.tags.map(tag => tag.label);
		let newTagsFromText: Tag[]= [];

		newTagsFromText = labelsFromText.reduce((newTags, label) => {
			return noteTagLabels.includes(label) ? newTags : [...newTags, {label}];
		}, newTagsFromText);

		updateText({oldNote: note, text, newTagsFromText});
	};

	const popover = {
		position: "absolute",
		zIndex: 2,
		top: 31,
		left: -3
	};
	const cover = {
		position: "fixed",
		top: "0px",
		right: "0px",
		bottom: "0px",
		left: "0px"
	};

	return (
		<Card className={note.filtered ? classes.filtered : classes.card} style={{ backgroundColor: bgColor }}>
			<CardContent className={classes.content}>
				<TextField
					 value={title}
					 className={classes.title}
					 onChange={e => setTitle(e.target.value)}
					 onBlur={e => onTitleBlur(title)}
					   />
				<TextField
					 value={text}
					 multiline
					 rows={10}
					 onChange={e => setText(e.target.value)}
					 onBlur={e => onTextBlur(text)}
					  />
				<NoteTagsSuggest note={note}/>
			</CardContent>
			<CardActions className={classes.actions} disableActionSpacing>
				<Handle/>
				<span>
					<IconButton onClick={() => toggleColorPicker(!colorPicker)}>
						<Icon fontSize="small">color_lens</Icon>
						{colorPicker ? (
							<div style={popover as any}>
								<div
									style={cover as any}
									onClick={() => toggleColorPicker(!colorPicker)}
								/>
								<GithubPicker
									colors={colors}
									color={bgColor}
									onChange={onColorChange}
								/>
							</div>
						) : null}
					</IconButton>
					<IconButton onClick={() => openConfirmation(true)}>
						<DeleteIcon fontSize="small" />
						<DeleteConfirmation
							note={note}
							open={confirmation}
							onClose={(e) => {e.stopPropagation(); openConfirmation(false);}}
							onConfirm={() => deleteNote(note)}
						/>
					</IconButton>
				</span>
			</CardActions>
		</Card>
	);
}

const mapDispatchToProps = {
	updateText: Actions.updateText.create,
	updateTitle: Actions.updateTitle.create,
	updateColor: Actions.updateColor.create,
	deleteNote: Actions.removeNote.create,
};

const styledNodeItem = withStyles(styles)(NoteCard);
export default connect(
	null,
	mapDispatchToProps
)(styledNodeItem);
