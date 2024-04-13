import { FC, useState } from "react";
import { HTTPRequestOptions } from "../common.type";

interface HTTPRequestOptionSelectorProps {
  sectionTitle: string;
  options: HTTPRequestOptions[];
  setOptions: (options: HTTPRequestOptions[]) => void;
}

const HTTPRequestOptionSelector: FC<HTTPRequestOptionSelectorProps> = ({
  sectionTitle,
  options,
  setOptions,
}) => {
  const [editingElementId, setEditingElementId] = useState("");
  const [editingContent, setEditingContent] = useState("");

  const handleFormFieldChange = (
    index: number,
    key: string,
    value: string | boolean
  ) => {
    const newOptions = [...options];
    newOptions[index] = {
      ...newOptions[index],
      [key]: value,
    };
    setOptions(newOptions);
  };

  const handleRemoveField = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  return (
    <section className="px-4 py-2 w-full flex flex-col gap-2">
      <h3>{sectionTitle}</h3>
      <table className="border border-collapse">
        <thead>
          <tr>
            <th></th>
            <th>Key</th>
            <th>Value</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {options.map(({ isEnabled, name, value }, index) => (
            <tr key={name}>
              <td>
                <input
                  type="checkbox"
                  checked={isEnabled}
                  onChange={(e) => {
                    handleFormFieldChange(index, "isEnabled", e.target.checked);
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="w-full px-2 py-1"
                  value={
                    editingElementId === `${index}-name` ? editingContent : name
                  }
                  onFocus={() => {
                    setEditingContent(name);
                    setEditingElementId(`${index}-name`);
                  }}
                  onChange={(e) => setEditingContent(e.target.value)}
                  onBlur={() =>
                    handleFormFieldChange(index, "name", editingContent)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="w-full px-2 py-1"
                  value={
                    editingElementId === `${index}-value`
                      ? editingContent
                      : value
                  }
                  onFocus={() => {
                    setEditingContent(value);
                    setEditingElementId(`${index}-value`);
                  }}
                  onChange={(e) => setEditingContent(e.target.value)}
                  onBlur={() =>
                    handleFormFieldChange(index, "value", editingContent)
                  }
                />
              </td>
              <td>
                <button
                  className="w-full"
                  onClick={() => handleRemoveField(index)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default HTTPRequestOptionSelector;
