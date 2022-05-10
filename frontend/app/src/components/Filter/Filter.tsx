import React, { FormEvent } from 'react';
import './Filter.scss';
import FilterDropdown from "../FilterDropdown/FilterDropdown";
import { FilterItem, FilterItemType, FilterItemValue, SearchValue } from "../../interfaces/filter";
import Popover from '@mui/material/Popover';
import { FILTER_ITEMS, FILTER_ITEMS_MAP } from "../../models/filter-items";
import FilterChip from '../FilterChip/FilterChip';

interface FilterProps {
    values: SearchValue[];
    onDeleteValue: (index: number) => void;
    onAddValue: (value: SearchValue) => void;
}

const initialState = {
    isShowDropdown: false,

    group: null as string | null,
    focusGroup: null as string | null,
    filterText: '',

    filterItems: [] as FilterItem[],
    currentItemValues: null as FilterItemValue[] | null,
    values: [] as SearchValue[],
    focusValue: null as string | null,
};

class Filter extends React.Component<FilterProps> {
    id = 'filterPopover';
    anchorRef = React.createRef<HTMLInputElement>();
    state = initialState;

    constructor(public props: FilterProps) {
        super(props);
        this.state.values = props.values;
    }

    static getDerivedStateFromProps(props: FilterProps, state: typeof initialState): typeof initialState | null {
        if (props.values !== state.values) {
            return {
                ...state,
                values: props.values
            }
        }

        return null;
    }

    open = () => {
        const filterItems = this.getItems();

        this.setState({
            isShowDropdown: true,
            filterItems,
            focusGroup: this.calcSelected(filterItems),
        });
    }

    close = () => {
        this.setState({ isShowDropdown: false, anchorEl: null })
    }

    onChangeGroup = (group: string | null) => {
        this.handleSelectGroup(group);
    }

    onChangeValue = (value: string | null, isNot = false) => {
        this.handleSelectValue(value, this.state.group, isNot);
    }

    handleKeyPress = ({ code }: { code: string }) => {
        if (code === 'ArrowDown') {
            this.changeFocusGroup(+1);
            this.changeFocusValue(+1);
        }

        if (code === 'ArrowUp') {
            this.changeFocusGroup(-1);
            this.changeFocusValue(-1);
        }

        if (code === 'ArrowLeft') {
            this.handleSelectGroup(null);
        }

        if (code === 'Enter') {
            if (this.state.isShowDropdown) {
                if (this.state.group) {
                    this.handleSelectValue(this.state.focusValue, this.state.group);
                } else {
                    this.handleSelectGroup(this.state.focusGroup);
                }
            } else {
                this.open();
            }
        }
    }

    handleChangeSearch = (event: FormEvent<HTMLInputElement>) => {
        const filterText = event.currentTarget.value;
        const filterItems = this.getItems();
        const focusGroup = filterItems.find(it => it.key === this.state.focusGroup)
            ? this.state.focusGroup
            : this.calcSelected(filterItems);
        this.setState({
            filterText,
            filterItems,
            focusGroup,
        })
    }

    handleDeleteGroup = (index: number) => {
        this.props.onDeleteValue(index);
    }

    private handleSelectValue(value: string | null, group: string | null, isNot = false): void {
        const item = FILTER_ITEMS_MAP[group!];

        if (!item) {
            return;
        }

        if (!value) {
            this.setState({
                filterText: value,
            });
            return;
        }

        if (group) {
            this.props.onAddValue({
                key: group,
                value,
                ...(isNot ? { not: true } : {})
            })
        }

        this.setState({
            filterText: '',
            group: null,
        });
        this.close();
    }

    private handleSelectGroup(group: string | null): void {
        if (!group) {
            return this.setState({ group });
        }

        const item = FILTER_ITEMS_MAP[group];

        if (!item) {
            return;
        }

        if (item.type === FilterItemType.list) {
            const currentItemValues = this.filterValues(group, item.values);
            const focusValue = currentItemValues ? currentItemValues[0].key : null;
            return this.setState({
                group,
                currentItemValues,
                focusValue
            });
        }

        if (item.type === FilterItemType.write) {
            const value = this.state.filterText;
            this.handleSelectValue(value, group);
        }
    }

    private filterValues(group: string, values: FilterItemValue[]): FilterItemValue[] {
        const current = this.state.values
            .filter(it => it.key === group)
            .map(it => it.value);
        return values.filter(it => !current.includes(it.key));
    }

    private getItems(): FilterItem[] {
        const filterText = this.state.filterText;
        const values = this.state.values.map(it => it.key);
        return FILTER_ITEMS
            .filter(item => !item.unique || !values.includes(item.key))
            .filter(item => item.type !== FilterItemType.list || this.filterValues(item.key, item.values).length > 0)
            .filter(item => item.filterFunc
                ? item.filterFunc(filterText)
                : item.key.includes(filterText)
            );
    }

    private changeFocusGroup(offset: number): void {
        this.setState({
            focusGroup: this.calcFocus(
                this.state.filterItems,
                this.state.focusGroup,
                offset,
            )
        })
    }

    private changeFocusValue(offset: number): void {
        this.setState({
            focusValue: this.calcFocus(
                this.state.currentItemValues,
                this.state.focusValue,
                offset,
            )
        })
    }

    private calcFocus(items: FilterItemValue[] | null, current: string | null, offset: number): string | null {
        if (!items) {
            return null;
        }

        const maxIndex = items.length - 1;
        let index = items.findIndex(it => it.key === current);
        if (index === -1) {
            index = 0;
        }
        index += offset;

        if (index < 0) {
            index += items.length;
        }

        if (index > maxIndex) {
            index -= items.length;
        }

        return items[index].key;
    }

    private calcSelected(items: FilterItem[]): string {
        let selected;

        if (!selected) {
            selected = items.find(it => it.default)?.key;
        }

        if (!selected) {
            selected = items[0]?.key;
        }

        return selected;
    }

    render() {
        return (
            <div className="Filter">
                <div className="params-box">
                    <div className="chips">
                        { this.state.values.map((item, index) =>
                            <FilterChip
                                key={ index }
                                item={ item }
                                onDelete={ () => this.handleDeleteGroup(index) }
                            />
                        ) }
                    </div>

                    <input
                        ref={ this.anchorRef }
                        aria-describedby={ this.id }
                        placeholder="Press for add filter"
                        className="input -params"
                        value={ this.state.filterText }
                        onClick={ this.open }
                        onKeyDown={ this.handleKeyPress }
                        onInput={ this.handleChangeSearch }
                    />
                    <Popover
                        id={ this.id }
                        open={ this.state.isShowDropdown }
                        anchorEl={ this.anchorRef.current }
                        onClose={ this.close }
                        anchorOrigin={ {
                            vertical: 'bottom',
                            horizontal: 'left',
                        } }
                        disableAutoFocus={ true }
                        disableEnforceFocus={ true }
                    >
                        <FilterDropdown
                            items={ this.state.filterItems }
                            group={ this.state.group }
                            focusGroup={ this.state.focusGroup }
                            onChangeGroup={ this.onChangeGroup }

                            values={ this.state.currentItemValues }
                            value={ this.state.filterText }
                            focusValue={ this.state.focusValue }
                            onChangeValue={ this.onChangeValue }
                        />
                    </Popover>
                </div>
            </div>
        )
    }
}

export default Filter;
