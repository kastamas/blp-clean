import * as React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Select } from 'antd';
import { DateTime, Info } from 'luxon';
import { StyledSelect } from '@business-loyalty-program/ui-kit';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 12px;
`;

const currentDate = DateTime.now();
const yearsOffset = 14;
const firstAvailableYear = currentDate.year - yearsOffset;

const monthsList = Info.months('long', { locale: 'ru' }).map((item, index) => ({
  index: index + 1,
  name: item,
}));

const getYears = (back) => {
  return Array.from(
    { length: back },
    (v, i) => firstAvailableYear - back + i + 1
  ).reverse();
};

const years = getYears(100);

interface IComponentProps {
  value?: string;
  onChange?(value: string): void;
}

export const BirthDateSelector: React.FC<IComponentProps> = (props) => {
  const { value, onChange } = props;

  const [availableDays, setAvailableDays] = useState([]);
  const [selectedYear, setSelectedYear] = useState(firstAvailableYear);
  const [selectedMonth, setSelectedMonth] = useState(monthsList[0].index);
  const [selectedDay, setSelectedDay] = useState(1);

  useEffect(() => {
    if (value) {
      const dateValue = DateTime.fromISO(value);

      setSelectedYear(dateValue.year);
      setSelectedMonth(dateValue.month);
      setSelectedDay(dateValue.day);
    }
  }, [value]);

  useEffect(() => {
    const daysInMonth = DateTime.local(selectedYear, selectedMonth).daysInMonth;

    const newAvailableDays = Array.from(
      { length: daysInMonth },
      (v, i) => i + 1
    );

    if (newAvailableDays.length < selectedDay) {
      const lastMonthDay = newAvailableDays[newAvailableDays.length - 1];

      setSelectedDay(lastMonthDay);
    }

    setAvailableDays(newAvailableDays);
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    const newValue = DateTime.local(
      selectedYear,
      selectedMonth,
      selectedDay
    ).toISODate();

    onChange(newValue);
  }, [selectedDay, selectedMonth, selectedYear]);

  return (
    <Wrapper>
      <StyledSelect
        showSearch
        value={selectedDay}
        onChange={(value) => setSelectedDay(Number(value))}
      >
        {availableDays.map((item) => (
          <Select.Option value={item} key={item}>
            {item}
          </Select.Option>
        ))}
      </StyledSelect>

      <StyledSelect
        showSearch
        value={selectedMonth}
        onChange={(value) => setSelectedMonth(Number(value))}
      >
        {monthsList.map((item) => (
          <Select.Option value={item.index} key={item.index}>
            {item.index} ({item.name})
          </Select.Option>
        ))}
      </StyledSelect>

      <StyledSelect
        showSearch
        value={selectedYear}
        onChange={(value) => setSelectedYear(Number(value))}
      >
        {years.map((item) => (
          <Select.Option key={item} value={item}>
            {item}
          </Select.Option>
        ))}
      </StyledSelect>
    </Wrapper>
  );
};
