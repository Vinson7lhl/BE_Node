// 获取express模块
const express = require('express')
// 创建服务对象
const app = express()
// 获取path对象
const path = require('path')
// 获取文件对象
const fs = require('fs')


// 1、获取模板模块,第一个参数确定模板扩展名
app.engine('html', require('express-art-template'))
// 2、第二个是模板模块.注意：views文件夹是art-template约定的，模板必须放在此处 or 其子文件夹,但也可以改修改默认模板路径views => pages,app.set('views', '你要的路径')
app.set('views', path.join(__dirname, 'pages'))


// 获取post请求后数据插件
const body_parser = require('body-parser')


/**
 * 对静态资源处理，如此才可以访问 localhost:3000/(static/stylesheets/style.css)
 * app.use('映射名',实际路径)，第一个参数可以不传，那么就可以直接访问访问 'http://localhost:3000/stylesheets/base.css'
 */
app.use('/static', express.static(path.join(__dirname, 'public')))

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');



/**
 * 路由
 */
app.get('/',(req,res) => {
	/**
	 * q1：如何连接数据库
	 * q2：如何查询请求中的参数
	 * q3：中间层node如何请求后端代码
	 * q4：如何整合多个模块，比如路由拆分
	 */
	// 注意：读取文件后的内容都是字符串，必须转码才行。【数据库】
	fs.readFile('./public/fake_data/fake_data.json', (err,data) => {
		if (err) {
			return res.status(500).send('服务器错误！')
		}
		res.render('index.html', {
			title: '模板继承',
			content1: '继承内容',
			data_list: JSON.parse(data).data_list,
			footer_str: '这里是footer内容'
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