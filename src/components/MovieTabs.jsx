import React from 'react';
import SortButton from './SortButton';

export default class MovieTabs extends React.Component {
    // componentWillReceiveProps(nextProps, nextState) {
    //     console.log('MovieTab will receive props');
    //     console.log('next: ', nextProps.sort);
    //     console.log('this: ', this.props.sort);
    // };

    shouldComponentUpdate(nextPops, nextState) {
        return nextPops.sort !== this.props.sort;
    };

    getClassName = (example, value) => {
        return example === value ? 'active' : null;
    };

    render() {
        const { sort, updateSort } = this.props;
        return(
          <ul className="tabs nav nav-pills">
              <li className="nav-item">
                  <SortButton
                      className={this.getClassName(sort, 'popularity.desc')}
                      handler={updateSort.bind(null, 'popularity.desc')}
                      text="Popularity desc"
                  />
              </li>
              <li className="nav-item">
                  <SortButton
                      className={this.getClassName(sort, 'revenue.desc')}
                      handler={updateSort.bind(null, 'revenue.desc')}
                      text="Revenue desc"
                  />
              </li>
              <li className="nav-item">
                  <SortButton
                      className={this.getClassName(sort, 'vote_average.desc')}
                      handler={updateSort.bind(null, 'vote_average.desc')}
                      text="Vote average desc"
                  />
              </li>
          </ul>
      );
    };
}