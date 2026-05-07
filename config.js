/**
 * FORD POI v3.0 - CONFIGURAÇÃO DE DEPLOYMENT
 *
 * Instruções:
 * 1. Obtenha sua URL de deployment do Apps Script
 * 2. Substitua 'SEU_DEPLOYMENT_ID' abaixo
 * 3. Salve este arquivo junto com ford-poi-cascata.html
 */

// ⬇️ ATUALIZE AQUI COM SUA URL DE DEPLOYMENT ⬇️
const APPS_SCRIPT_DEPLOYMENT_ID = 'COLE_SEU_DEPLOYMENT_ID_AQUI';

// URLs de fallback (em caso de problema com deployment)
const APPS_SCRIPT_ENDPOINTS = {
    // URL de deployment (substitua o ID acima)
    production: `https://script.google.com/macros/s/${APPS_SCRIPT_DEPLOYMENT_ID}/exec`,

    // URL de desenvolvimento (funciona imediatamente após salvar o código)
    development: 'https://script.google.com/macros/d/1PuAMhRuAvGWleSmE1ce2Esl4MySL5_Dg2mJukJzJUZuRXbp7E2r5rTyC-/usercurrent/dev',

    // Fallback (tente esta se a acima não funcionar)
    fallback: 'https://script.google.com/macros/d/1PuAMhRuAvGWleSmE1ce2Esl4MySL5_Dg2mJukJzJUZuRXbp7E2r5rTyC-/dev'
};

// Selecione qual URL usar:
// - Usando 'development' como padrão (mais confiável)
// - Mude para 'production' após fazer clasp deploy
// - Use 'fallback' se nenhuma das acima funcionar
const SELECTED_ENDPOINT = 'development';

// URL final que será usada
const APPS_SCRIPT_URL = APPS_SCRIPT_ENDPOINTS[SELECTED_ENDPOINT];

console.log('🚀 FORD POI v3.0 Configurado');
console.log('📍 Endpoint:', SELECTED_ENDPOINT);
console.log('🔗 URL:', APPS_SCRIPT_URL);

// Se você está vendo isto no console e a URL não está completa,
// significa que você ainda não atualizou o DEPLOYMENT_ID acima!
if (APPS_SCRIPT_DEPLOYMENT_ID === 'COLE_SEU_DEPLOYMENT_ID_AQUI') {
    console.warn('⚠️  ATENÇÃO: Você ainda não atualizou o DEPLOYMENT_ID!');
    console.warn('📝 Siga os passos em: FORD_POI_v3_DEPLOYMENT_GUIDE.md');
}
