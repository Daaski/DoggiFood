import { FC } from 'react';

import { FoodType } from '@/utils/calculateDoggiFood';

import scss from './Table.module.scss';

interface TableProps {
  data: { [key: string]: { newFood: FoodType[]; oldFood: FoodType[] }[] };
}

export const Table: FC<TableProps> = ({ data }) => {
  const tableData = Object.entries(data);

  const amountPetDay = tableData[1].length + 1;

  const getFoodColumn = (food: FoodType[], text: string) => {
    let total = 0;

    return (
      <div className={scss.column}>
        <p>{text} </p>
        {food.map((food, index) => {
          total += food.amount;
          return (
            <p key={index}>
              {food.name}: {food.amount} грамм
            </p>
          );
        })}
        <p>Всего: {total} грамм</p>
      </div>
    );
  };

  return (
    <div className={scss.table_wrapper}>
      <div className={scss.table_headers}>
        <p>Какой день</p>
        <p>Утро</p>
        {amountPetDay === 3 && <p>Обед</p>}
        {amountPetDay === 4 && <p>Перед вечером</p>}
        <p>Вечер</p>
      </div>
      {Object.entries(data).map(([key, value], index) => {
        return (
          <div className={scss.table_row} key={index}>
            <h1>{key}</h1>
            {value.map(({ newFood, oldFood }, index) => (
              <div key={index}>
                {getFoodColumn(newFood, 'Новая: ')}
                {getFoodColumn(oldFood, 'Старая: ')}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
