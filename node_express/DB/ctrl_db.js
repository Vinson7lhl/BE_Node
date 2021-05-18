const FS = require('fs')
let file_path = 'DB/fake_data.json'

let data_base_ctrl = {
    add: function(name, age, e_name, callback_fun) {
        FS.readFile(file_path, (err, data) => {
            if (err) {
                return res.status(500).send('服务器错误！')
            }
            // 获取文件内数据（字符串 => json）
            let source_data = JSON.parse(data).data_list
            // 增加一条新数据
            source_data.push({
                id: source_data.length + 1,
                name: name,
                age: age,
                e_name: e_name
            })
            // 将对象转换为字符串，并写入到文件中
            let new_data = JSON.stringify({
                data_list: source_data
            })
            FS.writeFile(file_path, new_data, err => {
                return callback_fun(err)
            })
            callback_fun('')

        })
    },
    update: function(id, name, age, e_name) {

    },
    delete: function(id) {

    },
    get: function(id) {

    },
}

module.exports = data_base_ctrl