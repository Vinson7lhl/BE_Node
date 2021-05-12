const EXPRESS = require('express')
// 获取文件对象
const FS = require('fs')
// 获取路由
const ROUTER = EXPRESS.Router()

/* GET home page. */
ROUTER.get('/', function (req, res, next) {
	/**
	 * q1：如何连接数据库
	 * q2：如何查询请求中的参数
	 * q3：中间层node如何请求后端代码
	 * q4：如何整合多个模块，比如路由拆分
	 * tips：因为data是从文件读取的的字符串所以还要转化为对象
	 */
	FS.readFile('public/fake_data/fake_data.json', (err, data) => {
		if (err) {
			return res.status(500).send('服务器错误！')
		}
		res.render('index', {
			title: '老七的Express',
			head: '这里是handlerbar',
			content: '继承内容',
			content_detail: {
				gender: '男',
				age: 33,
				prefer: 'javascript',
			},
			data_list: JSON.parse(data).data_list,
			footer_str_array: ['foot1', 'foot2', 'foot3']
		})
	})
})

ROUTER.post('/', function (req, res) {
	res.send('Post 请求')
	// 获取body数据
	console.log(req.body)
})

ROUTER.post('/login', function (req, res) {
	// 获取body数据
	console.log(req.body)
})

ROUTER.put('/user', function (req, res) {
	res.send('put 请求')
})

ROUTER.delete('/user', function (req, res) {
	res.send('Delete 请求')
})

module.exports = ROUTER;
