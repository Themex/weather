import type {FC} from "react";
import ReactECharts from 'echarts-for-react';
import {useEffect, useState} from "react";

const extractParameter = (data: any, prop: string) => {
    return data.reduce((acc: any[], curr: any) => {
        return prop in curr ? acc.concat(curr[prop]) : acc;
    }, []);
}

const WeatherChart: FC<WeatherProp> = (props) => {
    const dateList = extractParameter(props.data, "timestamp");
    const [ref, setRef] = useState<any>(null);
    const [height, setHeight] = useState(0);
    const grid: any[] = [];
    const xAxis: any[] = [];
    const yAxis: any[] = [];
    const series: any[] = [];
    const title: any[] = [];

    useEffect(() => {
        if(!ref) return;

        const instance = ref.getEchartsInstance();
        if (instance) {
            setHeight(instance.getHeight());
        }
    }, [ref]);

    props.params.forEach((param, index) => {
        grid.push({
            show: true
        });
        title.push({
           text: param.toUpperCase(),
           left: "center",
           textStyle: {
               fontSize: 18,
               fontWeight: 'bold',
               color: "white"
           }
        });
        const x = {
            type: 'category',
            data: dateList
        };
        xAxis.push(index < 1 ? x : {
            ...x,
            gridIndex: index
        });
        yAxis.push(index < 1 ? {} : {
            gridIndex: index
        });

        const seriesObj = {
            name: param,
            showSymbol: false,
            type: 'line',
            smooth: true,
            data: extractParameter(props.data, param)
        };

        series.push(index < 1 ? seriesObj : {
            ...seriesObj,
            xAxisIndex: index,
            yAxisIndex: index
        })
    });
    grid.forEach((value, index) => {
        value.top = (index) * (50 / props.params.length) + 2;
        value.height = (height / (Math.pow(props.params.length, 2) || 1));
        title[index].top = (value.top - 2.25) + '%';
        value.top += '%';
    })

    const options = {
        grid,
        tooltip: {
            trigger: 'axis'
        },
        title,
        xAxis,
        yAxis,
        series,
    };

    return (<ReactECharts ref={(e) => {setRef(e)}} style={{ width: "100%", height: "1500px" }} option={options} opts={{renderer: "svg"}} />)
}

export default WeatherChart;
