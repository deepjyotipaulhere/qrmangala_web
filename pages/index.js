import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Master from './Master'
import qrmAxios from './qrmAxios';
import dynamic from 'next/dynamic';

const am4core = dynamic(() => import('@amcharts/amcharts4/core'))
const am4charts = dynamic(() => import('@amcharts/amcharts4/charts'))
const am4themes_animated = dynamic(() => import('@amcharts/amcharts4/themes/animated'))

// am4core.useTheme(am4themes_animated);

export default function index() {


  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const chart = useRef(null);

  useEffect(() => {
    qrmAxios.get("locationvisit").then(response => {
      console.log(response.data);
      setData(response.data)

      setLoading(false)
    })
  }, [])

  useLayoutEffect(() => {
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.paddingRight = 20;

    let data = [];
    let visits = 10;
    for (let i = 1; i < 366; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
    }

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";

    series.tooltipText = "{valueY.value}";
    chart.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;

    chart.current = chart;
  }, [])

  return (
    <Master title="Location Hits">
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    </Master>
  )
}
