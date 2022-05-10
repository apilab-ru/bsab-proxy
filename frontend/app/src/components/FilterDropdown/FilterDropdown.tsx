import React, { FC } from 'react';
import './FilterDropdown.scss';
import { FilterItem, FilterItemValue } from "../../interfaces/filter";
import NgIf from '../NgIf/NgIf';
import { Button } from '@mui/material';

interface FilterDropdownProps {
    onChangeGroup: (group: string | null) => void;
    items: FilterItem[];
    focusGroup: string | null;
    group: string | null;

    onChangeValue: (value: string | null, isNegative?: boolean) => void;
    values: FilterItemValue[] | null;
    focusValue: string | null,
    value: string | null;
}

interface listItemsProps {
    onChange: (value: string, isNegative?: boolean) => void;
    items: FilterItemValue[];
    selected: string | null;
    withNegative?: boolean;
}

const ListItems: FC<listItemsProps> = ({ items, selected, onChange, withNegative }) => {
    return (
        <div className='list'>
            { items.map(({ key, name }) =>
                <div className="line" key={ key }>
                    <Button
                        onClick={ () => onChange(key) }
                        classes={ selected === key ? { root: '-active' } : {} }
                    >
                        { name }
                        { !!withNegative &&
                            <span className='positive'>+</span>
                        }
                    </Button>
                    { !!withNegative &&
                        <Button
                            onClick={ () => onChange(key, true) }
                            classes={ { root: '-negative' } }
                        >
                            −
                        </Button>
                    }
                </div>

            ) }
        </div>
    )
}

const FilterDropdown: FC<FilterDropdownProps> = (props) => {

    return (
        <div className="FilterDropdown">
            { !props.group &&
            <ListItems
                items={ props.items }
                selected={ props.focusGroup }
                onChange={ props.onChangeGroup }
            />
            }
            <NgIf show={ !!props.group }>
                <Button onClick={ () => props.onChangeGroup(null) }>Back</Button>

                { !!props.values?.length &&
                <ListItems
                    items={ props.values }
                    selected={ props.focusValue }
                    onChange={ props.onChangeValue }
                    withNegative={true}
                />
                }
            </NgIf>
        </div>
    )

}

export default FilterDropdown;
