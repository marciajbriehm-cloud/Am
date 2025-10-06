const CACHE_NAME = 'love-calculator-v2';
const urlsToCache = [
  './',
  'index.html',
  'manifest.json',
  'https://i.ibb.co/wN6hKsW0/file-00000000d870622f9bb46e7b7ab76934.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap'
];

// عند التثبيت: تخزين الملفات
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('✅ تم فتح الكاش وتخزين الملفات');
      return cache.addAll(urlsToCache);
    })
  );
});

// عند التفعيل: حذف الكاش القديم
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('🧹 حذف الكاش القديم:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// جلب الملفات من الكاش أو الشبكة
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
