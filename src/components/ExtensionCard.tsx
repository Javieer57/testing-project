import type { Extension } from "../types/extension";

export const ExtensionCard = ({
  extension,
  onToggle,
}: {
  extension: Extension;
  onToggle: (name: string) => void;
}) => {
  return (
    <li className="border border-neutral-300 rounded-2xl p-5 space-y-6 shadow-md bg-neutral-0">
      <div className="flex gap-4 items-start">
        <img src={extension.logo} alt={`${extension.name} logo`} />

        <div className="space-y-1.5">
          <h2 className="text-xl font-bold">{extension.name}</h2>

          <p className="tracking-[-3%] line-clamp-3 min-h-[calc(var(--leading-normal)_*_3rem)] max-h-[calc(var(--leading-normal)_*_3rem)]">
            {extension.description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 justify-between">
        <button className="transition-colors font-medium py-2 px-4 tracking-[-3%] border rounded-full leading-tight border-neutral-300 hover:border-red-700 hover:text-white hover:bg-red-700 focus:border-red-700 focus:text-white focus:bg-red-700">
          Remove
        </button>

        <button
          type="button"
          className="flex rounded-full p-0.5 h-5 w-9 group bg-neutral-300 aria-checked:bg-red-700 transition-all"
          role="switch"
          aria-checked={extension.isActive}
          onClick={() => onToggle(extension.name)}
        >
          <span className="sr-only">Active extension</span>
          <span className="relative inline-block left-0 rounded-full w-4 h-4 leading-0 bg-white group-aria-checked:left-4 transition-all"></span>
        </button>
      </div>
    </li>
  );
};
