# DAZO CHAT API

Technical Home Test - Chatbot Web API
Built with Express.js, langchain, xlxs

Integrated with GEMINI API

## Installation

1. Clone repository

```bash
git clone https://github.com/Luthfiyanto/Dazo-Test-API.git
```

2. Install dependencies

```bash
npm install
```

3. Copy environment file to be .env.local

```bash
cp .env.sample .env.local
```

4. Configure your GEMINI API KEY and model in .env.local

5. Run Server

```bash
npm run dev
```

## Flow

1. Kirim request dengen ketentuan

```bash
  endpoint: /chat
  method : POST
  header: {
  "Content-type": "Application/json"
  }
  body : {
  "message": "Lorem ipsum"
  }
```

2. Request diteruskan ke langchain yang terhubung dengan Gemini AI. Adapun template prompt dapat dilihat di file api/sevices/gemini.js dan daftar produk dapat dilihat di utils/product.json

3. Service akan mengembalikan json

```bash
  {
    reply: "..."
    interestedProduct: "Paket Sampel"
  }
```

4. Jika interestedProduct bernilai tidak null, maka akan menjalankan service excel untuk memasukkan data tersebut ke dalam file excel. File excel akan tergenerate jika belum tersedia. File excel dapat ditemukan di logs/products_leads.xlsx

5. Setelah itu, service akan mengembalikan response berupa data reply

```bash
{
  reply: "..."
}
```
