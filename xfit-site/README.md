# X Fit Musculação Avançada — site estático

Site institucional em HTML, CSS e JavaScript puros (sem dependências), pronto para o **Cloudflare Pages**.

## Estrutura
```
public/            # tudo que é publicado
  index.html
  css/styles.css
  js/config.js     # contatos, mensagens do WhatsApp, imagens e depoimentos (edite aqui)
  js/main.js
  img/placeholder.svg
  favicon.svg · favicon.ico · apple-touch-icon.png · og-image.png
  _headers · robots.txt
scripts/build.mjs  # copia public/ -> dist/
scripts/check.mjs  # verifica âncoras, arquivos e contatos
```

## Uso local
```bash
npm run dev      # servidor local em http://localhost:3000
npm run check    # verificação de links/arquivos
npm run build    # gera dist/
```

## Publicar no Cloudflare Pages (via GitHub)
1. Suba esta pasta para um repositório no GitHub.
2. No painel da Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**.
3. Selecione o repositório e configure:
   - **Framework preset:** None
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Clique em **Save and Deploy**. Cada `git push` na branch principal publica de novo.

(Alternativa sem build: deixe o build command vazio e use `public` como output directory.)

## Conteúdo a completar
- **Fotos reais:** as imagens atuais são ilustrativas (Pexels). Coloque as fotos em `public/img/` e troque os `src` em `js/config.js`.
- **Depoimentos:** adicione depoimentos reais e autorizados em `testimonials` (`js/config.js`). Vazio = seção oculta.
- **Endereço e mapa incorporado:** o endereço não foi fornecido. Com o endereço confirmado, é possível incluir um `<iframe>` do Google Maps na seção Localização.
- **Preços e horários:** não foram informados e não aparecem no site.

- teste
