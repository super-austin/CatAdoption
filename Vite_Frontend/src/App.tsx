import { FC, useState } from "react";
import URLBar from "./components/URLBar";
import { HTTPMethodEnum } from "./common.type";

const App: FC = () => {
  const [url, setUrl] = useState("");
  const [methods, setMethods] = useState(HTTPMethodEnum.GET);
  const [paramList, setParamList] = useState([]);

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
    </main>
  );
};

export default App;
