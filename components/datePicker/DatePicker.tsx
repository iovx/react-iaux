import * as React from 'react';
import ReactDatePicker from 'react-date-picker';
import { DatePickerProps as ReactDatePickerProps } from 'react-date-picker';

interface BaseProps extends ReactDatePickerProps {

}

export type DatePickerProps = {} & BaseProps;


export interface DatePickerState {

}


class DatePicker extends React.Component<DatePickerProps, DatePickerState> {
  static propTypes = {};

  render() {
    return (
      <ReactDatePicker
        {...this.props}
      />
    );
  }
}

export default DatePicker;
