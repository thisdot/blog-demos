interface CurrencySelectProps {
  name: string;
  currencies: string[];
  selectedCurrency?: string;
  defaultCurrency: string;
  label: string;
  onChange: (newValue: string) => void
}

export default function CurrencySelect({ name, currencies, defaultCurrency, selectedCurrency, label, onChange }: CurrencySelectProps) {
  return (
    <div className="mb-6 px-1">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      <select
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        name={name}
        onChange={(e: any) => onChange(e.target.value)}>
        {currencies.map((currency) => <option key={currency} selected={selectedCurrency ? selectedCurrency === currency : currency === defaultCurrency}
                                                 value={currency}>{currency}</option>)}
      </select>
    </div>
  );
}