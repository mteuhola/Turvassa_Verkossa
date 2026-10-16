const sizes = [
  { value: "150", label: "Erittäin suuri" },
  { value: "100", label: "Tavallinen" },
  { value: "125", label: "Suuri" },
] as const;

export interface TextSizeProps {
  textSize: string;
  onTextSizeChange: (size: string) => void;
}

export default function TextSizeControl({
  textSize,
  onTextSizeChange,
}: TextSizeProps) {
  const index = sizes.findIndex((size) => size.value === textSize);
  const current = sizes[index];
  const next = sizes[(index + 1) % sizes.length];

  return (
    <button
      className="text-size-control"
      type="button"
      aria-label={`Tekstin koko: ${current.label}. Vaihda kokoon: ${next.label}.`}
      title={`Vaihda kokoon: ${next.label}`}
      onClick={() => onTextSizeChange(next.value)}
    >
      <span className="text-size-control__icon" aria-hidden="true">
        Aa
      </span>
      <span className="text-size-control__text">
        Tekstin koko:{" "}
        <span className="text-size-control__value">{current.label}</span>
      </span>
    </button>
  );
}
