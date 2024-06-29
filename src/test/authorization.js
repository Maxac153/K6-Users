import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5s', target: 1 },
    { duration: '5s', target: 2 },
    { duration: '5s', target: 1 }
  ],
  noConnectionReuse: true
};

export default function () {
  const json_date = {
    "login": "manager@mail.ru",
    "password": "1"
  }
  const base_url: string = 'http://users.bugred.ru'

  http.get(base_url + '/');
  sleep(1);
  http.post(base_url + '/user/login/index.html', json_date, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  http.get(base_url + '/user/logout.html');
  http.get(base_url + '/');
}
