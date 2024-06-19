import { JSX } from "react";

interface ChipProps {
  text: string;
}

export default function Chip({ text }: ChipProps): JSX.Element {
  return (
    <span
      className={
        "block h-fit w-fit rounded-full border border-orange-500 bg-orange-100 px-3 py-1 text-xs"
      }
    >
      {text}
    </span>
  );
}
