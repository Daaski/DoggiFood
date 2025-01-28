export interface FoodType {
  name: string;
  amount: number;
}

export interface CalculateDoggiFoodProps {
  amountFoodPerTimeNew: FoodType[];
  amountFoodPerTimeOld: FoodType[];
  amountTimesPerDay: number;
  countDays: number;
}

export function calculateDoggiFood(props: CalculateDoggiFoodProps) {
  const {
    amountFoodPerTimeNew,
    amountFoodPerTimeOld,
    amountTimesPerDay,
    countDays,
  } = props;

  const arrayFood = new Map();
  let newFoodPercent = 0;

  const totalAmountOperations = amountTimesPerDay * countDays;

  const calculateFood = (food: FoodType[], reverse = false) => {
    return food.map((f) => ({
      amount: reverse
        ? +(f.amount * ((100 - newFoodPercent) / 100)).toFixed(1)
        : +(f.amount * (newFoodPercent / 100)).toFixed(1),
      name: f.name,
    }));
  };

  for (let i = 0; i < countDays; i++) {
    const dayArray: { oldFood: FoodType[]; newFood: FoodType[] }[] = [];
    for (let j = 0; j < amountTimesPerDay; j++) {
      newFoodPercent += 100 / totalAmountOperations;
      dayArray.push({
        newFood: calculateFood(amountFoodPerTimeNew),
        oldFood: calculateFood(amountFoodPerTimeOld, true),
      });
      arrayFood.set(`День: ${i + 1}`, dayArray);
    }
  }

  return arrayFood;
}
