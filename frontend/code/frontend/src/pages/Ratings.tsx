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
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import Loader from "../components/Loader";

const utilities = new Utils();
let x: any;
let y: any;
let svg: any;
let g: any;

let barChartWidth: number;
let barChartHeight: number;
let barChartMargin = { top: 50, right: 20, bottom: 30, left: 40 };

const Ratings: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [charts, setCharts] = useState(<></>);

  function barChartInit(chartData: any, chartId: string) {
    barChartWidth = 900 - barChartMargin.left - barChartMargin.right;
    barChartHeight = 500 - barChartMargin.top - barChartMargin.bottom;
    svg = d3
      .select("body")
      .select("#" + chartId)
      .append("svg")
      .attr("viewBox", "0 0 900 550");
    g = svg
      .append("g")
      .attr(
        "transform",
        "translate(" + barChartMargin.left + "," + barChartMargin.top + ")"
      );
    x = d3Scale.scaleBand().rangeRound([0, barChartWidth]).padding(0.1);
    y = d3Scale.scaleLinear().rangeRound([barChartHeight, 0]);

    x.domain(
      chartData.map(function (d: any) {
        return d.name;
      })
    );
    y.domain([
      0,
      d3Array.max(chartData, function (d: any) {
        return d.avg;
      }),
    ]);
  }

  function barChartDrawXAxis(chartName: string) {
    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + barChartHeight + ")")
      .call(d3Axis.axisBottom(x))
      .append("text")
      .attr("class", "title-x")
      .attr("dx", "430")
      .attr("dy", "3em")
      .text(chartName);
  }

  function barChartDrawYAxis() {
    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3Axis.axisLeft(y))
      .append("text")
      .attr("class", "title-y")
      .attr("transform", "rotate(-90)")
      .attr("dx", "-200")
      .attr("dy", "-2em")
      .text("Values");
  }

  function barChartDrawRetcanglesWithText(chartData: any) {
    g.selectAll(".bar")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("class", "platform")
      .attr("x", function (d: any) {
        return x(d.name);
      })
      .attr("y", function (d: any) {
        return y(d.avg);
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d: any) {
        return barChartHeight - y(d.avg);
      });
    g.selectAll(".bar")
      .data(chartData)
      .enter()
      .append("text")
      .attr("class", "platform-text")
      .attr("x", function (d: any) {
        return x(d.name) + 45;
      })
      .attr("y", function (d: any) {
        return y(d.avg) - 10;
      })
      .text(function (d: any) {
        if (d.avg > 0) {
          return d.avg;
        }
        return "";
      });
  }

  function drawBarChart(chartData: any, chartId: string, chartName: string) {
    barChartInit(chartData, chartId);
    barChartDrawXAxis(chartName);
    barChartDrawYAxis();
    barChartDrawRetcanglesWithText(chartData);
  }

  useEffect(() => {
    utilities.postCall("platforms-rating", "").then((res) => {
      if (res.status) {
        let chartData = [];
        for (let i = 0; i < res.data.length; i++) {
          chartData.push({
            name: res.data[i].name,
            avg: res.data[i].avg,
          });
        }
        drawBarChart(chartData, "platformsChart", "Platforms");

        utilities.postCall("fields-rating", "").then((res) => {
          if (res.status) {
            for (let i = 0; i < res.data.length; i++) {
              setCharts(
                <IonCol>
                  {charts}
                  <div
                    id={"field-" + i}
                    className="platform-chart platform-chart-field"
                  ></div>
                </IonCol>
              );
              drawBarChart(res.data[i].values, "field-" + i, res.data[i].name);
            }
          }
          setShowLoader(false);
        });
      }
    });
  }, []);

  return (
    <>
      <Loader showLoader={showLoader} />
      <IonSlide>
        <IonContent className="page-container ratings">
          <h1 className="form-title mt1 mb1">Platform's Rating</h1>
          <IonRow>
            <IonCol className="chartContainer">
              <div id="platformsChart" className="platform-chart"></div>
              {charts}
            </IonCol>
          </IonRow>
        </IonContent>
      </IonSlide>
    </>
  );
};

export default Ratings;
