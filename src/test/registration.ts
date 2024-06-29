import http from 'k6/http'
import { faker } from '@faker-js/faker';


export const options = {
  stages: [
    { duration: '5s', target: 1 },
    { duration: '5s', target: 2 },
    { duration: '5s', target: 1 }
  ],
  noConnectionReuse: true
};

export default function () {
  const jsonDate = (): string => {
    return JSON.stringify({
      "name": faker.name.firstName(),
      "email": faker.internet.email(),
      "password": faker.internet.password()
    })
  }

  const base_url: string = 'http://users.bugred.ru'
  let json_data : string = jsonDate();
  
  http.get(base_url + '/');

  console.log('User data: ' + json_data)
  http.post(base_url + '/tasks/rest/doregister', json_data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  http.get(base_url + '/user/logout.html');
  http.get(base_url + '/');
}
