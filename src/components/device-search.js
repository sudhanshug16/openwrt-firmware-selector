import {InputAdornment, makeStyles, TextField} from '@material-ui/core';
import {fade} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import PropTypes from 'prop-types';

const useStylesSearch = makeStyles(theme => ({
  root: {
    borderColor: '#e2e2e1',
    overflow: 'hidden',
    margin: 0,
    borderRadius: 4,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      borderColor: fade(theme.palette.primary.main, 0.25),
    },
    '&$focused': {
      backgroundColor: '#fff',
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
  focused: {},
}));

function SearchTextField(props) {
  const classes = useStylesSearch();

  return (
    <TextField
      variant="outlined"
      label={
        <div className="search-label">
          {props.labeltext}
        </div>
      }
      InputProps={
        {
          classes,
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon className={classes.label}/>
            </InputAdornment>
          ),
        }
      } {...props} />
  );
}

SearchTextField.propTypes = {
  labeltext: PropTypes.string,
};

export default SearchTextField;
