import React, { Component } from 'react';
import {
    array,
    string,
    bool,
    func,
    oneOfType,
    number,
    object
} from 'prop-types';

class CustomSelect extends Component {
    componentDidUpdate(prevProps) {
        const { onChange, field, form } = this.props;
        if (form && field.value !== prevProps.field.value && onChange) {
            onChange(field.value, form);
        }
    }

    render() {
        const {
            options,
            label,
            multiple,
            value,
            onChange,
            name,
            field: {
                name: fieldName,
                value: fieldValue,
                onChange: fieldOnChange
            },
            disabled
        } = this.props;
        let finalOptions = [];
        if (Array.isArray(options)) finalOptions = options;
        else if (Object.keys(options).length > 0) {
            Object.keys(options).forEach(key =>
                finalOptions.push({ value: key, label: options[key] })
            );
        }
        return (
            <div class='container'>
                {label.length > 0 && (
                    <span>
                        {label}
                    </span>
                )}
                <select
                    name={fieldName || name}
                    value={fieldValue || value}
                    onChange={disabled ? null : fieldOnChange || onChange}
                    disabled={disabled}
                    multiple= {multiple}
                >
                    {!multiple && <option>Select</option>}
                    {finalOptions.map(option => (
                        <option
                            key={option.value || option}
                            value={option.value || option}
                        >
                            {option.label || option}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}

CustomSelect.propTypes = {
    options: oneOfType([object, array]),
    label: string,
    multiple: bool,
    onChange: func,
    value: oneOfType([string, number]),
    name: string,
    field: object,
    form: object
};

CustomSelect.defaultProps = {
    options: [],
    label: '',
    multiple: false,
    onChange: null,
    value: '',
    name: '',
    field: {},
    form: null
};

export default CustomSelect;
