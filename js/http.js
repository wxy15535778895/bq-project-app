// const urlLogin = 'http://119.27.171.77:8077/user/loginApp';
const baseUrl = 'http://119.27.171.77:8099';
// const baseUrl = 'http://192.168.0.172:8077';
const httpRequest = (opts, data) => {
	console.log(baseUrl + opts.url)
	let httpDefaultOpts = {
		url: baseUrl + opts.url,
		data: data,
		timeout:1000,
		method: opts.method,
		header: opts.method == 'get' ? {
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
		} : {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/json; charset=UTF-8'
		},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {
				resolve(res[1])
			}
		).catch(
			(response) => {
				reject(response)
			}
		)
	})
	return promise
};
const weather = (citykey) => {
	let httpDefaultOpts = {
		url: 'http://wthrcdn.etouch.cn/weather_mini?citykey=' + citykey,
		method: 'get',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {	
				resolve(res[1])
			}
		).catch(
			(response) => {
				reject(response)
			}
			
		)
	})
	return promise
}

export default {
	baseUrl,
	httpRequest,
	weather
}
