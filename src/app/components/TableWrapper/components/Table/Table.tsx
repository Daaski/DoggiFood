import {FC} from "react";

import scss from './Table.module.scss'

interface TableProps {
    data: { [key: string]: { newFood: number, oldFood: number }[] }
}

export const Table: FC<TableProps> = ({data}) => {
    return (
        <div className={scss.table_wrapper}>
            <div className={scss.table_headers}>
                <p>Какой день</p>
                <p>Утро</p>
                <p>Вечер</p>
            </div>
            {Object.entries(data).map(([key, value], index) => {
                return (
                    <div className={scss.table_row} key={index}>
                        <h1>{key}</h1>
                        {value.map((el, index) => (
                            <div key={index}>
                                <p>Новая: {el.newFood} грамм</p>
                                <p>Старая: {el.oldFood} грамм</p>
                            </div>

                        ))}
                    </div>
                )
            })}
        </div>
    )
}