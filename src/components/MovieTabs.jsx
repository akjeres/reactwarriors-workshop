import React from 'react';
import SortButton from './SortButton';

export default class MovieTabs extends React.Component {
    render() {
        const { sort, updateSort } = this.props,
              switcher = 'active',
              extra_className = {
                  popularity_desc: null,
                  revenue_desc: null,
                  vote_average_desc: null,
              };
        switch (sort) {
            case 'revenue.desc':
                extra_className.revenue_desc = switcher;
                break;
            case 'vote_average.desc':
                extra_className.vote_average_desc = switcher;
                break;
            default:
                extra_className.popularity_desc = switcher;
                break;
        };
        return(
          <ul className="tabs nav nav-pills">
              <li className="nav-item">
                  <SortButton
                      className={extra_className.popularity_desc}
                      handler={updateSort.bind(null, 'popularity.desc')}
                      text="Popularity desc"
                  />
              </li>
              <li className="nav-item">
                  <SortButton
                      className={extra_className.revenue_desc}
                      handler={updateSort.bind(null, 'revenue.desc')}
                      text="Revenue desc"
                  />
              </li>
              <li className="nav-item">
                  <SortButton
                      className={extra_className.vote_average_desc}
                      handler={updateSort.bind(null, 'vote_average.desc')}
                      text="Vote average desc"
                  />
              </li>
          </ul>
      );
    };
}