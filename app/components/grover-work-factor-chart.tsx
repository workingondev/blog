import { curveMonotoneX, line, scaleLinear } from "d3";

const keySizes = [64, 96, 128, 160, 192, 256];
const classical = keySizes.map((bits) => ({ bits, work: bits }));
const quantum = keySizes.map((bits) => ({ bits, work: bits / 2 }));

export function GroverWorkFactorChart() {
  const width = 680;
  const height = 330;
  const margin = { top: 30, right: 24, bottom: 52, left: 56 };
  const x = scaleLinear()
    .domain([64, 256])
    .range([margin.left, width - margin.right]);
  const y = scaleLinear()
    .domain([0, 256])
    .range([height - margin.bottom, margin.top]);
  const drawLine = line<{ bits: number; work: number }>()
    .x((point) => x(point.bits))
    .y((point) => y(point.work))
    .curve(curveMonotoneX);
  const xTicks = [64, 128, 192, 256];
  const yTicks = [0, 64, 128, 192, 256];

  return (
    <figure className="research-figure">
      <div className="chart-frame">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-labelledby="grover-chart-title grover-chart-description"
        >
          <title id="grover-chart-title">
            Classical and Grover search work factors by symmetric key size
          </title>
          <desc id="grover-chart-description">
            A classical exhaustive search over an n-bit key requires roughly 2
            to the n operations. Grover search requires roughly 2 to the n over
            2 quantum operations.
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

          {xTicks.map((tick) => (
            <text
              className="chart-label"
              key={tick}
              x={x(tick)}
              y={height - margin.bottom + 25}
              textAnchor="middle"
            >
              {tick}
            </text>
          ))}

          <path className="chart-line chart-line-classical" d={drawLine(classical) ?? ""} />
          <path className="chart-line chart-line-quantum" d={drawLine(quantum) ?? ""} />

          <text
            className="chart-axis-title"
            x={(margin.left + width - margin.right) / 2}
            y={height - 8}
            textAnchor="middle"
          >
            Symmetric key size (bits)
          </text>
          <text
            className="chart-axis-title"
            transform={`translate(15 ${(margin.top + height - margin.bottom) / 2}) rotate(-90)`}
            textAnchor="middle"
          >
            log₂ operations
          </text>

          <g transform={`translate(${width - 190} ${margin.top + 4})`}>
            <line className="chart-line chart-line-classical" x1="0" x2="24" y1="0" y2="0" />
            <text className="chart-label" x="32" y="4">Classical search</text>
            <line className="chart-line chart-line-quantum" x1="0" x2="24" y1="22" y2="22" />
            <text className="chart-label" x="32" y="26">Grover search</text>
          </g>
        </svg>
      </div>
      <figcaption>
        Figure 1. Grover&apos;s quadratic speedup effectively halves the
        exponent of exhaustive key search. Values show asymptotic work factors,
        not physical resource estimates.
      </figcaption>
    </figure>
  );
}
