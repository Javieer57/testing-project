type Extension = {
  logo: string;
  name: string;
  description: string;
  isActive: boolean;
};

export type Props = {
  extensions: Extension[];
};

export const BrowserExtensions = ({ extensions }: Props) => {
  return (
    <>
      <h1>Extensions List</h1>

      <ul>
        {extensions.map((ext) => (
          <li key={ext.name}>
            <img src={ext.logo} alt={`${ext.name} logo`} />
            {ext.name}
          </li>
        ))}
      </ul>
    </>
  );
};
