import { configure, addDecorator } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { withOptions } from '@storybook/addon-options';
import { withInfo } from '@storybook/addon-info';
import {
    storiesOf,
    action,
    linkTo,
} from '@storybook/react';

import { 
  specs,
  describe,
  it,
  after,
  before,
  beforeEach,
  afterEach } from 'storybook-addon-specifications';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

global.storiesOf = storiesOf;
global.action = action;
global.linkTo = linkTo;
global.specs = specs;
global.describe = describe;
global.it = it;
global.after = after;
global.before = before;
global.beforeEach = beforeEach;
global.afterEach = afterEach;

addDecorator(
  withOptions({
    name: 'Udesk 5.0',
    goFullScreen: false,
    showAddonsPanel: true,
    showSearchBox: false
    // more configuration here
  })
);
addDecorator(withInfo);
addDecorator(withNotes);

const context = require.context("../stories", true, /.*\.example\.(js|tsx)/);

function loadStories() {
  context.keys().forEach(filename => context(filename));
}
configure(loadStories, module);
