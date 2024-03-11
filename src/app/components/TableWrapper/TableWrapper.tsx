'use client'
import {useState} from "react";

import {InputValues} from "@/app/components/TableWrapper/components/InputValues";
import {calculateDoggiFood} from "@/utils/calculateDoggiFood";

import styles from "@/app/page.module.scss";
import {Table} from "@/app/components/TableWrapper/components/Table";


export const TableWrapper = () => {
    const [result, setResult] = useState<{ [key: string]: { newFood: number; oldFood: number; }[]}>()

    const handleSubmit = (amountPerTime: number, amountTimesPerDay: number, countDays: number) => {
        const result = calculateDoggiFood(amountPerTime, amountTimesPerDay, countDays);
        setResult(Object.fromEntries(result))
    }

    console.log(result)

    return (
        <>
            <InputValues handleSubmit={handleSubmit}/>
            {result && <Table data={result}/>}
        </>
    )
}