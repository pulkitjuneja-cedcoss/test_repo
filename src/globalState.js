import React from 'react';
import { combineReducers } from "redux";

// const combineReducers = redux.combineReducers;

const initialWordpressState = { wordpress_details: {} }

function reducer(state = initialWordpressState, action) {
  console.log('inside  wordpress');
  switch (action.type) {
    case "details_exist":
      return {
        ...state, wordpress_details: action.details
      };

    default:
      return state;
  }
}


const initialValidationState = { validation_obj: {} }


function ValidationReducer(state = initialValidationState, action) {

  console.log('inside  validation');
  switch (action.type) {
    case "validation_details_exist":
      return {
        ...state, validation_obj: action.validation_details
      };

    default:
      return state;
  }
}

const rootReducers = combineReducers({'first': reducer, 'second': ValidationReducer});

export default rootReducers;