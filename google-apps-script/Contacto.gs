/**
 * Formulario de contacto del portafolio → Google Sheets.
 *
 * Cómo instalarlo (ver también el README):
 * 1. Crea una hoja de cálculo nueva en Google Sheets.
 * 2. Extensiones > Apps Script. Borra lo que haya y pega este archivo completo. Guarda.
 * 3. Implementar > Nueva implementación > Tipo: Aplicación web.
 *    - Ejecutar como: Yo
 *    - Quién tiene acceso: Cualquier usuario
 * 4. Autoriza los permisos y copia la URL que termina en /exec.
 * 5. Pega esa URL en data/profile.ts → contactEndpoint, y vuelve a compilar.
 *
 * Cada mensaje se guarda como una fila nueva y además te llega un aviso al correo
 * de la cuenta de Google que hizo la implementación.
 */

const SHEET_NAME = "Mensajes";
const NOTIFY_BY_EMAIL = true;
const MAX = { name: 120, email: 160, message: 4000 };

function doPost(e) {
  const p = (e && e.parameter) || {};

  // Campo trampa: los humanos no lo ven; si viene lleno es un bot
  if (p.website) return json({ ok: true });

  const name = clean(p.name, MAX.name);
  const email = clean(p.email, MAX.email);
  const message = clean(p.message, MAX.message);
  if (!name || !email || !message) return json({ ok: false, error: "missing" });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    getSheet().appendRow([new Date(), name, email, message, clean(p.lang, 5)]);
  } finally {
    lock.releaseLock();
  }

  if (NOTIFY_BY_EMAIL) {
    MailApp.sendEmail({
      to: Session.getEffectiveUser().getEmail(),
      replyTo: email,
      subject: "Nuevo mensaje del portafolio: " + name,
      body: name + " <" + email + ">\n\n" + message,
    });
  }

  return json({ ok: true });
}

function getSheet() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = book.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = book.insertSheet(SHEET_NAME);
    sheet.appendRow(["Fecha", "Nombre", "Correo", "Mensaje", "Idioma"]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Corta el texto y evita que Sheets lo interprete como fórmula (=, +, -, @)
function clean(value, max) {
  const text = String(value || "").trim().slice(0, max);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
