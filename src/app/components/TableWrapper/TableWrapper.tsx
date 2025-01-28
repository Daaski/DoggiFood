'use client';
import { useState } from 'react';

import { InputValues } from '@/app/components/TableWrapper/components/InputValues';
import {
  calculateDoggiFood,
  CalculateDoggiFoodProps,
  FoodType,
} from '@/utils/calculateDoggiFood';

import { Table } from '@/app/components/TableWrapper/components/Table';

export const TableWrapper = () => {
  const [result, setResult] = useState<{
    [key: string]: { newFood: FoodType[]; oldFood: FoodType[] }[];
  }>();

  const handleSubmit = (props: CalculateDoggiFoodProps) => {
    const result = calculateDoggiFood(props);
    setResult(Object.fromEntries(result));
  };

  return (
    <>
      <InputValues handleSubmit={handleSubmit} />
      {result && <Table data={result} />}
    </>
  );
};
