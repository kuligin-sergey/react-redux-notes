import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import { withStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { Tag } from "../../store/types/tags";

const styles = (theme: Theme) => { 
	return ({
		root: {
			display: "flex",
			justifyContent: "center",
			flexWrap: "wrap",
			padding: theme.spacing.unit / 2,
		},
		chip: {
			margin: theme.spacing.unit / 2,
		},
	});
};

type TagsListState = Readonly<{tags: Tag[]}>;

class TagsList extends React.Component<TagsListState, TagsListState> {
	state: TagsListState;

	constructor(props: TagsListState) {
		super(props)
		this.state = {tags: props.tags};
	}

	public handleDelete = (tag: Tag) => () => { 
		this.setState((state) => {
			const tags = [...state.tags];
			const tagToDelete = tags.indexOf(tag);
			tags.splice(tagToDelete, 1);
			return { tags };
		});
	}

	public render() {
		const { classes } = this.props as any;

		return (
			<Paper className={classes.root}>
				{this.state.tags.map((tag) => {
					return (
						<Chip
							key={tag.label}
							label={tag.label}
							onDelete={this.handleDelete(tag)}
							className={classes.chip}
						/>
					);
				})}
			</Paper>
		);
	}
}

export default withStyles(styles as any)(TagsList);
