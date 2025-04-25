// src/components/FieldLines.tsx
const FieldLines = () => {
  return (
    <>
      {/* Líneas externas del campo */}
      <rect
        x="0"
        y="0"
        width="100"
        height="140"
        fill="none"
        stroke="white"
        strokeWidth="0.5"
      />

      {/* Línea media */}
      <line x1="0" y1="70" x2="100" y2="70" stroke="white" strokeWidth="0.3" />

      {/* Círculo central */}
      <circle
        cx="50"
        cy="70"
        r="8"
        fill="none"
        stroke="white"
        strokeWidth="0.3"
      />
      <circle cx="50" cy="70" r="0.7" fill="white" />

      {/* Áreas de portería */}
      {/* Área grande superior */}
      <rect
        x="25"
        y="0"
        width="50"
        height="18"
        fill="none"
        stroke="white"
        strokeWidth="0.3"
      />
      {/* Área chica superior */}
      <rect
        x="35"
        y="0"
        width="30"
        height="6"
        fill="none"
        stroke="white"
        strokeWidth="0.3"
      />
      {/* Punto penal superior */}
      <circle cx="50" cy="12" r="0.5" fill="white" />

      {/* Área grande inferior */}
      <rect
        x="25"
        y="122"
        width="50"
        height="18"
        fill="none"
        stroke="white"
        strokeWidth="0.3"
      />
      {/* Área chica inferior */}
      <rect
        x="35"
        y="134"
        width="30"
        height="6"
        fill="none"
        stroke="white"
        strokeWidth="0.3"
      />
      {/* Punto penal inferior */}
      <circle cx="50" cy="128" r="0.5" fill="white" />
    </>
  );
};

export default FieldLines;
