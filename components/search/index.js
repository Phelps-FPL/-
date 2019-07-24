import { KeywordModel } from "../../models/keyword.js"
import { BookModel } from "../../models/book.js"


const keyWordModel = new KeywordModel()
const bookModel = new BookModel()
// components/search/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more:{
      type:String,
      observer:'_load_more'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords:[],
    hotWords:[],
    dataArray:[],
    searching:false,
    q:''
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
    _load_more(){
      console.log(1234)
    },
    onCancel(e){
      this.triggerEvent('cancel',{},{})
    },
    onDelete(e){
      this.setData({
        searching:false
      })
    },

    onConfirm(e){
      this.setData({
        // 一点击搜索的内容就隐藏页面
        searching:true
      })
      
      // 搜索内容的序号
      const q = e.detail.value || e.detail.text
      bookModel.search(0, q).then(res=>{
        this.setData({
          dataArray:res.books,
          q
        })
        // 让历史搜索只有与返回来相同书籍的有效值，无效值不添加
        keyWordModel.addToHistory(q)
      })
    }
  }
})
