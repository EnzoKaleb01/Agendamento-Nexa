/* =========================================================
   AGENDAMENTO NEXA WEB — Configuração
   Único arquivo que você edita neste repositório.
   ========================================================= */

window.NEXA_CONFIG = {

  /* Seu WhatsApp, com código do país e DDD, só números */
  whatsapp: '5585997119151',

  /* Link do site principal */
  site: 'https://enzokaleb01.github.io/Site-Nexa-Web/',

  /* ---------------------------------------------------------
     SUPABASE — o MESMO projeto que o painel usa.
     É isso que faz o briefing aparecer lá.

     A chave publishable é pública de propósito: quem protege
     os dados são as políticas de RLS. Aqui ela só precisa de
     permissão para CRIAR, nunca para ler.
     --------------------------------------------------------- */
  supabase: {
    url:     'https://dcikmlblvpayzmnfqznq.supabase.co',
    anonKey: 'sb_publishable_ZgLfnx_kYuEwhY-uVayUMA_ToUej3ig',
    tabela:  'briefings',
    bucket:  'briefings'
  }
};
