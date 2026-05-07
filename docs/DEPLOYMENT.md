# 🚀 FORD POI v3.0 - GUIA COMPLETO DE DEPLOYMENT

**Status:** Pronto para Deploy  
**Data:** 06 de Maio de 2026  
**Tempo Estimado:** 20 minutos  

---

## 📋 O que você tem

✅ **Backend Apps Script:** Código completo e testado  
✅ **Frontend HTML:** Interface cascata pronta  
✅ **Dados:** Google Sheets com 12 PDVs e ~45 POIs  
✅ **Documentação:** Análise estruturada concluída  

---

## ⚠️ PROBLEMA CONHECIDO

Os diálogos de deployment no Google Apps Script estão apresentando problemas de carregamento de UI. **Solução:** Use a URL de projeto direto com um wrapper de deployment.

---

## 🔧 MÉTODO RÁPIDO (Recomendado)

### Passo 1: Deploy do Apps Script via Editor

1. **Abra o projeto:** https://script.google.com/home/projects/1PuAMhRuAvGWleSmE1ce2Esl4MSL5_Dg2mJukJzJUZuRXbp7E2r5rTyC-/edit

2. **Se os diálogos não carregarem:**
   - Abra o **Console do Navegador** (F12)
   - Cole o código abaixo:
   ```javascript
   // Script para criar deployment automaticamente
   async function criarDeploymentAutomatico() {
       try {
           const response = await fetch('https://script.googleapis.com/v1/projects/1PuAMhRuAvGWleSmE1ce2Esl4MSL5_Dg2mJukJzJUZuRXbp7E2r5rTyC-/deployments', {
               method: 'POST',
               headers: {
                   'Authorization': 'Bearer ' + gapi.auth.getToken().access_token,
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                   "function": "doGet",
                   "description": "FORD POI v3 Web App"
               })
           });
           const data = await response.json();
           console.log('Deployment criado:', data.deploymentId);
           // Copie o deploymentId e use a URL: https://script.google.com/macros/s/{deploymentId}/exec
       } catch (error) {
           console.error('Erro:', error);
       }
   }
   criarDeploymentAutomatico();
   ```

3. **Alternative: Use clasp (via terminal)**
   ```bash
   npm install -g @google/clasp
   clasp login
   cd seu-projeto
   clasp create --type standalone --title "FORD POI v3"
   clasp push
   clasp deploy
   ```

---

## 📍 DEPLOYMENT URL ALTERNATIVA

Se o método acima não funcionar, use este padrão direto:

```
https://script.google.com/macros/d/1PuAMhRuAvGWleSmE1ce2Esl4MySL5_Dg2mJukJzJUZuRXbp7E2r5rTyC-/usercurrent/dev
```

> **Nota:** Esta URL permite testes diretos sem deployment formal. Substitua no HTML em: `const APPS_SCRIPT_URL = '...'`

---

## 🌐 PASSO 2: Hospedar o Frontend

### Opção A: GitHub Pages (Recomendado)

```bash
# 1. Crie um repositório no GitHub
# nome: ford-poi-v3

# 2. Clone o repositório
git clone https://github.com/seu-usuario/ford-poi-v3
cd ford-poi-v3

# 3. Copie os arquivos
cp ford-poi-cascata.html index.html

# 4. Crie um arquivo de configuração (.env ou config.js)
cat > config.js << 'EOF'
// Substitua com sua URL de deployment
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/COLE_SUA_DEPLOYMENT_ID_AQUI/exec';
EOF

# 5. Atualize o HTML para usar a config
# No arquivo HTML, mude a linha 505 de:
# const APPS_SCRIPT_URL = '...'
# Para:
# <script src="config.js"></script>
# const APPS_SCRIPT_URL = window.APPS_SCRIPT_URL || 'https://...';

# 6. Faça commit
git add .
git commit -m "Ford POI v3 - Frontend"
git push origin main

# 7. Ative GitHub Pages
# Settings > Pages > Source: main > Save
# URL: https://seu-usuario.github.io/ford-poi-v3
```

### Opção B: Google Sites

1. Vá para https://sites.google.com
2. Novo site
3. Inserir > Incorporar código > Cole todo o HTML
4. Publique

### Opção C: Vercel (Mais rápido)

```bash
npm install -g vercel
vercel
# Selecione a pasta do projeto
# Siga as instruções
```

---

## 📝 PASSO 3: Configurar a URL no HTML

**Arquivo:** `ford-poi-cascata.html`  
**Linha:** 505

**Antes:**
```javascript
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxQrGElthlzHzWFjdrDRqioa17AmMCcFF7fgLsh99CiWhlMnAeveaf3uSFZ15rSaxP4/exec';
```

**Depois:**
```javascript
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/SEU_DEPLOYMENT_ID_AQUI/exec';
```

Para obter o `SEU_DEPLOYMENT_ID`:
1. Vá ao Apps Script
2. Clique em "Implantar" > "Gerenciar implantações"
3. Copie a URL: `https://script.google.com/macros/s/[DEPLOYMENT_ID]/exec`

---

## ✅ TESTES

Depois de tudo configurado:

```bash
# 1. Abra a página
# https://seu-github.github.io/ford-poi-v3

# 2. Console (F12) deve mostrar:
# ✅ "Carregando dados..."
# ✅ "PDVs carregados: 12"
# ✅ "POIs carregados: ~45"

# 3. Testes funcionais:
# ✅ Clique em um PDV
# ✅ POIs aparecem
# ✅ Clique em um POI
# ✅ Formulário abre
# ✅ Preencha e salve
# ✅ Dados persistem na Google Sheets
```

---

## 🆘 TROUBLESHOOTING

| Problema | Solução |
|----------|---------|
| "CORS error" | Apps Script precisa estar deployado como "Qualquer pessoa" |
| "Nenhum PDV encontrado" | Verifique Google Sheets: abas "PDVs" e "Pontos_Interesse" |
| "Erro ao carregar dados" | URL de deployment está incorreta ou Apps Script não está respondendo |
| "Formulário não salva" | POST para Apps Script está sendo bloqueado - verifique doPost() |

---

## 🎯 PRÓXIMOS PASSOS

1. ✅ Fazer deploy do Apps Script
2. ✅ Hospedar HTML (GitHub Pages / Vercel)
3. ✅ Testar acesso aos dados
4. ✅ Testar criação/edição de POIs
5. ✅ Treinar promotor
6. ✅ Monitorar logs

---

## 📞 SUPORTE

Se encontrar problemas:

1. **Verificar Console do Navegador** (F12)
   - Procurar mensagens de erro em vermelho
   - Copiar erro completo

2. **Verificar Logs do Apps Script**
   - Script.google.com > Execuções
   - Procurar por erros na execução

3. **Testar Endpoint Diretamente**
   ```
   Coloque a URL no navegador:
   https://script.google.com/macros/s/[ID]/exec
   
   Deve retornar JSON com:
   {
     "sucesso": true,
     "pdvs": [...],
     "pois": [...],
     "cascata": [...]
   }
   ```

---

## 🎉 RESULTADO FINAL

Após completar os passos:

```
✅ Ford POI v3.0 Totalmente Funcional

Interface:
├── Painel Esquerdo: 12 PDVs com contagem
├── Painel Topo-Direito: POIs filtrados
├── Painel Baixo-Direito: Formulário completo
└── Dados: Sincronizados em tempo real

Funcionalidades:
✅ Carregar PDVs
✅ Filtrar POIs por PDV
✅ Abrir formulário
✅ Criar novo POI
✅ Editar POI existente
✅ Salvar automaticamente
✅ Pronto para produção! 🚀
```

---

**Guia Criado:** 06 de Maio de 2026  
**Versão:** Final  
**Status:** ✅ Pronto para Deploy
