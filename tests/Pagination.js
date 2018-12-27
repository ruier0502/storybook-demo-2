import { shallow } from "enzyme";
import expect from "expect";
import React from 'react';
import {Pagination} from '../components';

export default describe('Pagination', () => {
    it('change page', () => {
        const story = <Pagination totalPage={100} page={44} maxDisplayNumber={4} />;
        let output = shallow(story);
        expect(output.find('.active').text()).toBe('45');
        output.find('.page-btn').at(1).simulate('click');
        expect(output.find('.active').text()).toBe('1');
        return;
    });
});
