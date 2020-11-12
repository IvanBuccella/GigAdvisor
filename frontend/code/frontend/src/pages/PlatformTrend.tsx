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
import * as d3Zoom from "d3-zoom";
import * as d3Geo from "d3-geo";
import * as d3Fetch from "d3-fetch";
import Loader from "../components/Loader";

const utilities = new Utils();
let x: any;
let xAxis: any;
let y: any;
let zoom: any;
let svg: any;
let svgMap: any;
let svgMapProjection: any;
let g: any;
let chartDataFields: any;
let chartDataRegions: any;
let lineGenerator: any;
let allGroup: any;
let allGroupColors: any;

let scatterPlotChartWidth: number;
let scatterPlotChartHeight: number;
let scatterPlotChartMargin = { top: 20, right: 20, bottom: 20, left: 40 };

let mapChartWidth: number;
let mapChartHeight: number;
let mapChartMargin = { top: 20, right: 20, bottom: 20, left: 40 };

const PlatformTrend: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [platform, setPlatform] = useState("");

  function scatterPlotChartInit(chartId: string) {
    let width = window.innerWidth;
    if (!utilities.isMobile()) {
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

    zoom = d3Zoom.zoom().on("zoom", updateChart);
    svg
      .append("rect")
      .attr("width", scatterPlotChartWidth)
      .attr("height", scatterPlotChartHeight)
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr(
        "transform",
        "translate(" +
          scatterPlotChartMargin.left +
          "," +
          scatterPlotChartMargin.top +
          ")"
      )
      .call(zoom);
    allGroup = [];
    allGroupColors = [];
    let chart = document.getElementById(chartId);
    if (chart != null) {
      chart.appendChild(document.createElement("br"));
      let div = document.createElement("div");
      div.className = "legend-container";
      for (let i = 0; i < Object.keys(chartDataFields).length; i++) {
        if (chartDataFields[i]["values"].length > 0) {
          allGroup.push(chartDataFields[i]["name"]);
          allGroupColors[chartDataFields[i]["name"]] =
            chartDataFields[i]["color"];
        }
        var element = document.createElement("p");
        element.style.color = chartDataFields[i]["color"];
        element.textContent = chartDataFields[i]["name"];
        div.appendChild(element);
      }
      chart.appendChild(div);
    }
  }

  function scatterPlotChartDrawXAxis() {
    x = d3Scale.scaleLinear().domain([0, 10]).range([1, scatterPlotChartWidth]);
    if (utilities.isMobile()) {
      x = d3Scale
        .scaleLinear()
        .domain([0, 6])
        .range([1, scatterPlotChartWidth]);
    }
    xAxis = svg
      .append("g")
      .attr("class", "x-axis")
      .attr(
        "transform",
        "translate(24," +
          (scatterPlotChartHeight - scatterPlotChartMargin.bottom) +
          ")"
      )
      .call(d3Axis.axisBottom(x));
  }

  function scatterPlotChartDrawYAxis() {
    y = d3Scale
      .scaleLinear()
      .domain([0, 6])
      .range([scatterPlotChartHeight - scatterPlotChartMargin.top, 5]);
    svg
      .append("g")
      .call(d3Axis.axisLeft(y))
      .attr("transform", "translate(25,0)");
  }

  function scatterPlotChartDrawLines() {
    svg
      .selectAll("lines")
      .data(chartDataFields)
      .enter()
      .append("path")
      .attr("d", function (d: any) {
        return lineGenerator(d.values);
      })
      .attr("class", "lines")
      .attr("name", function (d: any) {
        return d.name;
      })
      .attr("stroke", function (d: any) {
        return allGroupColors[d.name];
      })
      .style("stroke-width", 3)
      .style("fill", "none")
      .on("mouseover", function (element: any) {
        element.target.style.filter =
          "drop-shadow(0px 0px 5px " +
          allGroupColors[element.target.getAttribute("name")] +
          ")";
      })
      .on("mouseleave", function (element: any) {
        element.target.style.filter = "none";
      });
  }

  function scatterPlotChartDrawPoints() {
    svg
      .selectAll("dots")
      .data(chartDataFields)
      .enter()
      .append("g")
      .style("fill", function (d: any) {
        return allGroupColors[d.name];
      })
      .attr("class", function (d: any) {
        return d.name;
      })
      .selectAll("points")
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

  function updateChart(event: any) {
    var newX = event.transform.rescaleX(x);
    xAxis.call(d3Axis.axisBottom(newX));

    svg.selectAll("circle").attr("cx", function (d: any) {
      return newX(d.time);
    });

    lineGenerator = d3Shape
      .line()
      .x(function (d: any) {
        return newX(+d.time);
      })
      .y(function (d: any) {
        return y(+d.value);
      });
    svg.selectAll("path[class='lines']").remove();
    scatterPlotChartDrawLines();
  }

  function drawScatterPlotChart(chartId: string) {
    scatterPlotChartInit(chartId);
    if (allGroup.length > 0) {
      scatterPlotChartDrawXAxis();
      scatterPlotChartDrawYAxis();
      lineGenerator = d3Shape
        .line()
        .x(function (d: any) {
          return x(+d.time);
        })
        .y(function (d: any) {
          return y(+d.value);
        });
      scatterPlotChartDrawLines();
      scatterPlotChartDrawPoints();
    }
  }

  function drawMapChart(chartId: string) {
    let width = window.innerWidth;
    mapChartHeight =
      window.innerHeight - 200 - mapChartMargin.top - mapChartMargin.bottom;
    if (!utilities.isMobile()) {
      width = width * 0.75;
      mapChartHeight =
        window.innerHeight - 100 - mapChartMargin.top - mapChartMargin.bottom;
    }
    mapChartWidth = width - mapChartMargin.left - mapChartMargin.right;

    svgMap = d3
      .select("#" + chartId)
      .append("svg")
      .attr("width", mapChartWidth)
      .attr("height", mapChartHeight)
      .append("g");

    width = window.outerWidth;

    if (width <= 500) {
      svgMapProjection = d3Geo.geoMercator().center([27, 40]).scale(1200);
    } else if (width >= 800 && width <= 1200) {
      svgMapProjection = d3Geo.geoMercator().center([19, 40]).scale(1200);
    } else if (width > 1200 && width <= 1500) {
      svgMapProjection = d3Geo.geoMercator().center([10, 40]).scale(1200);
    } else {
      svgMapProjection = d3Geo.geoMercator().center([7, 43]).scale(2050);
    }

    let pathGenerator = d3Geo.geoPath().projection(svgMapProjection);
    let regions = require("../partials/regions.geojson");
    d3Fetch.json(regions).then(function (data: any) {
      data.features = data.features.filter(function (d: any) {
        var item = chartDataRegions.filter((item: any) =>
          item.name.toLowerCase().includes(d.properties.reg_name)
        );
        d.properties.color = "var(--color-grey)";
        d.properties.avg = 0;
        if (item.length > 0) {
          d.properties.avg = item[0].avg;
          if (item[0].avg > 2) {
            d.properties.color = "var(--color-green)";
          } else {
            d.properties.color = "var(--color-red)";
          }
        }
        return true;
      });

      function setModal(name: any, avg: any, color: any) {
        svgMap.selectAll("text.regionName").text(name);
        if (avg > 0) {
          svgMap
            .selectAll("text.regionAvg")
            .attr("fill", color)
            .text("Average: " + avg);
        } else {
          svgMap.selectAll("text.regionAvg").text("");
        }
      }
      svgMap
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("class", "region")
        .attr("fill", function (d: any) {
          return d.properties.color;
        })
        .attr("d", function (d: any) {
          return pathGenerator(d);
        })
        .attr("name", function (d: any) {
          return d.properties.reg_name;
        })
        .attr("avg", function (d: any) {
          return d.properties.avg;
        })
        .attr("color", function (d: any) {
          return d.properties.color;
        })
        .style("stroke", "none")
        .on("mouseover", function (d: any) {
          let avg = d.target.getAttribute("avg");
          let name = d.target.getAttribute("name").toUpperCase();
          let color = d.target.getAttribute("color");
          setModal(name, avg, color);
        })
        .on("mouseleave", function () {
          setModal("", "", "");
        });

      svgMap
        .selectAll("text")
        .data(data.features)
        .enter()
        .append("text")
        .attr("class", "onRegionAvg")
        .attr("x", function (d: any) {
          return pathGenerator.centroid(d)[0] - 5;
        })
        .attr("y", function (d: any) {
          return pathGenerator.centroid(d)[1] + 5;
        })
        .attr("name", function (d: any) {
          return d.properties.reg_name;
        })
        .attr("avg", function (d: any) {
          return d.properties.avg;
        })
        .attr("color", function (d: any) {
          return d.properties.color;
        })
        .text(function (d: any) {
          if (d.properties.avg > 0) {
            return d.properties.avg;
          }
          return "";
        })
        .on("mouseover", function (d: any) {
          let avg = d.target.getAttribute("avg");
          let name = d.target.getAttribute("name").toUpperCase();
          let color = d.target.getAttribute("color");
          setModal(name, avg, color);
        })
        .on("mouseleave", function () {
          setModal("", "", "");
        });

      svgMap
        .append("text")
        .attr("class", "regionName")
        .attr("x", 10)
        .attr("y", mapChartHeight - 70)
        .attr("fill", "var(--color-grey)")
        .text("");

      svgMap
        .append("text")
        .attr("class", "regionAvg")
        .attr("x", 10)
        .attr("y", mapChartHeight - 50)
        .attr("fill", "var(--color-grey)")
        .text("");
    });
  }

  useEffect(() => {
    let data = {
      slug: utilities.getLastItem(window.location.pathname),
    };
    utilities.postCall("platform-trend", JSON.stringify(data)).then((res) => {
      if (res.status) {
        setPlatform(res.data.name);
        chartDataFields = res.data.fields;
        drawScatterPlotChart("platformChart");
        chartDataRegions = res.data.regions;
        drawMapChart("mapChart");
      }
      setShowLoader(false);
    });
  }, []);

  return (
    <>
      <Loader showLoader={showLoader} />
      <IonSlide>
        <IonContent className="page-container platform-trend">
          <h1 className="form-title mt1 mb1">{platform} Trend</h1>
          <IonRow>
            <IonCol className="chartContainer">
              <h3 className="form-title mt0 mb0 black">Per Field</h3>
              <div id="platformChart" className="platform-chart"></div>
              <h3 className="form-title mt3 mb0 black">Per Italian Region</h3>
              <div id="mapChart" className="platform-chart"></div>
              Legend for mapChart here
            </IonCol>
          </IonRow>
        </IonContent>
      </IonSlide>
    </>
  );
};

export default PlatformTrend;
