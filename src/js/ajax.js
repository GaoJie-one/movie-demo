import axios from 'axios';

// 默认配置
const DEFAULT_CONFIG = {
    baseURL: '', // 清空baseURL，避免影响代理请求
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
};

// 创建axios实例
const instance = axios.create(DEFAULT_CONFIG);

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么
        // console.log('请求拦截器:', config);

        // 可以在这里添加token
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        console.error('请求错误:', error);
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    (response) => {
        // console.log('响应成功:', response.data);
        return response.data;
    },
    (error) => {
        // console.error('响应错误:', error);

        // 处理不同的错误状态码
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.log('未授权，请重新登录');
                    break;
                case 403:
                    console.log('禁止访问');
                    break;
                case 404:
                    console.log('请求的资源不存在');
                    break;
                case 500:
                    console.log('服务器内部错误');
                    break;
                default:
                    console.log('其他错误');
            }
        }

        return Promise.reject(error);
    }
);

/**
 * 判断URL是否为完整地址
 * @param {string} url 
 * @returns {boolean}
 */
const isFullUrl = (url) => {
    return url.startsWith('http://') || url.startsWith('https://');
};

/**
 * 处理请求URL
 * @param {string} url 
 * @returns {string}
 */
const processUrl = (url) => {
    // 如果是完整URL，直接返回
    if (isFullUrl(url)) {
        return url;
    }

    // 如果是代理路径（以/api开头），直接返回，不添加baseURL
    if (url.startsWith('/api/')) {
        return url;
    }

    // 其他情况添加baseURL
    return `${DEFAULT_CONFIG.baseURL}${url}`;
};

/**
 * 封装GET请求
 * @param {string} url - 请求地址
 * @param {object} params - 查询参数
 * @param {function} onSuccess - 成功回调函数
 * @param {function} onError - 失败回调函数
 * @param {object} headers - 自定义请求头
 */
export const getFormat = (url, params = {}, onSuccess = null, onError = null, headers = {}) => {
    const requestUrl = processUrl(url);
    const requestConfig = {
        params,
        // headers: { ...DEFAULT_CONFIG.headers, ...headers }
    };

    instance.get(requestUrl, requestConfig)
        .then((response) => {
            if (onSuccess && typeof onSuccess === 'function') {
                onSuccess(response);
            }
            return response;
        })
        .catch((error) => {
            if (onError && typeof onError === 'function') {
                onError(error);
            }
            throw error;
        });
    // axios.get('/api/weather', {
    //     params: {
    //         q: 'Beijing,cn',
    //         appid: '456d5f2262beb65bc08fc46c064a37cd'
    //     }
    // });
};

/**
 * 封装POST请求
 * @param {string} url - 请求地址
 * @param {object} data - 请求数据
 * @param {function} onSuccess - 成功回调函数
 * @param {function} onError - 失败回调函数
 * @param {object} headers - 自定义请求头
 */
export const postFormat = (url, data = {}, onSuccess = null, onError = null, headers = {}) => {
    const requestUrl = processUrl(url);
    const requestConfig = {
        headers: { ...DEFAULT_CONFIG.headers, ...headers }
    };

    return instance.post(requestUrl, data, requestConfig)
        .then((response) => {
            if (onSuccess && typeof onSuccess === 'function') {
                onSuccess(response);
            }
            return response;
        })
        .catch((error) => {
            if (onError && typeof onError === 'function') {
                onError(error);
            }
            throw error;
        });
};

/**
 * 封装PUT请求
 * @param {string} url - 请求地址
 * @param {object} data - 请求数据
 * @param {function} onSuccess - 成功回调函数
 * @param {function} onError - 失败回调函数
 * @param {object} headers - 自定义请求头
 */
export const put = (url, data = {}, onSuccess = null, onError = null, headers = {}) => {
    const requestUrl = processUrl(url);
    const requestConfig = {
        headers: { ...DEFAULT_CONFIG.headers, ...headers }
    };

    return instance.put(requestUrl, data, requestConfig)
        .then((response) => {
            if (onSuccess && typeof onSuccess === 'function') {
                onSuccess(response);
            }
            return response;
        })
        .catch((error) => {
            if (onError && typeof onError === 'function') {
                onError(error);
            }
            throw error;
        });
};

/**
 * 封装DELETE请求
 * @param {string} url - 请求地址
 * @param {function} onSuccess - 成功回调函数
 * @param {function} onError - 失败回调函数
 * @param {object} headers - 自定义请求头
 */
export const del = (url, onSuccess = null, onError = null, headers = {}) => {
    const requestUrl = processUrl(url);
    const requestConfig = {
        headers: { ...DEFAULT_CONFIG.headers, ...headers }
    };

    return instance.delete(requestUrl, requestConfig)
        .then((response) => {
            if (onSuccess && typeof onSuccess === 'function') {
                onSuccess(response);
            }
            return response;
        })
        .catch((error) => {
            if (onError && typeof onError === 'function') {
                onError(error);
            }
            throw error;
        });
};

/**
 * 封装PATCH请求
 * @param {string} url - 请求地址
 * @param {object} data - 请求数据
 * @param {function} onSuccess - 成功回调函数
 * @param {function} onError - 失败回调函数
 * @param {object} headers - 自定义请求头
 */
export const patch = (url, data = {}, onSuccess = null, onError = null, headers = {}) => {
    const requestUrl = processUrl(url);
    const requestConfig = {
        headers: { ...DEFAULT_CONFIG.headers, ...headers }
    };

    return instance.patch(requestUrl, data, requestConfig)
        .then((response) => {
            if (onSuccess && typeof onSuccess === 'function') {
                onSuccess(response);
            }
            return response;
        })
        .catch((error) => {
            if (onError && typeof onError === 'function') {
                onError(error);
            }
            throw error;
        });
};

/**
 * 更新默认配置
 * @param {object} config - 新的配置
 */
export const updateConfig = (config) => {
    Object.assign(DEFAULT_CONFIG, config);
    instance.defaults.baseURL = DEFAULT_CONFIG.baseURL;
    instance.defaults.timeout = DEFAULT_CONFIG.timeout;
    instance.defaults.headers = { ...instance.defaults.headers, ...DEFAULT_CONFIG.headers };
};

// 默认导出axios实例
export default instance;
