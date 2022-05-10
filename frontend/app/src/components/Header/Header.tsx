import React, { FC } from 'react';
import Filter from '../Filter/Filter';
import { useDispatch, useSelector } from 'react-redux'
import './Header.scss';
import { add, remove, set } from '../../store/filter/store';

const Header: FC<{}> = () => {
    let { values } = useSelector((state) => state.filter);
    const dispatch = useDispatch();

    return (
        <div className="Header">
            <div className="content">
                <div className="title">BeatSaber Maps</div>
                <Filter
                    values={ values }
                    onDeleteValue={ (index) => dispatch(remove(index)) }
                    onAddValue={ (value) => dispatch(add(value)) }
                />
            </div>
        </div>
    )
};

export default Header;
