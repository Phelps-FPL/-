import {ClassicModel} from '../../models/classic.js';
import { LikeModel } from '../../models/like.js';

let classicModel = new ClassicModel();
let likeModel = new LikeModel();



Page({

  /**
   * 页面的初始数据
   */
  data: {

    classic:null,
    latest:true,
    first:false,
    // 点赞数量和状态
    likeCount:0,
    likeStatus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({

    //   url: 'http://bl.7yue.pro/v1/classic/latest'

    //   header:{
    //     appkey:"GgRhTjUNUYn1fHke"
    //   }
    // })
    // 最新期刊
    classicModel.getLatest((res)=>{
      // console.log(res)
      this.setData({
        classic:res,
        //设置获取最新的点赞数和状态
        likeCount:res.fav_nums,
        likeStatus:res.like_status
      })
      // console.log(this.data)
    })
  },
   onReachBottom(e){
    
    console.log(1112)
  },

  onLike:function (e) { 
    let behavior = e.detail.behavior
    likeModel.like(behavior,this.data.classic.id,
      this.data.classic.type)
   },

  onNext:function(e){
    this._updateClassic('next')
  },
  onPrevious:function (e) { 
    this._updateClassic('previous')
   },
  //  切换期刊
   _updateClassic:function (nop) { 
    let index = this.data.classic.index
    classicModel.getClassic(index,nop,(res)=>{
      // console.log(res)
      // 调用点赞数的状态和数
      this._getLikeStatus(res.id, res.type)
      this.setData({
        
        classic:res,
        latest:classicModel.isLatest(res.index),
        first:classicModel.isFirst(res.index)
      })
    })
    },
    //获取点赞状态的函数
    _getLikeStatus:function(artID,category){
        likeModel.getClassicLikeStatus(artID,category,(res)=>{
          this.setData({
            likeStatus:res.like_status,
            likeCount:res.fav_nums
          })
        })
    },

  //     http.request({
  //       url:'classic/latest',
  //       success:(res)=>{
  //         console.log(res)
  //       }
  //     })
  // },



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
    return {
      title: '生生图书',
      path: '/pages/pregnantClass/detail/index?id=' ,    //分享的页面所需要的id
      // imageUrl: this.data.article.video_img   //分享界面的图片
    }
  }
})