// Verifica caminhos locais, âncoras e contatos oficiais em public/.
import { readFileSync, existsSync } from 'node:fs';
const html = readFileSync('public/index.html','utf8');
const cfg = readFileSync('public/js/config.js','utf8');
let bad = 0; const err = m => { console.error('ERRO:', m); bad++; };
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]));
for (const [,h] of html.matchAll(/href="#([^"]+)"/g)) if (!ids.has(h)) err('âncora quebrada #'+h);
for (const [,p] of html.matchAll(/(?:href|src)="((?!https?:|#|data:)[^"]+)"/g)) if (!existsSync('public/'+p)) err('arquivo ausente '+p);
for (const f of ['https://wa.me/5511910746006','https://maps.app.goo.gl/edA21knb3qENsjVK8','https://www.instagram.com/xfitmusculacaoavancada/']) if (!cfg.includes(f)) err('contato ausente '+f);
if (/href="#"/.test(html)) err('href="#" vazio');
console.log(bad ? bad+' problema(s)' : 'OK: âncoras, arquivos locais e contatos verificados');
process.exit(bad?1:0);
