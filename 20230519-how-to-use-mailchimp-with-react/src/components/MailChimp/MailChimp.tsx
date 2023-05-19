import { useState } from 'react';
import jsonp from 'jsonp';

export const MailChimp = () => {
  const [email, setEmail] = useState('');

  const onSubmit = (e: any) => {
    e.preventDefault();
    const url = 'insert-mailchimp-action-url-here';
    jsonp(`${url}&EMAIL=${email}`, { param: 'c' }, (_: any, data: any) => {
      console.log('data', data);
      const { msg } = data;

      alert(msg);
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="EMAIL"
          required
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
