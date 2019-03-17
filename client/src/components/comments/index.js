import React from "react";
import { Container, Row, Col } from "../Grid";
import moment from 'moment';
import {Link, withRouter} from 'react-router-dom';
import auth0Client from "../../Auth/authentication";

// BookList renders a bootstrap list item
export function CommentList({ children }) {
    return <ul className="list-group">{children}</ul>;
  }
  

  // RecipeListItem renders a bootstrap list item containing data from the recipe api call
  export function CommentListItem(
    props
  ) {
    return (
      <li className="list-group-item">
          
        <p>{props.user} + ":" </p>
        <p>{props.text}</p>

      </li>
    );
  }