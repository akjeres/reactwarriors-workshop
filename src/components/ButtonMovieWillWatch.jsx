import React from 'react';

export default class ButtonMovieWillWatch extends React.Component {
    constructor() {
        super();

        this.state = {
            willWatch: false,
        };
    };

    render() {
        const text = this.state.willWatch ? 'Remove Will Watch' : 'Will Watch',
              extra_className = this.state.willWatch ? 'btn-success' : 'btn-secondary',
              handler = this.state.willWatch ? this.props.remove : this.props.add;
        return (
            <button type="button" className={ "btn " + extra_className } onClick={ () => {
                this.setState({
                    willWatch: !this.state.willWatch,
                });
                handler(this.props.movie);
            } }>
                { text }
            </button>
        );
    };
}