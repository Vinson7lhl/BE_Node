// 获取express模块
const express = require('express')
// 创建服务对象
const app = express()
// 获取path对象
const path = require('path')
// 获取文件对象
const fs = require('fs')

/**
 * 配置模板对象
 * 1、获取模板模块,第一个参数确定模板扩展名,第二个是模板模块
 * 2、更改模板文件映射目录；views文件夹是art-template约定的，模板必须放在此处 or 其子文件夹,但也可以改修改默认模板路径views => pages,app.set('views', '你要的路径')
 */
app.engine('art', require('express-art-template'))
app.set('views', path.join(__dirname, 'pages'))

/**
 * 获取post请求后数据插件？暂时未用
 */
const body_parser = require('body-parser')

/**
 * 对静态资源处理，如此才可以访问 localhost:3000/(static/stylesheets/style.css)
 * app.use(逻辑路径, 物理路径)，第一个参数可以不传，那么就可以直接访问访问 'http://localhost:3000/stylesheets/base.css'
 */
app.use('/static', express.static(path.join(__dirname, 'public')))

/**
 * 路由
 */
app.get('/',(req,res) => {
	/**
	 * q1：如何连接数据库
	 * q2：如何查询请求中的参数
	 * q3：中间层node如何请求后端代码
	 * q4：如何整合多个模块，比如路由拆分
	 * tips：因为data是从文件读取的的字符串所以还要转化为对象
	 */
	fs.readFile('./public/fake_data/fake_data.json', (err,data) => {
		if (err) {
			return res.status(500).send('服务器错误！')
		}
		res.render('index.art', {
			title: '模板继承',
			content1: '继承内容',
			data_list: JSON.parse(data).data_list,
			footer_str_array: ['foot1', 'foot2', 'foot3']
		})
	})

	
    // res.send('hello Express！哈哈哈')
})

app.post('/', function (req, res) {
	res.send('Post 请求')
	// 获取body数据
	console.log(req.body)
})

app.put('/user', function (req, res) {
	res.send('put 请求')
})

app.delete('/user', function (req, res) {
	res.send('Delete 请求')
})

/**
 * 设定端口
 * 启动服务
 */
const port = 3000
app.listen(port, () => {
    console.log(`这是node-express 在监听${port}端口`)
})