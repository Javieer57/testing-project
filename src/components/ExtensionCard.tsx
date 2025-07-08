import type { Extension } from "../types/extension";
import { useRef, useState } from "react";

interface Props {
  extension: Extension;
  onToggle: (name: string) => void;
  onRemove: (name: string) => void;
}

export const ExtensionCard = ({ extension, onToggle, onRemove }: Props) => {
  const [isSwitching, setIsSwitching] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = (name: string) => {
    if (isSwitching && timeoutRef.current) {
      // User cancels before changes apply
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setIsSwitching(false);
      return;
    }

    // User starts changes
    setIsSwitching(true);
    timeoutRef.current = setTimeout(() => {
      onToggle(name);
      timeoutRef.current = null;
      setIsSwitching(false);
    }, 500);
  };

  const visualActive = isSwitching ? !extension.isActive : extension.isActive;

  return (
    <li className="bg-neutral-0 space-y-6 rounded-2xl border border-neutral-300 p-5 shadow-md">
      <div className="flex items-start gap-4">
        <img src={extension.logo} alt={`${extension.name} logo`} />

        <div className="space-y-1.5">
          <h2 className="text-xl font-bold">{extension.name}</h2>

          <p className="line-clamp-3 max-h-[calc(var(--leading-normal)_*_3rem)] min-h-[calc(var(--leading-normal)_*_3rem)] tracking-[-3%]">
            {extension.description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <button
          className="pill-button"
          onClick={() => onRemove(extension.name)}
        >
          Remove <span className="sr-only">{extension.name} extension</span>
        </button>

        <button
          type="button"
          className="group flex h-5 w-9 rounded-full bg-neutral-300 p-0.5 transition-all aria-checked:bg-red-700"
          role="switch"
          aria-checked={visualActive}
          onClick={() => handleClick(extension.name)}
        >
          <span className="sr-only">Active extension</span>
          <span className="relative left-0 inline-block h-4 w-4 rounded-full bg-white leading-0 transition-all group-aria-checked:left-4"></span>
        </button>
      </div>
    </li>
  );
};
