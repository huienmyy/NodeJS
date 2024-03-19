const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')


const app = express()
const port = 3000
app.set('view engine', 'ejs');

// chỉ định thư mục gốc 
app.use(express.static('assets'))
app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}))


// kết nối database 


// cài đặt thư mục lưu hình ảnh và đổi tên hình ảnh
// const upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({
    storage: storage
})

// ***** Thứ tự đặt API
// get list
// get create
// post create
// get edit
// post edit
// get delete
// get detail



// **** Client ****
// tự đổng chuyển sang client 
app.get('/', (req, res) => {
    res.redirect('client');
})
// hiển thị giao diện trang chủ của client 
app.get('/client', (req, res) => {
    res.render('client/index');
})
// hiển thị trang giới thiệu
app.get('/client/about', (req, res) => {
    res.render('client/about');
})
// hiển thị trang liên hệ
app.get('/client/contact', (req, res) => {
    res.render('client/contact');
})
// hiển thị trang giỏ hàng
app.get('/client/cart', (req, res) => {
    res.render('client/cart');
})
// hiển thị danh sách loại sản phẩm của client
app.get('/client/category/list', (req, res) => {

    // giả sử categories là dữ liệu đươcc lấy ra từ cơ sở dữ liệu 
    var categories = [{
            id: 1,
            name: 'Category 1',
            status: 1
        },
        {
            id: 2,
            name: 'Category 2',
            status: 1
        },
        {
            id: 3,
            name: 'Category 3',
            status: 1
        }
    ]
    // hiển thị kèm theo dữ liệu ra giao diện 
    res.render('client/category/list', {
        data: categories
    })

})
  

// **** Admin ****
// hiển thị giao diện trang chủ của admin 
app.get('/admin', (req, res) => {
    res.render('admin/index');
})
app.get('/admin/bill', (req, res) => {
    res.render('admin/bill');
})
app.get('/admin/dashboard', (req, res) => {
    res.render('admin/dashboard');
})

// hiển thị danh sách loại sản phẩm của admin
app.get('/admin/category/list', (req, res) => {

    var categories = [{
            id: 1,
            name: 'Category 1',
            status: 1
        },
        {
            id: 2,
            name: 'Category 2',
            status: 1
        },
        {
            id: 3,
            name: 'Category 3',
            status: 1
        }
    ]
    res.render('admin/category/list', {
        data: categories
    })

})
app.get('/admin/category/list', (req, res) => {

  
    res.render('admin/category/list')

})

app.get('/admin/product/list', (req, res) => {

  
    res.render('admin/product/list')

})



// hiển thị form thêm
app.get('/admin/category/create', (req, res) => {
    res.render('admin/category/create');
})
app.get('/admin/product/create', (req, res) => {
    res.render('admin/product/create');
})


// ******* Để API hiển thị chi tiết này ở cuối mỗi API của chức năng đó, nếu không biết thì cứ copy theo thứ tự file này 
// hiển thị chi tiết loại sản phẩm, :id là BIẾN => dùng req.params.id để gọi, pleaseeeeeee
// Ví dụ khi truy cập: http://localhost:4000/admin/category/1 thì nó sẽ gọi đến api này 
app.get('/admin/category/:id', (req, res) => {
    let id = req.params.id;

    // Giả sử đây là dữ liệu sau khi select theo id 
    let category = {
        id: id,
        name: 'Category 1',
        status: 1
    };
    res.render('admin/category/detail', {
        data: category
    });
})





// listen để cuối 
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})