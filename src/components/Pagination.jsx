import React from 'react';
import classNames from 'classnames';
import Button from './Button';

export default class Pagination extends React.Component {

    increasePage = () => {
        const { page, total, updatePage } = this.props,
              result = page + 1;

        updatePage((result > total) ? total : result);
    };

    decreasePage = () => {
        const { page, updatePage } = this.props,
              result = page - 1;

        updatePage((result < 1) ? 1 : result);
    };

    render() {
      const { page } = this.props;
      return(
          <div
              className={
                classNames(
                    'd-flex',
                    'justify-content-between',
                    'align-items-stretch',
                    'flex-nowrap',
                    'mb-4',
                )
              }
          >
              <div className={
                  classNames(
                      'w-100',
                      'text-left'
                  )
              }>
                  <Button
                      handler={ this.decreasePage }
                      text="Previous"
                  />
              </div>
              <div className={
                  classNames(
                      'w-100',
                      'text-center'
                  )
              }>
                  <Button
                      text={ page }
                  />
              </div>
              <div className={
                  classNames(
                      'w-100',
                      'text-right'
                  )
              }>
                  <Button
                      handler={ this.increasePage }
                      text="Next"
                  />
              </div>
          </div>
      );
    };
}