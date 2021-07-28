import axios from 'axios';
// create an axios instance
const service = axios.create({
    timeout: 60000, // request timeout
    headers: {
        post: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
});

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        config.headers["usertoken"] = localStorage.getItem('data_user_token');
        config.headers["datauserid"] = localStorage.getItem('data_user_id');
        if (localStorage.getItem('data_user_token')) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
        }
        return config;
    },
    error => {
        // do something with request error
        console.log(error); // for debug
        return Promise.reject(error);
    }
);
service.interceptors.response.use(
    response => {
        if (response.data.code === 1010) {
            location.href = '#/login';
        }
        // 如果返回值 是1010重新登录
        return response;
    },
    error => {
        return error;
    }
);

function apiAxios(method, url, params) {
    return new Promise((resolve, reject) => {
        // if (params) {
        //   params = filterNull(params)
        // }
        // console.log(url);
        service({
            method: method,
            url: url,
            data: method === 'POST' || method === 'PUT' ? params : null,
            params: method === 'GET' || method === 'DELETE' ? params : null,
            withCredentials: true
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
}

// 返回在vue模板中的调用接口
export default {
    get: function (url, params) {
        return apiAxios('GET', url, params);
    },
    post: function (url, params) {
        return apiAxios('POST', url, params);
    },
    put: function (url, params) {
        return apiAxios('PUT', url, params);
    },
    delete: function (url, params) {
        return apiAxios('DELETE', url, params);
    }
};
