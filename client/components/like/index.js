// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like:{
      type:Boolean
    },
    count:{
      type:Number
    },
    readOnly:{
      type:Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

    yesSrc:'/components/like/images/like.png',
    noSrc:'/components/like/images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike:function (e) { 
      if(this.properties.readOnly){
        return
      }
      let like = this.properties.like;
      let count = this.properties.count;

      count = like?count-1 : count+1
      this.setData({
        count:count,
        like:!like
      })
      //激活自定义事件
      let behavior = this.properties.like?'like' : 'cancel'
      //监听自定义事件,第一参数是事件名,第2个参数是设置detail属性,
      this.triggerEvent('like',{
        behavior:behavior
      },{})
     }
  }
})
