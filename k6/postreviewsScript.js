/* eslint-disable func-names */
/* eslint-disable import/no-unresolved */

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { vus: 5 },
    { duration: '10s', target: 500 },
    { duration: '30s', target: 10000 },
    { duration: '10s', target: 500 },
  ],
};

export default function () {
  const productID = Math.floor(Math.random() * 100000 + 10000);
  const data = {
    product_id: productID,
    rating: 4,
    summary: 'This is a. summary',
    body: 'This is a test body',
    recommend: true,
    name: 'Mr. Testerson',
    email: 'testerson@gmail.com',
    photos: ['urlnumber1'],
    characteristics: { 14: 4, 13: 2 },
  };
  const res = http.post('http://localhost:3000/reviews', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
  check(res, { 'status was 204': (r) => r.status === 204 });
  sleep(1);
}
