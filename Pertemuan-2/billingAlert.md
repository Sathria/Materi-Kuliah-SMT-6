# Membuat biling Allert di AWS untuk menghindari alokasi dana

1. Menu Dashboard AWS kita piling Billing Preference
- Masuk all service Billing and cost management


![alt text](image.png)

- Pilih menu Alert Preference
- Pilih menu Alert Preference klik edit
![alt text](image-1.png)

- isi Email ceklis Receive
- Klik Update
![alt text](image-2.png)

2. Masuk Menu Cloudwatch
- pilih all service lalu cari Cloudwatch

![alt text](image-3.png)

3. pilih create alarm
- Pastikan server lokasi di N. Virginia
- pilih menu Create Alert
- Klik Metric
![alt text](image-4.png)
![alt text](image-5.png)
![alt text](image-6.png)
- pilih biling
![alt text](image-16.png)
- pilih estimate charge
![alt text](image-17.png)
- pilih / ceklis mata uang USD
- Klik Select Metric
- Beri Nama Alert = NIM_BillingAlert
- Condititon Static >  Greathertha > 1 USD
- Create New Topic => NIM_BillingAlert -> Create
- Select an Existing SNS topic -> NIM_BillingAlert
- Klik Next
- Nama Alarm BillingAlert
- Emailnya Default saja lalu next
- Buka email dari aws lalu confirm
![alt text](image-7.png)
![alt text](image-18.png)

