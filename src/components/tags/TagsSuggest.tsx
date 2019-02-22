import React from "react";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import TagsInput from "./TagsInput";
import { Tag } from "../../store/types/tags";

function renderInput(inputProps) {
	const {
		classes,
		autoFocus,
		value,
		onChange,
		onFocus,
		addTag,
		deleteTag,
		updateTag,
		tags,
		refInput,
		...other
	} = inputProps;

	const {root, chip, container, input} = classes;
	
	return (
		<TagsInput
			classes={{root, chip, container, input}}
			clearInputValueOnChange
			inputValue={value}
			onChange={onChange}
			onFocus={onFocus}
			onAdd={addTag}
			onDeleteTag={deleteTag}
			updateTag={updateTag}
			tags={tags}
			refInput={refInput}
			{...other}
		/>
	);
}

function renderSuggestion(suggestion: string, { query, isHighlighted }) {
	const matches = match(suggestion, query);
	const parts = parse(suggestion, matches);

	return (
		<MenuItem
			selected={isHighlighted}
			component="div"
			onMouseDown={e => e.preventDefault()} 
		>
			<div>
				{parts.map((part, index) => {
					return part.highlight ? (
						<span key={String(index)} style={{ fontWeight: 300 }}>
							{part.text}
						</span>
					) : (
						<strong key={String(index)} style={{ fontWeight: 500 }}>
							{part.text}
						</strong>
					);
				})}
			</div>
		</MenuItem>
	);
}

function renderSuggestionsContainer(options) {
	const { containerProps, children } = options;

	return (
		<Paper {...containerProps} square>
			{children}
		</Paper>
	);
}

function getSuggestionValue(suggestion: Tag) {
	return suggestion;
}

function getSuggestions(value: string, suggestions: string[]) {
	const inputValue = value.trim().toLowerCase();
	const inputLength = inputValue.length;
	let count = 0;
	if (!inputValue) {
		return suggestions;
	}

	return inputLength === 0
		? []
		: suggestions.filter(suggestion => {
				const keep =
					count < 5 &&
					suggestion.toLowerCase().slice(0, inputLength) === inputValue;

				if (keep) {
					count += 1;
				}

				return keep;
		  });
}

export default class TagsSuggest extends React.Component<any, any> {

	constructor(props) {
		super(props);
		const {suggestions, tags} = props;
		this.state = {
			suggestions: suggestions || [],
			value: tags || [],
			textFieldInput: "",
		};
	}
	inputRef: null | HTMLElement = null;
	
	handleSuggestionsFetchRequested = ({ value }) => {
		this.setState({
			suggestions: getSuggestions(value, this.props.suggestions)
		});
	};

	handleSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

	handletextFieldInputChange = (event, { newValue }) => {
		this.setState({
			textFieldInput: newValue
		});
	};

	componentWillUnmount() {
		if (this.inputRef != null) {
			this.inputRef.removeEventListener('focus', this.onFocus);
		}
	}

	onFocus = (event) => {
		this.setState({
			suggestions: this.props.suggestions
		});
	};

	ref = (e) => {this.inputRef = e;}

	handleAddChip = (label) => {
		this.setState({
			textFieldInput: ""
		});
		this.props.addTag(label);
	}
	handleDeleteChip = (label) => {
		this.props.deleteTag(label);
	}

	render() {
		const { classes, ...rest } = this.props;

		return (
			<Autosuggest
				theme={{
					container: classes.container,
					suggestionsContainerOpen: classes.suggestionsContainerOpen,
					suggestionsList: classes.suggestionsList,
					suggestion: classes.suggestion
				}}
				highlightFirstSuggestion={true}
				shouldRenderSuggestions = {() => true}
				renderInputComponent={renderInput}
				suggestions={this.state.suggestions}
				onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
				onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
				renderSuggestionsContainer={renderSuggestionsContainer}
				getSuggestionValue={getSuggestionValue}
				renderSuggestion={renderSuggestion}
				onSuggestionSelected={(e, { suggestionValue }) => {
					this.handleAddChip(suggestionValue);
					e.preventDefault();
				}}
				focusInputOnSuggestionClick={false}
				inputProps={{
					refInput: this.ref,
					classes,
					tags: this.props.tags,
					onChange: this.handletextFieldInputChange,
					onFocus: this.onFocus,
					value: this.state.textFieldInput,
					onAdd: this.handleAddChip,
					onDelete: this.handleDeleteChip,
					...rest
				}}
			/>
		);
	}
};
