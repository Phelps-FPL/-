import {HTTP} from '../util/http.js'
//extends 继承类
class ClassicModel extends HTTP {
        getLatest(sCallback){
           this.request({
            url:'classic/latest',
            success: (res) => {
                sCallback(res)
            }
           })
        }
        getProvious(index,sCallback){
            this.request({
                url:'classic/' + index + '/previous',
                success:(res)=>{
                    sCallback(res)
                }
            })
        }
}

export {ClassicModel}