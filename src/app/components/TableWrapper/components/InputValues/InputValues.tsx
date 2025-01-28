import {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  FC,
  SetStateAction,
  useState,
} from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { CalculateDoggiFoodProps, FoodType } from '@/utils/calculateDoggiFood';

import styles from '@/app/page.module.scss';
import { PrimeIcons } from 'primereact/api';

interface InputValuesProps {
  handleSubmit: (props: CalculateDoggiFoodProps) => void;
}

interface InputValuesType {
  amountFoodPerTimeNew: FoodType[];
  amountFoodPerTimeOld: FoodType[];
  amountTimesPerDay: string;
  countDays: string;
}

export const InputValues: FC<InputValuesProps> = ({ handleSubmit }) => {
  const [inputValues, setInputValues] = useState<InputValuesType>({
    amountFoodPerTimeNew: [],
    amountFoodPerTimeOld: [],
    amountTimesPerDay: '',
    countDays: '',
  });

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className={styles.inputs_wrapper}>
      <div className={styles.inputs}>
        <MultiInput
          inputKey="amountFoodPerTimeOld"
          inputValues={inputValues}
          setNewValue={setInputValues}
          title="Сколько старой еды за день"
        />

        <MultiInput
          inputKey="amountFoodPerTimeNew"
          inputValues={inputValues}
          setNewValue={setInputValues}
          title="Сколько новой еды за день"
        />
        <div style={{ position: 'relative' }}>
          <span className="p-float-label">
            <InputText
              size={25}
              onChange={handleInputChange}
              name="amountTimesPerDay"
              value={inputValues.amountTimesPerDay as string}
            />
            <label htmlFor="amountTimesPerDay">
              Сколько раз кормить в день
            </label>
          </span>
        </div>
        <div style={{ position: 'relative' }}>
          <span className="p-float-label">
            <InputText
              size={10}
              onChange={handleInputChange}
              name="countDays"
              value={inputValues.countDays as string}
            />
            <label htmlFor="countDays">Кол-во дней</label>
          </span>
        </div>
      </div>
      <Button
        onClick={() => {
          const props = Object.fromEntries(
            Object.entries(inputValues).map(([key, value]) => [
              key,
              typeof value === 'object' ? value : Number(value) || 0,
            ]),
          );
          console.log(inputValues);
          handleSubmit(props as unknown as CalculateDoggiFoodProps);
        }}
      >
        РАССЧИТАТЬ!
      </Button>
    </section>
  );
};

interface MultiInputProps {
  setNewValue: Dispatch<SetStateAction<InputValuesType>>;
  inputValues: InputValuesType;
  inputKey: keyof InputValuesType;
  title: string;
}

const MultiInput: FC<MultiInputProps> = ({
  setNewValue,
  inputValues,
  title,
  inputKey,
}) => {
  const [length, setLength] = useState(0);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    field: 'amount' | 'name',
  ) => {
    setNewValue((prevState) => {
      const previousFood = (prevState[inputKey] as unknown as FoodType[]) || [];

      let newFoods = previousFood.map((f, i) => {
        if (i === index) {
          return { ...f, [field]: e.target.value };
        }
        return f;
      });

      if (!previousFood[index]) {
        newFoods = previousFood.toSpliced(index, 0, {
          ...previousFood[index],
          [field]: e.target.value,
        });
      }

      return {
        ...prevState,
        [inputKey]: newFoods,
      };
    });
  };

  const handleDelete = (index: number) => {
    setNewValue((prevState) => {
      const previousFood = (prevState[inputKey] as unknown as FoodType[]) || [];

      const newFoods = previousFood.filter((_, i) => i !== index);

      return {
        ...prevState,
        [inputKey]: newFoods,
      };
    });
    setLength((prev) => prev - 1);
  };

  return (
    <div>
      <p>{title}</p>
      <Button
        onClick={() => setLength((prev) => prev + 1)}
        size="small"
        style={{ margin: '5px auto 5px' }}
        icon={PrimeIcons.PLUS}
      />
      {Array.from({ length }).map((_, index) => {
        return (
          <div key={index} className={styles.multi__input}>
            <span className="p-float-label">
              <InputText
                size={10}
                onChange={(e) => handleInputChange(e, index, 'name')}
                value={(inputValues[inputKey] as FoodType[])?.[index]?.name}
              />
              <label style={{ fontSize: '14px' }} htmlFor={inputKey}>
                Название еды
              </label>
            </span>
            <span className="p-float-label">
              <InputText
                size={20}
                onChange={(e) => handleInputChange(e, index, 'amount')}
                name={inputKey}
                value={(inputValues[inputKey] as FoodType[])?.[
                  index
                ]?.amount?.toString()}
              />
              <label style={{ fontSize: '13px' }} htmlFor={inputKey}>
                {title}
              </label>
            </span>
            <Button
              onClick={() => handleDelete(index)}
              size="small"
              style={{ margin: '5px auto' }}
              icon={PrimeIcons.MINUS}
            />
          </div>
        );
      })}
    </div>
  );
};
