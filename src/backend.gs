// FORD POI v3.0 - BACKEND SIMPLIFICADO
const SPREADSHEET_ID = '1-GiXB7c1IiB9GKlaBetSBSKYwKs0HinTaS3E4PTNFYs';
const SHEET_PDVS = 'PDVs';
const SHEET_POIS = 'Pontos_Interesse';

function doGet(e) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const pdvsSheet = ss.getSheetByName(SHEET_PDVS);
    const poisSheet = ss.getSheetByName(SHEET_POIS);

    const pdvs = carregarPDVs(pdvsSheet);
    const pois = carregarPOIs(poisSheet);
    const cascata = montarCascata(pdvs, pois);

    const resposta = {
      sucesso: true,
      timestamp: new Date().toISOString(),
      pdvs: pdvs,
      pois: pois,
      cascata: cascata,
      totais: {
        pdvs: pdvs.length,
        pois: pois.length
      }
    };

    return ContentService.createTextOutput(JSON.stringify(resposta))
      .setMimeType(ContentService.MimeType.JSON)
      .addHeader('Access-Control-Allow-Origin', '*');

  } catch (error) {
    Logger.log('ERRO: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({sucesso: false, erro: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function carregarPDVs(sheet) {
  const dados = sheet.getDataRange().getValues();
  const headers = dados[0];
  const pdvs = [];

  for (let i = 1; i < dados.length; i++) {
    const row = dados[i];
    const idPdv = row[0];

    if (idPdv && idPdv > 0 && idPdv <= 12) {
      const pdv = {};
      for (let j = 0; j < headers.length; j++) {
        pdv[headers[j]] = row[j] || '';
      }
      pdvs.push(pdv);
    }
  }

  return pdvs;
}

function carregarPOIs(sheet) {
  const dados = sheet.getDataRange().getValues();
  const headers = dados[0];
  const pois = [];

  for (let i = 1; i < dados.length; i++) {
    const row = dados[i];
    const id = row[0];
    const idPdv = row[1];

    if (id && idPdv && idPdv > 0 && idPdv <= 12) {
      const poi = {};
      for (let j = 0; j < headers.length; j++) {
        poi[headers[j]] = row[j] || '';
      }
      pois.push(poi);
    }
  }

  return pois;
}

function montarCascata(pdvs, pois) {
  const cascata = [];

  pdvs.forEach(pdv => {
    const idPdv = pdv['ID_PDV'];
    const poisDoPdv = pois.filter(poi => poi['ID_PDV'] == idPdv);

    cascata.push({
      pdv: pdv,
      pois: poisDoPdv,
      quantidadePOIs: poisDoPdv.length
    });
  });

  return cascata;
}

function doPost(e) {
  try {
    const dados = JSON.parse(e.postData.contents);

    if (dados.acao === 'salvarPOI') {
      return ContentService.createTextOutput(JSON.stringify({sucesso: true, mensagem: 'POI salvo'}))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({sucesso: false, erro: 'Acao nao reconhecida'}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({sucesso: false, erro: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
