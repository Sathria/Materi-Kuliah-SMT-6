# Remote SSH dari AWS EC 2 Server

1. Unduh dan isntall Putty di https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html

    ![alt text](image.png)

    ![alt text](image-1.png)

2. Konversi eksistensi private key
    - Buka putty Gen
    - Load Private Key.pem (file .pem didapat saat membuat instance ec2 yang ada di folder pertemuan 2 yang biasanya di folder download)
    
    ![alt text](image-2.png)
    - Save private key menjadi ekstensi .ppk

    ![alt text](image-3.png)

3. Setting up remote SSH dengan Putty
    - isi ipv4 addres public data berasal dari instance masing2
    -port SSh (22)
    -Load Private key.ppk dimeu connection->Auth->Credential
    - User dari instance masing-masing (ubuntu)

4. Setiap awal Remote kita lakukan Patchinhg OS
    - sudo apt-get update && sudo apt-get upgrade

5. Coba lakukan instalasi Web Server
dalam keadaan kosong

Install salah satu web server sudo apt install nginx