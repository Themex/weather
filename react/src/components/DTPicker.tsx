import type {FC} from "react";
import {useState} from "react";
// @ts-ignore
import DateTimePicker from 'react-datetime-picker';
import {useFiguresContext} from "../figuresContext";
import {api} from "../api/fetch";

const DTPicker: FC = () => {
    const { setData } = useFiguresContext();
    const [firstDate, onFirstChange] = useState(new Date());
    const [secondDate, onSecondChange] = useState(new Date());
    const [disabled, setDisabled] = useState(false);

    const getData = () => {

        api<Weather[]>("/weather/between", {
            start_date: firstDate.toISOString(),
            end_date: secondDate.toISOString()
        }).then((data) => {
            setData(data)
        });
    };

    return (
        <div className="picker">
            <DateTimePicker maxDate={secondDate} onChange={onFirstChange} value={firstDate} />
            <DateTimePicker minDate={firstDate} onChange={onSecondChange} value={secondDate} />
            <button type="button" onClick={getData} disabled={disabled}>
                Update
            </button>
        </div>
    );
}

export default DTPicker;