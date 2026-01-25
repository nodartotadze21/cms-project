# Cloudinary კონფიგურაცია

## როგორ დავაკონფიგურიროთ Cloudinary

### 1. Cloudinary-ზე რეგისტრაცია და API გასაღებების მიღება

1. გადადით [Cloudinary](https://cloudinary.com) და შექმენით ანგარიში
2. Dashboard-ზე იპოვით თქვენს credentials:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### 2. Backend-ის კონფიგურაცია

შეასრულეთ შემდეგი ნაბიჯები:

1. გახსენით `backend/.env` ფაილი
2. შეავსეთ Cloudinary credentials:

```env
CLOUDINARY_CLOUD_NAME=თქვენი_cloud_name
CLOUDINARY_API_KEY=თქვენი_api_key
CLOUDINARY_API_SECRET=თქვენი_api_secret
```

### 3. როგორ მუშაობს

#### Frontend:
- ადმინ პანელში პოსტის ან სიახლის შექმნისას/რედაქტირებისას
- ახლა შეგიძლიათ აირჩიოთ სურათი პირდაპირ კომპიუტერიდან
- სურათის არჩევის შემდეგ ჩანს გამოსახულების preview
- ფორმის გაგზავნისას სურათი ავტომატურად აიტვირთება Cloudinary-ზე

#### Backend:
- `/api/upload` endpoint იღებს სურათს
- Multer ამუშავებს file upload-ს
- სურათი იტვირთება Cloudinary-ზე `cms-uploads` folder-ში
- ბრუნდება სურათის URL რომელიც ინახება MongoDB-ში

### 4. ფუნქციონალი

✅ პოსტებისა და სიახლეების სურათების ატვირთვა კომპიუტერიდან  
✅ სურათის preview ატვირთვამდე  
✅ ავტომატური ატვირთვა Cloudinary-ზე  
✅ 5MB ლიმიტი სურათის ზომაზე  
✅ მხოლოდ image ფაილების დაშვება  

### 5. სურათის ზომის ლიმიტი

ამჟამად დაყენებულია **5MB** მაქსიმუმ. თუ გსურთ ცვლილება, შეცვალეთ `backend/src/config/cloudinary.ts` ფაილში:

```typescript
limits: {
  fileSize: 5 * 1024 * 1024, // 5MB
}
```

### 6. Cloudinary Folder სტრუქტურა

ყველა ატვირთული სურათი ინახება Cloudinary-ზე `cms-uploads` folder-ში. საჭიროების შემთხვევაში შეგიძლიათ შეცვალოთ folder სახელი `backend/src/routes/upload.ts` ფაილში.
