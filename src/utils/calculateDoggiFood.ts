
export function calculateDoggiFood(
    amountFoodPerTime: number,
    amountTimesPerDay: number,
    countDays: number
) {
    const arrayFood = new Map();
    let newFoodPercent = 0;

    const totalAmountOperations = amountTimesPerDay * countDays;

    for (let i = 0; i < countDays; i++) {
        const dayArray: { oldFood: number; newFood: number }[] = [];
        for (let j = 0; j < amountTimesPerDay; j++) {
            newFoodPercent += 100 / totalAmountOperations;
            dayArray.push({
                newFood: amountFoodPerTime * (newFoodPercent / 100),
                oldFood: amountFoodPerTime * ((100 - newFoodPercent) / 100),
            });
            arrayFood.set(`День: ${i}`, dayArray);
        }
    }

    return arrayFood;
}