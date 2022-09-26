import supportedCurrencies from '../supported-currencies.json' assert { type: 'json' };
import { useState } from 'https://esm.sh/stable/preact@10.11.0/deno/hooks.js';
import AmountInput from '../components/AmountInput.tsx';
import CurrencySelect from '../components/CurrencySelect.tsx';

const currencyCodes = Object.entries(supportedCurrencies.fiats).map(([, currency]) => currency.currency_code);

interface ConverterFormProps {
  amount?: number,
  from?: string,
  to?: string
}

export default function ConverterForm({ amount, from, to }: ConverterFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    amount,
    from,
    to,
  });

  return (
    <form className="" action="/convert" onSubmit={() => setSubmitted(true)}>
      <div className="flex">
        <AmountInput value={form.amount} onChange={(amount) => setForm({ ...form, amount })}></AmountInput>
        <CurrencySelect currencies={currencyCodes} defaultCurrency="USD" name="from" selectedCurrency={form.from}
                        label="From" onChange={(from) => setForm({ ...form, from })}></CurrencySelect>
        <CurrencySelect currencies={currencyCodes} defaultCurrency="EUR" name="to" selectedCurrency={form.to} label="To"
                        onChange={(to) => setForm({ ...form, to })}></CurrencySelect>
      </div>
      <div className="flex items-center justify-center px-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit" disabled={submitted}>
          {submitted ? 'Converting...' : 'Convert'}
        </button>
      </div>
    </form>
  )
}