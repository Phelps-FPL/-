import {config} from '../config.js'

    const tips = {
        1:'抱歉，出现了一个错误',
        1005:'不正确的开发者key',
        3000:'期刊不存在'
    }

    class HTTP{
        request({url,data={},method='GET'}){
            return new Promise((resolve,reject)=>{
                this._request(url,resolve,reject,data,method)
            })
        }

        _request(url,resolve,reject,data={},method='GET'){
            //如果没调用method方法，默认为get
            // if(!params.method){
            //     params.method ='GET'
            // }
            //url,data,method
            wx.request({
                url:config.api_base_url + url,
                data:data,
                method:method,
                header:{
                    'content-type':'application/json',
                    'appkey':config.appkey
                },
                success:(res)=>{
                    // startsWith
                    // endWith
                    let code = res.statusCode.toString()
                    if(code.startsWith('2')){
                        // params.success(res.data)
                        // 要判断发送请求的组件事件是否有使用success函数
                        resolve(res.data)
                    }
                    else{
                        reject()
                        let error_code = res.data.error_code
                        this._show_error(error_code)
                    }
                },
                fail:(err)=>{
                    reject()
                    this._show_error(1)
                }
            })
        }
        _show_error(error_code){
            if(!error_code){
                error_code = 1
            }
            const tip = tips[error_code]
            // showToast弹出错误
            wx.showToast({
                title:tip?tip:tips[1],
                icon:'none',
                // 出现错误的时间
                duration:2000
            })
        }
    }
    export {HTTP}