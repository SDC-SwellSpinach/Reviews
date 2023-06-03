/* eslint-disable func-names */
/* eslint-disable import/no-unresolved */

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { vus: 1 },
    { duration: '10s', target: 50 },
    { duration: '30s', target: 1000 },
    { duration: '10s', target: 50 },
  ],
};

export default function () {
  const productID = Math.floor(Math.random() * 10000 + 10000);
  const res = http.get(`http://localhost:3000/reviews?page=1&count=5&sort=helpful&product_id=${productID}`, {
    tags: { name: 'Get Reviews for given product' },
  });
  check(res, { 'status was 200': (r) => r.status === 200 });
  sleep(1);
}
