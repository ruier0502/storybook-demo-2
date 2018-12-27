import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { Pagination } from '../components';
import paginationDoc from '../components/Pagination/readme.md';
import fn from '../tests/Pagination';

storiesOf('基础组件', module)
  .addDecorator(story => <div style={{ marginTop: '50px' }}>{story()}</div>)
  .addDecorator(withKnobs)
  .add('Pagination', () => {
    const totalPage = number('totalPage', 100);
    const currentPage = number('currentPage', 45);
    const maxDisplayNumber = number('maxDisplayNumber', 4);
    const story = <Pagination totalPage={totalPage} page={currentPage - 1} maxDisplayNumber={maxDisplayNumber} />;
    
    specs(() => fn);

    return story;
  }, {
    notes: { markdown: paginationDoc },
  });
