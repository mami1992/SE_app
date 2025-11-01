const CACHE_NAME = "se-app-v20251102"; // ← バージョンをコミットごとに変える
const FILES_TO_CACHE = [
  "./index.html",
  "./style.css?v=20251102",
  "./script.js?v=20251102",
  "./manifest.json",
  "./kirakomesalada.mp3",
  "./kirakomesalada2.mp3",
  "./SE.mp3",
  "./SE2.mp3",
  "./patison.mp3",
  "./patison2.mp3",
  "./icon192.png",
  "./icon512.png"
];

// インストール：新しいキャッシュを保存
self.addEventListener("install", event => {
  self.skipWaiting(); // 古いSWを待たずに即時適用
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// 有効化：古いキャッシュを削除
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("🧹 Deleting old cache:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim(); // すぐにページ制御を引き継ぐ
});

// 取得：ネットワーク優先（オフライン時のみキャッシュ使用）
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // オンライン時はキャッシュ更新
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
        return response;
      })
      .catch(() => caches.match(event.request)) // オフラインならキャッシュから返す
  );
});