import { KeywordModel } from "../../models/keyword.js"
import { BookModel } from "../../models/book.js"
import { paginationBev } from "../behaviors/pagination.js"


const keyWordModel = new KeywordModel()
const bookModel = new BookModel()
// components/search/index.js
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more:{
      type:String,
      observer:'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords:[],
    hotWords:[],
    searching:false,
    q:'',
    loading:false,
    loadingCenter:false
  },
  attached(){
    // 显示历史搜索
    const historyWords = keyWordModel.getHistory()
    this.setData({
      historyWords
    })
    // 显示热门搜索
    keyWordModel.getHot()
    .then(res=>{
      this.setData({
        hotWords:res.hot
      })
    })
  },
    

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore(){
      console.log(1123)
      if(!this.data.q){
        return
      }
      // 如果loading为true的话,说明正在发送请求,直接return
      if(this.isLocked()){
        return
      }
      //获取上一次取得数据的长度
      const length = this.data.dataArray.length
      
      // 行为封装代码的调用
      if (this.hasMore()){
        // 判断当前是否锁了,当加载进来之后再把loading加锁
        this.locked()
        bookModel.search(length, this.data.q)
        .then(res => {
          //把上一次的数据和新获取的数据合并
          this.setMoreData(res.books)
            //发送请求时把锁设为false
            this.unLocked()
            // this.data.loading = false
          },()=>{
            this.unLocked()
          })
      } 
    },
    onCancel(e){
      this.triggerEvent('cancel',{},{})
      this.initialize()

    },
    onDelete(e){
     this._closeResult()
      this.initialize()

    },

    onConfirm(e){
        // 一点击搜索的内容就隐藏页面
      this._showResult()
      this._showLoadingCenter()
      
      // 搜索内容的序号
      const q = e.detail.value || e.detail.text
      bookModel.search(0, q).then(res=>{
        // 把行为里的封装代码进行调用
        this.setMoreData(res.books)
        this.setTotal(res.total)
        this.setData({
          q
        })
        // 让历史搜索只有与返回来相同书籍的有效值，无效值不添加
        keyWordModel.addToHistory(q)
        this._hideLoadingCenter()
      })
    },
    _showLoadingCenter(){
      this.setData({
        loadingCenter: true
      })
    },
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },
    _showResult(){
      this.setData({
        searching:true
      })
    },
    _closeResult(){
      this.setData({
        searching:false,
        q:''
      })
    },
    
  }
})
