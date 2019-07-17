<<<<<<< HEAD
<<<<<<< HEAD
import {ClassicModel} from '../../models/classic.js';
import { LikeModel } from '../../models/like.js';

let classicModel = new ClassicModel();
let likeModel = new LikeModel();

=======
import {HTTP} from '../../util/http.js';

let http = new HTTP();
>>>>>>> fe38445dcfe12796d336fcb7d9a0a390df30de5e
=======
import {HTTP} from '../../util/http.js';

let http = new HTTP();
>>>>>>> fe38445dcfe12796d336fcb7d9a0a390df30de5e
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
<<<<<<< HEAD
    classic:null
=======
    
>>>>>>> fe38445dcfe12796d336fcb7d9a0a390df30de5e
=======
    
>>>>>>> fe38445dcfe12796d336fcb7d9a0a390df30de5e
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
<<<<<<< HEAD
<<<<<<< HEAD
    //   url: 'http://bl.7yue.pro/v1/classic/latest',c
=======
    //   url: 'http://bl.7yue.pro/v1/classic/latest',
>>>>>>> fe38445dcfe12796d336fcb7d9a0a390df30de5e
=======
    //   url: 'http://bl.7yue.pro/v1/classic/latest',
>>>>>>> fe38445dcfe12796d336fcb7d9a0a390df30de5e
    //   header:{
    //     appkey:"GgRhTjUNUYn1fHke"
    //   }
    // })
<<<<<<< HEAD
<<<<<<< HEAD
    classicModel.getLatest((res)=>{
      // console.log(res)
      this.setData({
        classic:res
      })
      // console.log(this.data)
    })
  },

  onLike:function (e) { 
    let behavior = e.detail.behavior
    likeModel.like(behavior,this.data.classic.id,
      this.data.classic.type)
   },

=======
=======
>>>>>>> fe38445dcfe12796d336fcb7d9a0a390df30de5e
      http.request({
        url:'classic/latest',
        success:(res)=>{
          console.log(res)
        }
      })
  },

<<<<<<< HEAD
>>>>>>> fe38445dcfe12796d336fcb7d9a0a390df30de5e
=======
>>>>>>> fe38445dcfe12796d336fcb7d9a0a390df30de5e
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})