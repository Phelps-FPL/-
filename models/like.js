import {HTTP} from '../util/http.js'
//向服务器提交数据
class LikeModel extends HTTP {
    like(behavior,artID,category){
        // API文档进行点赞,就是like,取消点赞就是/like/cancel
        let url = behavior == 'like'?'like':'like/cancel'
        this.request({
            url:url,
            method:'POST',
            data:{
                art_id:artID,
                type:category
            }
            //因为不需要接受回调函数,所以不需要传success函数
        })
    }
}

export {LikeModel}
