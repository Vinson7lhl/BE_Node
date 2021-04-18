const source_data = require('./list')

// 获取 文件系统对象 模块
const FS = require('fs')
// 获取 http 模块
const HTTP = require('http')
// 获取模板模块
const TEMP = require('art-template')

// 读取写入文件
FS.readFile('./test_read_file.txt', (err, data) => {
    console.log(data)
})

FS.writeFile('./test_write_file.txt', '写入Halo node-express', (err) => {
    if (err) {
        console.log('情人劫写入失败')
    } else {
        console.log('情人节写入成功')
    }
})

let user_list = [
    {name: '洪七公', tech: '降龙十八掌'},
    {name: '黄老邪', tech: '魔笛幻术'},
    {name: '段王爷', tech: '一阳指'},
    {name: '欧阳锋', tech: '蛤蟆功'},
]

let img_type = ['jpg','jpeg','png','gif']

// 创建服务器对象
const SERVER = HTTP.createServer()
// 创建服务对象的监听
SERVER.on('request', (req, res) => {
    console.log('请求来了！')
    // 这个url是指端口号之后的所有字符串 比如访问：http://localhost:3000，实际为：http://localhost:3000/
    const URL = req.url
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    if (URL === '/index') {
        FS.readFile('./pages/index.html',(err, data) => {
            if(err) {
                return res.end('404！！！')
            }
            let content = TEMP.render(data.toString(), {
                user_list
            })
            res.end(content)
        })
    } else if (URL === '/list') {
        FS.readFile('./pages/list.html', (err, data) => {
            res.end(data)
        })
    } 
    // css
    else if (URL.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css; charset=utf-8')
        FS.readFile('.' + URL, (err, data) => {
            res.end(data)
        })
    }
    // js
    else if (URL.endsWith('.js')) {
        res.setHeader('Content-Type', 'text/javascript; charset=utf-8')
        FS.readFile('.' + URL, (err, data) => {
            res.end(data)
        })
    }
    // 图片 
    else if (URL.endsWith('.png') || URL.endsWith('.jpg') || URL.endsWith('.jpeg') || URL.endsWith('.gif')) {
        let extra_name = ''
        for(let i=0; i < img_type.length; i++) {
            if(URL.lastIndexOf(img_type[i]) !== -1) {
                extra_name = img_type[i]
                break
            }
        }    
        res.setHeader('Content-Type', 'image/' + extra_name)
        FS.readFile('.' + URL, (err, data) => {
            res.end(data)
        })
    } 
    else {
        res.end('404！！！')
    }

})
// 启动服务，通过控制台 node index.js 启动，此处用3000端口，但可以用80端口，默认浏览器端口，这样就可以不用写localhost:3000
// 端口范围为：0~65535（64位系统）
SERVER.listen(3000, () => {
    console.log('启动服务')
})
