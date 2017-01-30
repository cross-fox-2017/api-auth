# API-AUTH


## ROUTING TABLE

| ROUTE          | HTTP          | Description                                        |
| -------------- |:-------------:| --------------------------------------------------:|
| /api/signup    | POST          |daftar user baru                                    |
| /api/signin    | POST          |Sign In dan mendapatkan token untuk akses           |
| /api/users     | GET           |Mendapatkan data semua user(hanya admin)            |
| /api/users/:id | GET           |Mendapatkan data user(admin & authenticated user)   |
| /api/users     | POST          |Membuat User Baru(admin)                            |
| /api/users/:id | DELETE        |Menghapus user berdasar id(admin)                   |
| /api/users/:id | PUT           |Mengedit atau update user(admin & autehticated user)|


## Tujuan Of API-Auth

	Membuat contoh routing mendasar untuk mendapatkan data, menampilkan,membuat,mengedit,menghapus data user,dan membuat token

## Cara akses

	Akses via : http://localhost:3000 atau http://localhost:3000/api/tujuan-routenya
