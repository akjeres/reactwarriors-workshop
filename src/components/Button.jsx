import React from 'react';
import classNames from 'classnames';

export default class Button extends React.Component {
    render() {
        const { handler = null, text  } = this.props,
              disabled_value = !handler;
        return(
            <button
                type="button"
                onClick={ handler }
                className={
                    classNames(
                        'btn',
                        { 'btn-outline-dark': !disabled_value },
                        { 'btn-link': disabled_value },
                    )
                }
                disabled={ disabled_value }
            >{ text }</button>
        );
    }
}