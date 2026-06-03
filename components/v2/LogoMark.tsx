/*
  log0 convergence mark: a field of faint log-dots streaming through lines into
  one solid incident dot — "many logs → one incident". One color, scales to a
  16px favicon.
*/
export function LogoMark({
  className = "",
  color = "#ff4a00",
}: {
  className?: string;
  color?: string;
}) {
  // 3x3 grid of faint "log" dots on the left
  const cols = [3, 8, 13];
  const rows = [5, 12, 19];
  const core = { x: 23, y: 12 };
  return (
    <svg
      viewBox="0 0 28 24"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {/* converging lines from the rightmost column into the core */}
      <g stroke={color} strokeWidth="0.9" opacity="0.4">
        {rows.map((y) => (
          <line key={y} x1={13} y1={y} x2={core.x} y2={core.y} />
        ))}
      </g>
      {/* faint log dots */}
      <g fill={color}>
        {cols.map((x) =>
          rows.map((y) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r={1.1}
              opacity={0.28 + (x / 13) * 0.22}
            />
          ))
        )}
      </g>
      {/* the one incident: halo + solid core */}
      <circle cx={core.x} cy={core.y} r={4.2} fill={color} opacity={0.18} />
      <circle cx={core.x} cy={core.y} r={2.6} fill={color} />
    </svg>
  );
}
