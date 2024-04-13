import { FC, useState } from "react";
import URLBar from "./components/URLBar";
import { HTTPMethodEnum, HTTPRequestOptions } from "./common.type";
import HTTPRequestOptionSelector from "./components/HTTPRequestOptionSelector";

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

  const sendRequest = () => {
    alert("Submit Request");
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
    </main>
  );
};

export default App;
