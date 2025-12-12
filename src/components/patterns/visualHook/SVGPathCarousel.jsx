import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import * as d3 from "d3";

/**
 * SVG 경로를 따라 요소들이 움직이는 캐러셀 컴포넌트 (D3.js 기반)
 * @param {Object} props
 * @param {string} props.pathType - 경로 유형 ('horizontal', 'circle', 또는 'none')
 * @param {Array} props.elements - 경로를 따라 움직일 요소들의 배열
 * @param {number} props.speed - 애니메이션 속도 (경로 1회 순환 시간, 초 단위, 기본값: 20)
 * @param {number} props.elementSize - 요소의 크기 (픽셀 단위, 기본값: 48)
 * @param {string} props.pathColor - 경로 색상 (기본값: #000000)
 */
const SVGPathCarousel = ({
  pathType = "horizontal",
  elements = [],
  speed = 20, // 초 단위
  elementSize = 48,
  pathColor = "#fff",
}) => {
  const [gradientId] = useState(() => `path-gradient-${Math.random().toString(36).substring(2, 11)}`);
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [previousPathType, setPreviousPathType] = useState(null);
  const [positions, setPositions] = useState([]);
  const [elementOpacities, setElementOpacities] = useState(() =>
    Array(elements.length).fill(0)
  );

  const animationControl = useRef({
    isTransitioning: false,
    currentUpdateTween: null,
  });

  const strokeWidth = pathType === "circle" ? 64 : 0;
  const strokeColor =
    pathType === "circle" ? `url(#${gradientId})` : pathColor;

  const TIMING = {
    EXIT_DURATION: 800,
    PATH_TRANSITION_DURATION: 600,
    ENTER_DURATION: 800,
    EXIT_TO_PATH_DELAY: 0,
    PATH_TO_ENTER_DELAY: 0,
    UPDATE_LOOP_INTERVAL: speed * 1000,
  };

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    return () => {
      if (svgRef.current) {
        d3.select(svgRef.current).selectAll("*").interrupt();
      }
      animationControl.current.currentUpdateTween = null;
    };
  }, []);

  const generatePathData = (type, width, height) => {
    if (width === 0 || height === 0) return "";
    switch (type) {
      case "horizontal":
        return `M0,${height / 2} L${width},${height / 2}`;
      case "circle": {
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) * 0.35;
        return `M${centerX},${
          centerY - radius
        } A${radius},${radius} 0 1,1 ${centerX},${
          centerY + radius
        } A${radius},${radius} 0 1,1 ${centerX},${centerY - radius}`;
      }
      case "none":
        return "";
      default:
        return `M0,${height / 2} L${width},${height / 2}`;
    }
  };

  const createCustomInterpolator = (
    fromPath,
    toPath,
    fromType,
    toType,
    width,
    height
  ) => {
    const defaultInterpolator = d3.interpolate(fromPath, toPath);

    if (fromType === "none" || toType === "none") {
      return defaultInterpolator;
    }

    if (fromType === "horizontal" && toType === "circle") {
      return (t) => {
        if (t === 0) return fromPath;
        if (t === 1) return toPath;

        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) * 0.35;

        const easedT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        const currentRadius = radius * easedT;
        const archHeight = centerY * easedT * 0.8;
        const endPointsMove = width * 0.5 * (1 - easedT);
        const leftX = centerX - endPointsMove;
        const rightX = centerX + endPointsMove;
        const c = currentRadius * 0.551915;

        if (easedT < 0.5) {
          const bottomControlY = centerY + archHeight;
          const topControlY = centerY - archHeight * easedT * 2;
          return `M${leftX},${centerY} Q${centerX},${bottomControlY} ${rightX},${centerY} Q${centerX},${topControlY} ${leftX},${centerY}`;
        } else {
          return `M${centerX},${centerY - currentRadius} C${centerX + c},${
            centerY - currentRadius
          } ${centerX + currentRadius},${centerY - c} ${
            centerX + currentRadius
          },${centerY} C${centerX + currentRadius},${centerY + c} ${
            centerX + c
          },${centerY + currentRadius} ${centerX},${centerY + currentRadius} C${
            centerX - c
          },${centerY + currentRadius} ${centerX - currentRadius},${
            centerY + c
          } ${centerX - currentRadius},${centerY} C${centerX - currentRadius},${
            centerY - c
          } ${centerX - c},${centerY - currentRadius} ${centerX},${
            centerY - currentRadius
          }`;
        }
      };
    }

    if (fromType === "circle" && toType === "horizontal") {
      return (t) => {
        if (t === 0) return fromPath;
        if (t === 1) return toPath;
        const invertedT = 1 - t;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) * 0.35;
        const easedT =
          invertedT < 0.5
            ? 2 * invertedT * invertedT
            : -1 + (4 - 2 * invertedT) * invertedT;
        const currentRadius = radius * easedT;
        const archHeight = centerY * easedT * 0.8;
        const endPointsMove = width * 0.5 * (1 - easedT);
        const leftX = centerX - endPointsMove;
        const rightX = centerX + endPointsMove;
        const c = currentRadius * 0.551915;

        if (easedT < 0.5) {
          const bottomControlY = centerY + archHeight;
          const topControlY = centerY - archHeight * easedT * 2;
          return `M${leftX},${centerY} Q${centerX},${bottomControlY} ${rightX},${centerY} Q${centerX},${topControlY} ${leftX},${centerY}`;
        } else {
          return `M${centerX},${centerY - currentRadius} C${centerX + c},${
            centerY - currentRadius
          } ${centerX + currentRadius},${centerY - c} ${
            centerX + currentRadius
          },${centerY} C${centerX + currentRadius},${centerY + c} ${
            centerX + c
          },${centerY + currentRadius} ${centerX},${centerY + currentRadius} C${
            centerX - c
          },${centerY + currentRadius} ${centerX - currentRadius},${
            centerY + c
          } ${centerX - currentRadius},${centerY} C${centerX - currentRadius},${
            centerY - c
          } ${centerX - c},${centerY - currentRadius} ${centerX},${
            centerY - currentRadius
          }`;
        }
      };
    }
    return defaultInterpolator;
  };

  const getPointOnPath = (pathElem, percentage) => {
    try {
      if (!pathElem || typeof pathElem.getTotalLength !== "function")
        return { x: 0, y: 0, angle: 0 };
      const pathLength = pathElem.getTotalLength();
      if (!pathLength || pathLength <= 0 || isNaN(pathLength))
        return { x: 0, y: 0, angle: 0 };

      const clampedPercentage = Math.max(0, Math.min(100, percentage));
      const distance = pathLength * (clampedPercentage / 100);
      const point = pathElem.getPointAtLength(distance);

      let angle = 0;
      if (clampedPercentage < 99.9 && pathLength > 0) {
        const nextDistance = pathLength * ((clampedPercentage + 0.1) / 100);
        const nextPoint = pathElem.getPointAtLength(
          Math.min(nextDistance, pathLength)
        );
        if (nextPoint.x !== point.x || nextPoint.y !== point.y) {
          angle =
            Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) *
            (180 / Math.PI);
        }
      } else if (clampedPercentage >= 99.9 && pathLength > 0) {
        const prevDistance = pathLength * ((clampedPercentage - 0.1) / 100);
        const prevPoint = pathElem.getPointAtLength(Math.max(0, prevDistance));
        if (point.x !== prevPoint.x || point.y !== prevPoint.y) {
          angle =
            Math.atan2(point.y - prevPoint.y, point.x - prevPoint.x) *
            (180 / Math.PI);
        }
      }
      return { x: point.x, y: point.y, angle };
    } catch (error) {
      console.warn("Error calculating point on path:", error);
      return { x: 0, y: 0, angle: 0 };
    }
  };

  const startUpdateAnimation = (initialPositions) => {
    if (animationControl.current.currentUpdateTween) {
      animationControl.current.currentUpdateTween.interrupt();
      animationControl.current.currentUpdateTween = null;
    }

    if (
      !pathRef.current ||
      elements.length === 0 ||
      animationControl.current.isTransitioning ||
      pathType === "none"
    ) {
      return;
    }

    setPositions(initialPositions);

    const virtualTarget = d3
      .select(svgRef.current)
      .selectAll(".virtual-update-tracker")
      .data([0]);
    const virtualEnter = virtualTarget
      .enter()
      .append("g")
      .attr("class", "virtual-update-tracker");
    const virtualUpdate = virtualEnter.merge(virtualTarget);

    let currentLoopPositions = [...initialPositions];

    const runUpdateLoop = () => {
      const thisTween = virtualUpdate
        .transition()
        .duration(TIMING.UPDATE_LOOP_INTERVAL)
        .ease(d3.easeLinear)
        .tween("update-elements", () => {
          const startPositionsForTween = [...currentLoopPositions];
          const interpolators = startPositionsForTween.map((startPos) =>
            d3.interpolateNumber(startPos, startPos + 100)
          );

          return (t) => {
            if (!pathRef.current) return;

            const nextTickPositions = interpolators.map(
              (interp) => interp(t) % 100
            );
            currentLoopPositions = nextTickPositions;
            setPositions(nextTickPositions);

            let allOpacitiesAreOne = true;
            nextTickPositions.forEach((p, index) => {
              try {
                const pos = getPointOnPath(pathRef.current, p);
                const scaleValue =
                  pathType === "horizontal" ? 1 + (p / 100) * 0.8 : 1;
                const gElement = svgRef.current?.querySelector(
                  `#carousel-item-${index}`
                );
                if (gElement) {
                  d3.select(gElement).attr(
                    "transform",
                    `translate(${pos.x},${pos.y}) rotate(${pos.angle}) scale(${scaleValue})`
                  );
                  if (elementOpacities[index] !== 1) {
                    allOpacitiesAreOne = false;
                  }
                }
              } catch (error) {
                console.warn(
                  `Error updating item ${index} in update tween:`,
                  error
                );
              }
            });
            if (!allOpacitiesAreOne) {
              setElementOpacities(new Array(elements.length).fill(1));
            }
          };
        })
        .on("end", () => {
          if (!animationControl.current.isTransitioning) {
            runUpdateLoop();
          }
        })
        .on("interrupt", () => {
          animationControl.current.currentUpdateTween = null;
        });

      animationControl.current.currentUpdateTween = thisTween;
    };

    runUpdateLoop();
  };

  const startEnterAnimation = () => {
    animationControl.current.isTransitioning = true;
    if (!pathRef.current || elements.length === 0 || pathType === "none") {
      animationControl.current.isTransitioning = false;
      return;
    }

    const targetPositions = elements.map((_, i) => (i / elements.length) * 100);

    const virtualTarget = d3
      .select(svgRef.current)
      .selectAll(".virtual-enter-tracker")
      .data([0]);
    const virtualEnter = virtualTarget
      .enter()
      .append("g")
      .attr("class", "virtual-enter-tracker");

    elements.forEach((_, index) => {
      const gElement = svgRef.current?.querySelector(`#carousel-item-${index}`);
      if (gElement) {
        try {
          d3.select(gElement).style("opacity", 0);
        } catch (error) {
          console.warn(
            `Error setting initial state for item ${index} during enter:`,
            error
          );
        }
      }
    });
    setElementOpacities(new Array(elements.length).fill(0));

    virtualEnter
      .merge(virtualTarget)
      .transition()
      .duration(TIMING.ENTER_DURATION)
      .ease(d3.easeElastic.period(0.5))
      .tween("enter-elements", () => {
        const posInterpolators = targetPositions.map((target) =>
          d3.interpolateNumber(0, target)
        );
        const opacityInterpolator = d3.interpolateNumber(0, 1);

        return (t) => {
          if (!pathRef.current) return;

          const baseOpacity = opacityInterpolator(t);
          const nextTickOpacityValue =
            pathType === "horizontal" ? baseOpacity : 1;
          const nextTickOpacities = new Array(elements.length).fill(
            nextTickOpacityValue
          );
          setElementOpacities(nextTickOpacities);

          posInterpolators.forEach((interp, index) => {
            const p = interp(t);
            const scaleValue =
              pathType === "horizontal" ? 1 + (p / 100) * 0.8 : 1;
            try {
              const pos = getPointOnPath(pathRef.current, p);
              const gElement = svgRef.current?.querySelector(
                `#carousel-item-${index}`
              );
              if (gElement) {
                d3.select(gElement)
                  .attr(
                    "transform",
                    `translate(${pos.x},${pos.y}) rotate(${pos.angle}) scale(${scaleValue})`
                  )
                  .style("opacity", nextTickOpacityValue);
              }
            } catch (error) {
              console.warn(
                `Error updating item ${index} during enter tween:`,
                error
              );
            }
          });
        };
      })
      .on("end", () => {
        animationControl.current.isTransitioning = false;
        setPositions(targetPositions);
        setElementOpacities(new Array(elements.length).fill(1));
        targetPositions.forEach((p, index) => {
          const gElement = svgRef.current?.querySelector(
            `#carousel-item-${index}`
          );
          if (gElement) {
            try {
              const pos = getPointOnPath(pathRef.current, p);
              const finalScale =
                pathType === "horizontal" ? 1 + (p / 100) * 0.8 : 1;
              d3.select(gElement)
                .attr(
                  "transform",
                  `translate(${pos.x},${pos.y}) rotate(${pos.angle}) scale(${finalScale})`
                )
                .style("opacity", 1);
            } catch (error) {
              console.warn(
                `Error setting final state for item ${index}:`,
                error
              );
            }
          }
        });

        if (pathType !== "none") {
          startUpdateAnimation(targetPositions);
        }
      })
      .on("interrupt", () => {
        animationControl.current.isTransitioning = false;
        setPositions(targetPositions);
        setElementOpacities(new Array(elements.length).fill(1));
        elements.forEach((_, index) => {
          const gElement = svgRef.current?.querySelector(
            `#carousel-item-${index}`
          );
          if (gElement) {
            d3.select(gElement).style("opacity", 1);
          }
        });
      });
  };

  const startPathTransition = (oldPathData, newPathData, oldPathType) => {
    animationControl.current.isTransitioning = true;

    if (!pathRef.current) {
      animationControl.current.isTransitioning = false;
      setTimeout(startEnterAnimation, TIMING.PATH_TO_ENTER_DELAY);
      return;
    }

    const pathSelection = d3.select(pathRef.current);
    const currentD = pathSelection.attr("d") || "";

    pathSelection
      .transition()
      .delay(TIMING.EXIT_TO_PATH_DELAY)
      .duration(TIMING.PATH_TRANSITION_DURATION)
      .ease(d3.easeBounce)
      .attrTween("d", () => {
        return createCustomInterpolator(
          currentD,
          newPathData,
          oldPathType,
          pathType,
          dimensions.width,
          dimensions.height
        );
      })
      .attr("stroke-width", strokeWidth)
      .attr("stroke", strokeColor)
      .on("end", () => {
        setPreviousPathType(pathType);
        setTimeout(startEnterAnimation, TIMING.PATH_TO_ENTER_DELAY);
      })
      .on("interrupt", () => {
        animationControl.current.isTransitioning = false;
        if (pathRef.current) {
          d3.select(pathRef.current)
            .attr("d", newPathData || "")
            .attr("stroke-width", strokeWidth)
            .attr("stroke", strokeColor);
        }
        setPreviousPathType(pathType);
        startEnterAnimation();
      });
  };

  const startExitAnimation = (callback) => {
    animationControl.current.isTransitioning = true;
    if (!pathRef.current || elements.length === 0) {
      animationControl.current.isTransitioning = false;
      if (callback) callback();
      return;
    }

    const startPositions = [...positions];
    const startOpacities = [...elementOpacities];
    const currentTransforms = [];
    elements.forEach((_, index) => {
      const gElement = svgRef.current?.querySelector(`#carousel-item-${index}`);
      currentTransforms.push(
        gElement
          ? d3.select(gElement).attr("transform")
          : "translate(0,0) rotate(0) scale(1)"
      );
    });
    const extractScale = (transformString) => {
      const match = transformString?.match(/scale\(([^)]+)\)/);
      return match ? parseFloat(match[1]) : 1;
    };
    const startScales = currentTransforms.map(extractScale);

    const virtualTarget = d3
      .select(svgRef.current)
      .selectAll(".virtual-exit-tracker")
      .data([0]);
    const virtualEnter = virtualTarget
      .enter()
      .append("g")
      .attr("class", "virtual-exit-tracker");
    virtualEnter
      .merge(virtualTarget)
      .transition()
      .duration(TIMING.EXIT_DURATION)
      .ease(d3.easeBack.overshoot(1.5))
      .tween("exit-elements", () => {
        const posInterpolators = startPositions.map((start) =>
          d3.interpolateNumber(start, 100)
        );
        const scaleInterpolators = startScales.map((start) =>
          d3.interpolateNumber(start, 1)
        );
        const opacityInterpolators = startOpacities.map((start) =>
          d3.interpolateNumber(start, 0)
        );

        return (t) => {
          if (!pathRef.current) return;

          const nextTickOpacitiesValues = opacityInterpolators.map((interp) =>
            Math.max(0, interp(t))
          );
          const finalOpacities =
            pathType === "horizontal"
              ? nextTickOpacitiesValues
              : new Array(elements.length).fill(1);
          setElementOpacities(finalOpacities);

          posInterpolators.forEach((interpPos, index) => {
            const p = interpPos(t);
            const nextTickScale = scaleInterpolators[index](t);
            try {
              const pos = getPointOnPath(pathRef.current, p);
              const gElement = svgRef.current?.querySelector(
                `#carousel-item-${index}`
              );
              if (gElement) {
                const finalOpacity = finalOpacities[index];
                d3.select(gElement)
                  .attr(
                    "transform",
                    `translate(${pos.x},${pos.y}) rotate(${pos.angle}) scale(${nextTickScale})`
                  )
                  .style("opacity", finalOpacity);
              }
            } catch (error) {
              console.warn(
                `Error updating item ${index} during exit tween:`,
                error
              );
            }
          });
        };
      })
      .on("end", () => {
        animationControl.current.isTransitioning = false;
        elements.forEach((_, index) => {
          const gElement = svgRef.current?.querySelector(
            `#carousel-item-${index}`
          );
          if (gElement) {
            d3.select(gElement).style("opacity", 0);
          }
        });
        setElementOpacities(new Array(elements.length).fill(0));
        if (callback) callback();
      })
      .on("interrupt", () => {
        animationControl.current.isTransitioning = false;
        elements.forEach((_, index) => {
          const gElement = svgRef.current?.querySelector(
            `#carousel-item-${index}`
          );
          if (gElement) {
            d3.select(gElement).style("opacity", 0);
          }
        });
        setElementOpacities(new Array(elements.length).fill(0));
        if (callback) callback();
      });
  };

  useEffect(() => {
    const { width, height } = dimensions;
    if (width === 0 || height === 0 || elements.length === 0) return;

    const newPathData = generatePathData(pathType, width, height);

    if (previousPathType === null) {
      setPreviousPathType(pathType);
      if (pathRef.current) {
        d3.select(pathRef.current)
          .attr("d", newPathData || "")
          .attr("stroke-width", strokeWidth)
          .attr("stroke", strokeColor);
      }

      if (pathType !== "none") {
        const targetPositions = elements.map(
          (_, i) => (i / elements.length) * 100
        );
        setPositions(targetPositions);
        setElementOpacities(new Array(elements.length).fill(1));

        if (pathRef.current && svgRef.current) {
          try {
            targetPositions.forEach((p, index) => {
              const pos = getPointOnPath(pathRef.current, p);
              const initialScale =
                pathType === "horizontal" ? 1 + (p / 100) * 0.8 : 1;
              const gElement = svgRef.current.querySelector(
                `#carousel-item-${index}`
              );
              if (gElement) {
                d3.select(gElement)
                  .attr(
                    "transform",
                    `translate(${pos.x},${pos.y}) rotate(${pos.angle}) scale(${initialScale})`
                  )
                  .style("opacity", 1);
              }
            });
          } catch (error) {
            console.warn("Error setting initial element positions:", error);
          }
        }

        startUpdateAnimation(targetPositions);
      }
    } else if (pathType !== previousPathType) {
      if (svgRef.current) {
        d3.select(svgRef.current).selectAll("*").interrupt();
      }
      animationControl.current.isTransitioning = true;

      startExitAnimation(() => {
        startPathTransition(null, newPathData, previousPathType);
      });
    } else {
      const currentDOM_d = pathRef.current
        ? d3.select(pathRef.current).attr("d")
        : null;
      if (currentDOM_d !== newPathData) {
        if (svgRef.current) {
          d3.select(svgRef.current).selectAll("*").interrupt();
        }
        animationControl.current.currentUpdateTween = null;

        if (pathRef.current) {
          d3.select(pathRef.current).attr("d", newPathData || "");
        }
        if (pathType !== "none") {
          startUpdateAnimation(positions);
        }
      }
    }
  }, [
    pathType,
    dimensions,
    elements.length,
    strokeWidth,
    strokeColor,
    pathColor,
  ]);

  // pathColor 변경시 즉시 그라데이션 업데이트
  useEffect(() => {
    // console.log("🎨 pathColor 변경:", pathColor);
    
    if (svgRef.current) {
      const gradient = svgRef.current.querySelector(`#${gradientId}`);
      if (gradient) {
        const stops = gradient.querySelectorAll("stop");
        stops.forEach(stop => {
          stop.setAttribute("stop-color", pathColor);
        });
        console.log("✅ 그라데이션 강제 업데이트 완료");
      }
    }
  }, [pathColor]);
  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        overflow: "hidden",
        zIndex: 9,
        pointerEvents: pathType === "none" ? "none" : "all",
      }}
    >
      {dimensions.width > 0 && dimensions.height > 0 && (
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          style={{
            position: "absolute",
            pointerEvents: pathType === "none" ? "none" : "all",
          }}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id={gradientId}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              {/* 시작: pathColor */}
              <stop
                offset="0%"
                stopColor={pathColor}
                style={{
                  stopOpacity: 0.1,
                }}
              />
              {/* 중간: pathColor, 반투명 */}
              <stop
                offset="50%"
                stopColor={pathColor}
                style={{
                  stopOpacity: 0.02,
                }}
              />
              <stop
                offset="100%"
                stopColor={pathColor}
                style={{
                  stopOpacity: 0.1,
                }}
              />
            </linearGradient>
          </defs>

          <path
            ref={pathRef}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            style={{
              pointerEvents: "none",
            }}
          />

          {elements.map((element, index) => {
            const opacity = elementOpacities[index] ?? 0;
            const translateY =
              pathType === "circle"
                ? -elementSize + strokeWidth / 3
                : -elementSize / 2;

            return (
              <g
                key={index}
                id={`carousel-item-${index}`}
                style={{
                  opacity: opacity,
                  pointerEvents: pathType === "none" ? "none" : "all",
                  cursor: "pointer",
                }}
              >
                <g
                  transform={`translate(${-elementSize / 2}, ${translateY})`}
                  style={{
                    pointerEvents: pathType === "none" ? "none" : "all",
                  }}
                >
                  {element}
                </g>
              </g>
            );
          })}
        </svg>
      )}
    </Box>
  );
};

SVGPathCarousel.propTypes = {
  pathType: PropTypes.oneOf(["horizontal", "circle", "none"]),
  elements: PropTypes.arrayOf(PropTypes.node).isRequired,
  speed: PropTypes.number,
  elementSize: PropTypes.number,
  pathColor: PropTypes.string,
};

export default SVGPathCarousel;
