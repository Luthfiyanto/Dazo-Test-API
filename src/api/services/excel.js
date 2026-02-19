import fs from "fs";
import path from "path";
import XLSX from "xlsx";
import dayjs from "dayjs";

const FILE_PATH = path.resolve("logs", "product_leads.xlsx");

const HEADER = ["Tanggal", "Produk", "Pesan User", "Balasan AI"];

function ensureDirectory() {
  const dir = path.dirname(FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function createFileIfNotExists() {
  if (!fs.existsSync(FILE_PATH)) {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([HEADER]);
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    XLSX.writeFile(wb, FILE_PATH);
  }
}

export async function logProductToExcel({ product, userMessage, aiReply }) {
  ensureDirectory();
  createFileIfNotExists();

  const wb = XLSX.readFile(FILE_PATH);
  const ws = wb.Sheets["Leads"];

  const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

  data.push([dayjs().format("YYYY-MM-DD HH:mm:ss"), product, userMessage, aiReply]);
  const newWs = XLSX.utils.aoa_to_sheet(data);
  wb.Sheets["Leads"] = newWs;

  XLSX.writeFile(wb, FILE_PATH);

  console.log("Lead saved:", product);
  return true;
}
