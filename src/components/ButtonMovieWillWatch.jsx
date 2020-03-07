import React from 'react';
import classNames from 'classnames';

export default class ButtonMovieWillWatch extends React.Component {
    constructor() {
        super();
        console.log('classNames: ', typeof classNames);
        this.state = {
            willWatch: false,
        };
    };

    render() {
        const { willWatch } = this.state,
              { remove, add } = this.props,
              text = willWatch ? 'Remove Will Watch' : 'Will Watch',
              handler = willWatch ? remove : add;
        return (
            <button type="button" className={
                    classNames(
                        'btn',
                        { 'btn-success': !!willWatch },
                        { 'btn-secondary': !willWatch },
                    )
                }
                onClick={ () => {
                    this.setState({
                        willWatch: !willWatch,
                    });
                    handler(this.props.movie);
                   }
                }
            >
                { text }
            </button>
        );
    };
}