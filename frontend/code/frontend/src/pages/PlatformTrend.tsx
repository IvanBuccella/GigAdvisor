import React, { useState, useEffect } from "react";
import { Utils } from "../core/Utils";
import {
  IonSlide,
  IonContent,
  IonCol,
  IonRow,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
} from "@ionic/react";

import * as d3 from "d3-selection";
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Axis from "d3-axis";
import Loader from "../components/Loader";

const utilities = new Utils();
let x: any;
let y: any;
let svg: any;
let g: any;
let line: any;
let allGroup: any;
let allGroupColors: any;

let scatterPlotChartWidth: number;
let scatterPlotChartHeight: number;
let scatterPlotChartMargin = { top: 20, right: 20, bottom: 20, left: 40 };

const PlatformTrend: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [platform, setPlatform] = useState("");

  function scatterPlotChartInit(chartData: any, chartId: string) {
    let width = window.innerWidth;
    if (width >= 767) {
      width = width * 0.75;
    }
    scatterPlotChartWidth =
      width - scatterPlotChartMargin.left - scatterPlotChartMargin.right;
    scatterPlotChartHeight =
      window.innerHeight -
      300 -
      scatterPlotChartMargin.top -
      scatterPlotChartMargin.bottom;
    svg = d3
      .select("#" + chartId)
      .append("svg")
      .attr("width", scatterPlotChartWidth)
      .attr("height", scatterPlotChartHeight);

    g = svg
      .append("g")
      .attr(
        "transform",
        "translate(" +
          scatterPlotChartMargin.left +
          10 +
          "," +
          scatterPlotChartMargin.top +
          10 +
          ")"
      );
    allGroup = [];
    allGroupColors = [];
    let chart = document.getElementById(chartId);
    if (chart != null) {
      chart.appendChild(document.createElement("br"));
      let div = document.createElement("div");
      div.className = "legend-container";
      for (let i = 0; i < Object.keys(chartData).length; i++) {
        if (chartData[i]["values"].length > 0) {
          allGroup.push(chartData[i]["name"]);
          allGroupColors[chartData[i]["name"]] = chartData[i]["color"];
        }
        var element = document.createElement("p");
        element.style.color = chartData[i]["color"];
        element.textContent = chartData[i]["name"];
        div.appendChild(element);
      }
      chart.appendChild(div);
    }
  }

  function scatterPlotChartDrawXAxis(chartData: any) {
    let max = 0;
    if (chartData.length > 0) {
      max = chartData[0]["values"].length;
    }
    max++;
    x = d3Scale
      .scaleLinear()
      .domain([0, max])
      .range([1, scatterPlotChartWidth]);
    svg
      .append("g")
      .attr(
        "transform",
        "translate(24," +
          (scatterPlotChartHeight - scatterPlotChartMargin.bottom) +
          ")"
      )
      .call(d3Axis.axisBottom(x));
  }

  function scatterPlotChartDrawYAxis(chartData: any) {
    y = d3Scale
      .scaleLinear()
      .domain([0, 6])
      .range([scatterPlotChartHeight - scatterPlotChartMargin.top, 5]);
    svg
      .append("g")
      .call(d3Axis.axisLeft(y))
      .attr("transform", "translate(25,0)");
  }

  function scatterPlotChartDrawLines(chartData: any) {
    line = d3Shape
      .line()
      .x(function (d: any) {
        return x(+d.time);
      })
      .y(function (d: any) {
        return y(+d.value);
      });
    svg
      .selectAll("myLines")
      .data(chartData)
      .enter()
      .append("path")
      .attr("d", function (d: any) {
        return line(d.values);
      })
      .attr("stroke", function (d: any) {
        return allGroupColors[d.name];
      })
      .style("stroke-width", 4)
      .style("fill", "none");
  }

  function scatterPlotChartDrawPoints(chartData: any) {
    svg
      .selectAll("myDots")
      .data(chartData)
      .enter()
      .append("g")
      .style("fill", function (d: any) {
        return allGroupColors[d.name];
      })
      .attr("class", function (d: any) {
        return d.name;
      })
      .selectAll("myPoints")
      .data(function (d: any) {
        return d.values;
      })
      .enter()
      .append("circle")
      .attr("cx", function (d: any) {
        return x(d.time);
      })
      .attr("cy", function (d: any) {
        return y(d.value);
      })
      .attr("r", 5)
      .attr("stroke", "black");
  }

  function drawScatterPlotChart(chartData: any, chartId: string) {
    scatterPlotChartInit(chartData, chartId);
    if (allGroup.length > 0) {
      scatterPlotChartDrawXAxis(chartData);
      scatterPlotChartDrawYAxis(chartData);
      scatterPlotChartDrawLines(chartData);
      scatterPlotChartDrawPoints(chartData);
    }
  }

  useEffect(() => {
    let data = {
      slug: utilities.getLastItem(window.location.pathname),
    };
    utilities.postCall("platform-trend", JSON.stringify(data)).then((res) => {
      if (res.status) {
        setPlatform(res.data.name);
        drawScatterPlotChart(res.data.fields, "platformChart");
      }
      setShowLoader(false);
    });
  }, []);

  return (
    <>
      <Loader showLoader={showLoader} />
      <IonSlide>
        <IonContent className="page-container platform-trend">
          <h1 className="form-title mt1 mb1">
            {platform} Trend for Last 20 Reviews
          </h1>
          <IonRow>
            <IonCol className="chartContainer">
              <div id="platformChart" className="platform-chart"></div>
            </IonCol>
          </IonRow>
        </IonContent>
      </IonSlide>
    </>
  );
};

export default PlatformTrend;
