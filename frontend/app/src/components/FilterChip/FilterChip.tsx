import React, { FC } from 'react';
import './FilterChip.scss';
import { FilterItemType, SearchValue } from "../../interfaces/filter";
import { FILTER_ITEMS_MAP } from "../../models/filter-items";
import Button from '@mui/material/Button';
import { IconButton } from "@mui/material";

interface FilterChipProps {
    item: SearchValue;
    onDelete: () => void;
}

const FilterChip: FC<FilterChipProps> = ({ item, onDelete }) => {
    const detail = FILTER_ITEMS_MAP[item.key];
    let title = item.value;

    if (detail.type === FilterItemType.list) {
        title = detail.values.find(it => it.key === item.value)?.name || item.value;
    }

    return (
        <div className={'FilterChip' + (item.not ? ' -not' : '')  }>
            <div className="name">
                { detail.name }
            </div>
            <div className="value">
                { item.not &&
                    <span>Not </span>
                }
                { title }
            </div>
            <IconButton onClick={onDelete}>X</IconButton>
        </div>
    )
};

export default FilterChip;
