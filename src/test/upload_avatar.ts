import http from 'k6/http';
import { check } from 'k6';
import encoding from 'k6/encoding';


export const options = {
    output: './upload_avatar.out',
    stages: [
        { duration: '10s', target: 1 },
        { duration: '10s', target: 2 },
        { duration: '10s', target: 1 }
    ],
    noConnectionReuse: true
};


const imageFile = open('/home/turgor/VS_Code/K6-Users/src/resource/img/avatar.jpg', 'b');

const buf = new Uint8Array(imageFile).buffer;
const encodedData = encoding.b64encode(buf);


export default function () {

    const fd = new FormData();
    fd.append('avatar', encodedData);
    const base_url = 'http://users.bugred.ru'
    
    http.get(base_url + '/');
    const res = http.post(base_url + '/tasks/rest/addavatar?email=manager@mail.ru');

    console.log(res.body);

    check(res, {
        'file uploaded successfully': (r) => r.status === 200,
    });


    http.get(base_url + '/user/logout.html');
    http.get(base_url + '/');
}
