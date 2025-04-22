
import React, { useState } from "react";

const tunnelTypes = [
  { label: "HTTP", value: "http" },
  { label: "VPN", value: "vpn" },
  { label: "DNS", value: "dns" },
];

const defaultAdvanced = {
  tunnelType: "http",
  customPort: "",
  payload: "",
};

export interface AdvancedOptionsProps {
  onChange?: (options: any) => void;
}

const AdvancedOptions: React.FC<AdvancedOptionsProps> = ({ onChange }) => {
  const [options, setOptions] = useState(defaultAdvanced);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newOptions = { ...options, [name]: value };
    setOptions(newOptions);
    if (onChange) onChange(newOptions);
  };

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm mt-4 bg-white dark:bg-gray-800">
      <h3 className="text-gray-900 dark:text-gray-100 font-semibold text-base mb-3">Opções avançadas</h3>
      <div className="flex flex-col gap-3">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Tipo de túnel
          </label>
          <select
            name="tunnelType"
            value={options.tunnelType}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
          >
            {tunnelTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Porta personalizada (opcional)
          </label>
          <input
            type="number"
            name="customPort"
            placeholder="Ex: 8080"
            value={options.customPort}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Payload customizada (opcional)
          </label>
          <input
            type="text"
            name="payload"
            placeholder="Payload HTTP, se necessário"
            value={options.payload}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
          />
        </div>
      </div>
      <div className="mt-4 text-right text-xs text-gray-500 dark:text-gray-400">by Matheus</div>
    </div>
  );
};

export default AdvancedOptions;
