const paginationBev = Behavior({
  // 向服务器请求的书籍数据
  data:{
    dataArray:[],
    total:null,
    noneResult:false
  },
  methods: {
    // 加载更多数据函数
    setMoreData(dataArray){
      //把上一次的数据和新获取的数据合并
      const tempArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArray
      })
    },
    getCurrentStart() {
      // 返回当前获取到的数据的长度
      return this.data.dataArray.length
    },
    setTotal(total) {
      //获取当前页面加载数据的总长度
      this.data.total = total
      if(total == 0){
        this.setData({
          noneResult:true
        })
      }
    },
    hasMore() {
      // 判断当前获取到的数据是否大于等于总数据,如果是则关锁为false
      if (this.data.dataArray.length >= this.data.total) {
        return false
      } else {
        return true
      }
    },
    // 每当重新搜索的时候把取得的数据重新设为空和零
    initialize(){
      this.setData({
        dataArray:[],
        noneResult:false
      })
      this.data.total = null
    }
  }
})
 
export { paginationBev}