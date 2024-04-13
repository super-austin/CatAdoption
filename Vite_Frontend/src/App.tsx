import { FC, useState } from "react";

import URLBar from "./components/URLBar";
import { HTTPMethodEnum, HTTPRequestOptions } from "./common.type";
import HTTPRequestOptionSelector from "./components/HTTPRequestOptionSelector";
import "jsoneditor-react/es/editor.min.css";

const App: FC = () => {
  const [url, setUrl] = useState("");
  const [methods, setMethods] = useState(HTTPMethodEnum.GET);
  const [headers, setHeaders] = useState<HTTPRequestOptions[]>([
    {
      isEnabled: true,
      name: "Content-Type",
      value: "application/json",
    },
  ]);
  const [params, setParams] = useState<HTTPRequestOptions[]>([]);
  const [body, setBody] = useState("");
  const [result, setResult] = useState("");

  const sendRequest = async () => {
    const requestURL =
      url +
      "?" +
      new URLSearchParams(params.map((param) => [param.name, param.value]));

    const response = await fetch(requestURL, {
      method: methods,
      headers: headers
        .filter(({ isEnabled }) => isEnabled)
        .reduce((result, { name, value }) => {
          result[name] = value;
          return result;
        }, {} as Record<string, string>),
      body,
    });

    if (response.status !== 200) {
      setResult(`Error: ${response.status}-${response.statusText}`);
    } else {
      const responseText = await response.text();
      setResult(responseText);
    }
  };

  return (
    <main className="w-full flex flex-col items-center p-10 gap-4">
      <h1 className="underline mb-3">Cat Adoption Frontend</h1>
      <URLBar
        methods={methods}
        url={url}
        setMethods={setMethods}
        setUrl={setUrl}
        sendRequest={sendRequest}
      />
      <HTTPRequestOptionSelector
        sectionTitle="Headers"
        options={headers}
        setOptions={setHeaders}
      />
      <HTTPRequestOptionSelector
        sectionTitle="Params"
        options={params}
        setOptions={setParams}
      />
      <section className="px-4 py-2 w-full">
        <h3>Body</h3>
        <textarea
          className="border border-solid w-full p-2"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={10}
        />
      </section>
      <section className="px-4 py-2 w-full">
        <h3>Result</h3>
        <textarea
          className="border border-solid w-full p-2"
          value={result}
          rows={10}
          readOnly
        />
      </section>
    </main>
  );
};

export default App;
