import * as React from "react";

const SvgCross = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 127.95 127.95"
    {...props}
  >
    <defs>
      <style>{".cross_svg__cls-1{fill:#fefefe}"}</style>
    </defs>
    <g id="cross_svg__Capa_2" data-name="Capa 2">
      <g id="cross_svg__Capa_1-2" data-name="Capa 1">
        <rect
          className="cross_svg__cls-1"
          x={56.05}
          y={-23.22}
          width={15.85}
          height={174.38}
          rx={7.93}
          transform="rotate(45 63.973 63.969)"
        />
        <rect
          className="cross_svg__cls-1"
          x={56.05}
          y={-23.22}
          width={15.85}
          height={174.38}
          rx={7.93}
          transform="rotate(-45 63.969 63.973)"
        />
      </g>
    </g>
  </svg>
);

export default SvgCross;
