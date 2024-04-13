import { FC, ChangeEvent } from "react";
import { HTTPMethodEnum } from "../../common.type";

interface URLBarProps {
  methods: HTTPMethodEnum;
  url: string;
  setMethods: (methods: HTTPMethodEnum) => void;
  setUrl: (url: string) => void;
  sendRequest: () => void;
}

const URLBar: FC<URLBarProps> = ({
  methods,
  url,
  setMethods,
  setUrl,
  sendRequest,
}) => {
  const handleMethodChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setMethods(e.target.value as HTTPMethodEnum);
  };

  const handleSubmit = () => {
    sendRequest();
  };

  return (
    <div className="flex w-full gap-2 items-center px-4 py-2">
      <select
        className="border border-solid px-2 py-1"
        value={methods}
        onChange={handleMethodChange}
      >
        {Object.keys(HTTPMethodEnum).map((method) => (
          <option value={method} key={method}>
            {method}
          </option>
        ))}
      </select>

      <input
        className="border border-solid px-2 py-1 w-full"
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        className="px-8 py-1 text-xl bg-sky-600 hover:bg-sky-700 text-white rounded"
        onClick={handleSubmit}
      >
        Send
      </button>
    </div>
  );
};

export default URLBar;
