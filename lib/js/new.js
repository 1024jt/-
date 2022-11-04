$(function() {
    // 获取新闻列表的函数
    function getNewsList() {
        $.get('http://www.liulongbin.top:3006/api/news', function(res) {
            if (res.status !== 200) {
                return alert('获取新闻列表失败')
            }

            // 把每一项的tags的属性，从字符串转为数组
            for (let i = 0; i < res.data.length; i++) {
                res.data[i].tags = res.data[i].tags.split()
            }

            // 时间补0函数
            function addZero(n) {
                if (n < 10) {
                    return `0${n}`
                } else if (n >= 10) {
                    return n
                }
            }

            // 定义时间过滤器
            template.defaults.imports.dateFormat = function(dtstr) {
                // 用给定时间new一个时间对象
                let dt = new Date(dtstr)
                let y = dt.getFullYear()
                let m = addZero(dt.getMonth() + 1)
                let d = addZero(dt.getDate())
                let hh = addZero(dt.getHours())
                let mm = addZero(dt.getMinutes())
                let ss = addZero(dt.getSeconds())

                return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
                    // return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
            }

            // 渲染页面（所有数据操作都应该放在渲染之前）
            let htmlstr = template('tpl-news', res)
            $('#news-list').html(htmlstr)


        })
    }

    getNewsList()

})