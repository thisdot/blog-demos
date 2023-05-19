import { Routes, Route } from 'react-router-dom';
import { Homepage } from '@/components/Homepage';
import { Counter } from '@/components/Counter';
import { FetchExample } from '@/components/FetchExample';
import { MailChimp } from '@/components/MailChimp';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/button-example" element={<Counter />} />
        <Route path="/rxjs-example" element={<FetchExample />} />
        <Route path="/mailchimp-example" element={<MailChimp />} />
      </Routes>
    </div>
  );
}
