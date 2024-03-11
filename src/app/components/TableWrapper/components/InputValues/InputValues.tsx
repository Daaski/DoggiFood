import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";

import {ChangeEventHandler, FC, useState} from "react";

import styles from "@/app/page.module.scss";


interface InputValuesProps {
    handleSubmit: (amountPerTime: number, amountTimesPerDay: number, countDays: number) => void
}

export const InputValues: FC<InputValuesProps> = ({handleSubmit}) => {
    const [inputValues, setInputValues] = useState<{
        amountPerTime: string,
        amountTimesPerDay: string,
        countDays: string
    }>({amountPerTime: '', amountTimesPerDay: '', countDays: ''})
    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setInputValues(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    return (
        <section className={styles.inputs_wrapper}>
            <div className={styles.inputs}>
            <span className="p-float-label">
                  <InputText onChange={handleInputChange} name="amountPerTime" value={inputValues.amountPerTime}/>
                 <label htmlFor="amountPerTime">Сколько еды за раз</label>
            </span>
                <span className="p-float-label">
                   <InputText onChange={handleInputChange} name="amountTimesPerDay"
                              value={inputValues.amountTimesPerDay}/>
                 <label htmlFor="amountTimesPerDay">Сколько раз кормить в день</label>
            </span>
                <span className="p-float-label">
                     <InputText onChange={handleInputChange} name="countDays" value={inputValues.countDays}/>
                 <label htmlFor="countDays">Кол-во дней</label>
            </span>
            </div>
            <Button onClick={() => handleSubmit(+inputValues.amountPerTime, +inputValues.amountTimesPerDay, +inputValues.countDays)}>РАССЧИТАТЬ!</Button>
        </section>
    )
}