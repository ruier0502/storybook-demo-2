import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { Carousel } from '../components';

storiesOf('基础组件', module)
  .addDecorator(story => <div style={{ margin: '50px auto', height: '300px', width: '300px', background: '#eee' }}>{story()}</div>)
  .addDecorator(withKnobs)
  .add('Carousel', () => {
    const story = <Carousel autoplay>
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
    </Carousel>;
    return story;
});