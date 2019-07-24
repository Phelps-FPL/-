

class KeywordModel{
    key ='q'
    maxLength = 5
    getHistory(){
        // 设置历史缓存
        const words = wx.getStorageSync(this.key)
        if(!words){
            return []
        }
        return words
    }
    getHot(){

    }
    addToHistory(keyword){
        let words = this.getHistory()
        const has = words.includes(keyword)
        // 是否有相同的关键字存在
        if(!has){
            // 设置历史搜索数据的长度
            const length = words.length
            if(length >= this.maxLength){
                words.pop()
            }

             // 添加历史搜索的缓存
        words.unshift(keyword)
        wx.setStorageSync(this.key, words)
        }     
    }
}


export {KeywordModel}
