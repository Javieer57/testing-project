import type { Extension } from "../types/extension";

export const ExtensionCard = ({ extension }: { extension: Extension }) => {
  return (
    <li>
      <div>
        <img src={extension.logo} alt={`${extension.name} logo`} />

        <div>
          <h2>{extension.name}</h2>

          <p>{extension.description}</p>
        </div>
      </div>

      <div>
        <button>Remove</button>

        <button type="button" role="switch" aria-checked={extension.isActive}>
          <span className="sr-only">Active extension</span>
        </button>
      </div>
    </li>
  );
};
