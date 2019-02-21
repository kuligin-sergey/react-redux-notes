import React, { useState } from "react";
import ChipInput from "material-ui-chip-input";
import { connect } from "react-redux";
import { Chip, withStyles } from "@material-ui/core";
import { Tag } from "../../store/types/tags";
import { green } from '../../shared/constants/colors';

const chipStyle = {
	margin: 1,
	border: "none",
	padding: 0,
	transition: "none",
	backgroundColor: "#fffafa00",
	borderRadius: '50%',
	height: 21,
	'&>:first-child' : {
		paddingLeft: 4,
	}
};

const styles = () => ({
	root: {},
	container: {},
	input: {},
	inputRoot: {
		marginTop: 20,
	},
	chip: {
		...chipStyle,
	},
	filter: {
		...chipStyle,
		backgroundColor: green,
		"&:hover": {
			backgroundColor: `${green} !important`,
		}

	},
});

function TagsInput(props) {
	
	const {
		classes,
		withCount,
		autoFocus,
		value,
		onChange,
		onAdd,
		onDeleteTag,
		deleteTag,
		updateTag,
		tags,
		placeholder,
		canAddTag,
		canClickTag,
		ref,
		...other
	} = props;
	const [inputValue, setInputValue] = useState(value);

	const toggleFilter = (tag: Tag) => {
		tag.filter = !tag.filter;
		updateTag(tag);
	};

	const canAdd = (chip: string) => {
		return canAddTag && !chip.includes(" ") && tags.findIndex(tag => tag.label === chip.trim()) === -1;
	};

	const handleUpdateInput = e => {
		setInputValue(e.target.value.replace(" ", ""));
		onChange && onChange(e);
	};

	const handleAdd = (label: string) => {
		setInputValue("");
		onAdd(label);
	};

	const {root, inputRoot, container, input} = classes;

	return (
		<ChipInput
			classes={{root, inputRoot, input, chipContainer: container}}
			fullWidthInput
			newChipKeyCodes={[13, 32]}
			placeholder={placeholder || "Добавьте тэг..."}
			alwaysShowPlaceholder
			clearInputValueOnChange
			onUpdateInput={handleUpdateInput}
			onChange={onChange}
			onAdd={label => handleAdd(label)}
			onBeforeAdd={tag => canAdd(tag)}
			value={tags}
			inputValue={inputValue}
			inputRef={ref}
			chipRenderer={({ chip }) => (
				<Chip
					key={chip.label}
					label={`#${chip.label}`+ (withCount ? ` (${chip.count})` : ``)}
					className={!chip.filter ? classes.chip : classes.filter}
					onClick={() => canClickTag && toggleFilter(chip)}
					clickable={!!canClickTag}
					onDelete={() => onDeleteTag(chip.label)}
					deleteIcon={<span>x</span>}
				/>
			)}
			{...other}
		/>
	);
}

const styledTagsInput = withStyles(styles)(TagsInput);

export default styledTagsInput;
