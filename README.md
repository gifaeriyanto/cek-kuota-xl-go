# cek-kuota-xl-go

Cek kuota internet modem XL Go with headless chrome. Karena saya maaaalaaaaas buka `http://192.168.8.1/` buat cek kuota, jadi saya buatin program biar sisa run `yarn start`. Kode USSD-nya saya hard-code jadi kalo mau pake silahkan clone repo ini dan ubah yah!

![Preview](https://github.com/gifaeriyanto/cek-kuota-xl-go/blob/main/preview.gif)

## Cara penggunaan

Pertama buat file `.env` yang isinya sebagai berikut:

    USERNAME=usernameModemmu
    PASSWORD=passwordModemmu
    PHONE_NUMBER=nomorXLmu
    KK=nomorKartuKeluarga
    NIK=nomorKTP
    USSD_CHECK_QUOTA=*123*7*1*1*2#

Setelah itu jalankan perintah berikut

    yarn start

Untuk registrasi kartu silahkan jalankan perintah berikut

    yarn reg

Untuk unregistrasi kartu silahkan jalankan perintah berikut

    yarn unreg

Semoga bermanfaat 🙏
