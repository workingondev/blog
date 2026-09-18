const values = [1, 7, 4, 13, 1, 7, 4, 13, 1];

export function ShorPeriodChart() {
  const width = 680;
  const height = 340;
  const margin = { top: 34, right: 32, bottom: 58, left: 52 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const x = (index: number) => margin.left + (index / 8) * plotWidth;
  const y = (value: number) =>
    margin.top + plotHeight - (value / 15) * plotHeight;
  const yTicks = [0, 5, 10, 15];
  const path = values
    .map((value, index) => `${index === 0 ? "M" : "L"}${x(index)},${y(value)}`)
    .join(" ");

  return (
    <figure className="research-figure">
      <div className="chart-frame">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-labelledby="period-chart-title period-chart-description"
        >
          <title id="period-chart-title">
            The repeating values of seven to the power x modulo fifteen
          </title>
          <desc id="period-chart-description">
            The sequence 1, 7, 4, 13 repeats every four steps, so its period is
            four.
          </desc>

          {yTicks.map((tick) => (
            <g key={tick}>
              <line
                className="chart-grid-line"
                x1={margin.left}
                x2={width - margin.right}
                y1={y(tick)}
                y2={y(tick)}
              />
              <text
                className="chart-label"
                x={margin.left - 12}
                y={y(tick) + 4}
                textAnchor="end"
              >
                {tick}
              </text>
            </g>
          ))}

          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((tick) => (
            <text
              className="chart-label"
              key={tick}
              x={x(tick)}
              y={height - margin.bottom + 27}
              textAnchor="middle"
            >
              {tick}
            </text>
          ))}

          {[0, 4, 8].map((tick) => (
            <line
              className="period-boundary"
              key={tick}
              x1={x(tick)}
              x2={x(tick)}
              y1={margin.top}
              y2={height - margin.bottom}
            />
          ))}

          <path className="period-line" d={path} />

          {values.map((value, index) => (
            <g key={`${index}-${value}`}>
              <circle className="period-point" cx={x(index)} cy={y(value)} r="4" />
              <text
                className="period-value"
                x={x(index)}
                y={y(value) - 12}
                textAnchor="middle"
              >
                {value}
              </text>
            </g>
          ))}

          <path
            className="period-bracket"
            d={`M${x(0)},${margin.top - 8} v-8 H${x(4)} v8`}
          />
          <text
            className="period-caption"
            x={(x(0) + x(4)) / 2}
            y={margin.top - 20}
            textAnchor="middle"
          >
            period r = 4
          </text>

          <text
            className="chart-axis-title"
            x={(margin.left + width - margin.right) / 2}
            y={height - 10}
            textAnchor="middle"
          >
            exponent x
          </text>
          <text
            className="chart-axis-title"
            transform={`translate(15 ${(margin.top + height - margin.bottom) / 2}) rotate(-90)`}
            textAnchor="middle"
          >
            7ˣ mod 15
          </text>
        </svg>
      </div>
      <figcaption>
        Figure 1. The values of 7ˣ mod 15 repeat after four steps. Shor&apos;s
        quantum subroutine is designed to recover this hidden period efficiently.
      </figcaption>
    </figure>
  );
}
