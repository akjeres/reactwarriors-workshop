import React from 'react';

export default class SortButton extends React.Component {
    render() {
      const { className, handler, text } = this.props;
      return (
          <div
              className={`nav-link ${className}`}
              onClick={ handler.bind(null) }
          >
              { text }
          </div>
      );
    };
}