import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as redux from 'react-redux';
import Nav from './Nav';
import { Link } from 'react-router-dom';

configure( {adapter: new Adapter() })

describe("<Nav />", () => {
    let spyOnUseSelector;
    let spyOnUseDispatch;
    let mockDispatch;
    let wrapper
    beforeEach(() => {
        // Mock useSelector hook
        spyOnUseSelector = jest.spyOn(redux, 'useSelector');
        spyOnUseSelector.mockReturnValue([{ id: 1, text: 'Old Item' }]);
        // Mock useDispatch hook
        spyOnUseDispatch = jest.spyOn(redux, 'useDispatch');
        // Mock dispatch function returned from useDispatch
        mockDispatch = jest.fn();
        spyOnUseDispatch.mockReturnValue(mockDispatch);
        wrapper = shallow(<Nav />);
    });
    it('Nav deberia renderizar dos <Link />', () => {
        expect(wrapper.find(Link)).toHaveLength(2)
    });
    it('Nav deberia renderizar un <div> con className navBar', () => {
        expect(wrapper.find('div[className="navBar"]')).toHaveLength(1)
    });
    it('Nav deberia renderizar un <input> con propiedades type, className, autoComplete, placeholder, name, onChange y value', () => {
        expect(wrapper.find('input[type]')).toHaveLength(1)
        expect(wrapper.find('input[className]')).toHaveLength(1)
        expect(wrapper.find('input[autoComplete]')).toHaveLength(1)
        expect(wrapper.find('input[placeholder]')).toHaveLength(1)
        expect(wrapper.find('input[name]')).toHaveLength(1)
        expect(wrapper.find('input[onChange]')).toHaveLength(1)
        expect(wrapper.find('input[value]')).toHaveLength(1)
    });
    it('Uno de los Link deberia inlcuir home en su texto', () => {
        expect(wrapper.find(Link).at(0).text()).toEqual('home');
    });
    it('El otro Link deberia inlcuir + Create new Recipe en su texto', () => {
        expect(wrapper.find(Link).at(1).text()).toEqual('+ Create new Recipe');
    });

});