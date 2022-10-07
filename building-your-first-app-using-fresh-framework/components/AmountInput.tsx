interface AmountInputProps {
  value?: number;
  onChange: (newValue: string) => void
}

export default function AmountInput({ value, onChange }: AmountInputProps) {
  return (
    <div className="mb-4 px-1">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
        Amount
      </label>
      <input
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="amount" name="amount" type="number" placeholder="0.0" value={value || 0} required onChange={(e: any) => onChange(e.target.value)} />
    </div>
  );
}