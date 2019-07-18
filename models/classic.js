import {HTTP} from '../util/http.js'
//extends 继承类
class ClassicModel extends HTTP {
        getLatest(sCallback){
           this.request({
            url:'classic/latest',
            success: (res) => {
                sCallback(res)
                this._setLatestIndex(res.index)
                //把最新一期的数据写入缓存
                let key = this._getKey(res.index)
                wx.setStorageSync(key,res)
            }
           })
        }
        getClassic(index, nop,sCallback){
            //缓存中寻找， or api请求 再写入缓存
            //key 确定期刊key
            // 判断期刊号是否下一期或者上一期
            let key = nop == 'next'? this._getKey(index + 1):this._getKey(index - 1)
            //设置保存key 的缓存
            let classic = wx.getStorageSync(key)
            // 如果本地没有缓存，就像服务器发起请求
            if(!classic){
                this.request({
                    url:'classic/' + index + '/' + nop,
                    success:(res)=>{
                        //获取的数据写入缓存中,把服务器的classic（res）写入到缓存
                        wx.setStorageSync(this._getKey(res.index),res)
                        sCallback(res)
                    }
                })
            }
            else{
                sCallback(classic)

            }
            
        }

        isFirst(index){
            return index == 1 ? true : false
        }   
        isLatest(index){
            let latestIndex = this._getLatestIndex()
            return latestIndex == index ? true : false
        }
        _setLatestIndex(index){
            wx.setStorageSync('latest',index)
        }
        _getLatestIndex(){
            let index = wx.getStorageSync('latest')
            return index
        }
        //设置获取缓存的key
        _getKey(index){
            let key  = 'classic-' + index
            return key
        }
}

export {ClassicModel}