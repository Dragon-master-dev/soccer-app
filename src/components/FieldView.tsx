import { formation442 } from "../constants/getFormation442";
import FieldLines from "./FieldLines";

type Props = {
  onPositionSelect?: (index: number) => void;
  assignedPlayers?: string[];
};

const FieldView = ({ onPositionSelect, assignedPlayers = [] }: Props) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <svg
        viewBox="0 0 100 140"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
      >
        <FieldLines />

        {formation442.map((pos, index) => (
          <g
            key={index}
            onClick={() => onPositionSelect?.(index)}
            style={{ cursor: "pointer" }}
          >
            <circle
              cx={pos.x}
              cy={pos.y}
              r="5"
              fill="white"
              stroke="rgb(0, 109, 234)"
              strokeWidth="1"
            />
            <text
              x={pos.x}
              y={pos.y + 0.8}
              textAnchor="middle"
              fontFamily="roboto"
              fontSize="4"
              fontWeight="800"
              fill="rgb(73, 93, 111)"
              alignmentBaseline="middle"
            >
              {index + 1}
            </text>
            {assignedPlayers[index] && (
              <text
                x={pos.x}
                y={pos.y + 7}
                textAnchor="middle"
                fontSize="3"
                fill="white"
              >
                {assignedPlayers[index]}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default FieldView;
