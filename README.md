# Skilvul_TPA-5
## Web Service & RESTful API for ToDoList Application

## Table of Contents

- [Description](#Description)
- [Feature](#Feature)
- [Links](#Links)
- [Contributing](#contributing)

### Description
Project Web Service dan RESTful API ini menggunakan express js dan MySQL sebagai databasenya. Tentunya dengan menggunakan Javascript serta memanfaatkan secara penuh Library yang tersedia. Untuk membuat Model, Migration, Dan Seeder menggunakan Sequelize yang sudah tersedia secara gratis. Secara keseluruhan Web Servie ToDoList App ini memiliki 9 Endpoint yang dimana dapat dipergunakan untuk CRUD. Endpoint dibuat untuk memudahkan user untuk login, add Todo, Hapus Todo, Update Todo, dan Melihat Todo Mereka. Juga memudahkan Admin Dalam mengelola Web Service sesuai kebutuhan.

### Feature
 - **Enpoint Register**
      - User dapat melakukan Register untuk pembuatan Akun mereka dengan EndPoint _/register_.
 - **Enpoint Login**
      - Baik User dan Admin dapat melakukan Login yang diperlukan untuk dapat mengakses Web Service dengan Endpoint _login_.
 - **Enpoint Users**
      - Endpoint _/users_ ada buat agar admin dapat melihat user yang ada pada Web Service.
 - **Enpoint Melihat Semua Todo**
      - Dengan Menggunakan Method GET Endpoint _/todos_ dapat mengambil data semua todo. namun Endpoint ini hanya bisa diakses oleh admin.
 - **Enpoint Menambahkan Todo**
      - Endpoint _/todos_ dengan method POST dapat digunakan oleh user untuk menambahkan todo baru sesuai dengan id user.
 - **Enpoint Mendapatkan Todo Berdasarkan Id**
      - User dapat melihat todo mereka dengan Endpoint _/todos/:id_ dengan method GET.
 - **Enpoint Update Todo Dengan Id User**
      - Untuk update Todo sendiri menggunakan method PUT, Endpoint yang digunakan adalah _/todos/:id_
 - **Enpoint Delete Todo**
      - Delete Todo yang dapat dilakukan oleh user adalah Delete berdasarkan Todo yang mereka miliki, sehingga menggunakan Endpoint _/todos/:id_ dengan method DELETE
- **Enpoint Delete Semua Todo**
      - Delete Semua Todo hanya dapat dilakukan oleh admin, Endpointnya sendiri adalah _/todos_ dengan menggunakan method DELETE
      
### Links
 - [Railway Links](https://todolists-production.up.railway.app/)
 - [Screenshoots Links](https://drive.google.com/drive/folders/1EVcPSbmVXaffZl0wc-faOyJPIYytNXD1?usp=sharing)

### Contributing
 - dalam kontribusinya sendiri project ini saya buat sendiri untuk memenuhi tugas dalam T4I Skilvul. Menggunakan Javacript, Node JS, Railway, Postman, etc.

