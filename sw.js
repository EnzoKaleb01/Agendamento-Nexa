/* =========================================================
   NEXA WEB — Service Worker
   Faz a página 404.html aparecer quando o visitante está
   sem internet, e guarda as fontes para ela abrir bonita
   mesmo offline.
   ========================================================= */

const CACHE = 'nexa-offline-v1';
const OFFLINE_PAGE = './404.html';

/* --- instalação: guarda a página de erro --- */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll([OFFLINE_PAGE]))
      .then(() => self.skipWaiting())
  );
});

/* --- ativação: limpa versões antigas --- */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(nomes => Promise.all(nomes.filter(n => n !== CACHE).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

/* --- interceptação --- */
self.addEventListener('fetch', event => {
  const req = event.request;
  if(req.method !== 'GET') return;

  const url = new URL(req.url);
  const ehFonte = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';

  /* fontes: usa o cache primeiro e guarda uma cópia */
  if(ehFonte){
    event.respondWith(
      caches.match(req).then(salvo => {
        if(salvo) return salvo;
        return fetch(req).then(resp => {
          const copia = resp.clone();
          caches.open(CACHE).then(c => c.put(req, copia));
          return resp;
        }).catch(() => salvo);
      })
    );
    return;
  }

  /* páginas: tenta a internet; se falhar, entrega a tela de erro */
  if(req.mode === 'navigate'){
    event.respondWith(
      fetch(req).catch(() =>
        caches.match(OFFLINE_PAGE).then(pagina =>
          pagina || new Response('Sem conexão', {
            status: 503,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
          })
        )
      )
    );
    return;
  }

  /* demais arquivos: internet, com o cache como rede de segurança */
  event.respondWith(fetch(req).catch(() => caches.match(req)));
});
