import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const version = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8')).version;
const archive = path.join(root, 'dist', `geekx-skills-v${version}.zip`);

const include = [
  'assets',
  'skills',
  'README.md',
  'LICENSE',
  'CHANGELOG.md',
  'AGENTS.md',
  'VERSION',
];

const crcTable = new Uint32Array(256);
for (let i = 0; i < 256; i += 1) {
  let c = i;
  for (let j = 0; j < 8; j += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  crcTable[i] = c >>> 0;
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function dosDateTime(date) {
  const year = Math.max(date.getFullYear(), 1980);
  const dosTime = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
  const dosDate = ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  return { dosTime, dosDate };
}

async function listFiles(entry) {
  const abs = path.join(root, entry);
  if (!existsSync(abs)) return [];
  const info = await stat(abs);
  if (info.isFile()) return [entry];
  const children = await readdir(abs);
  const nested = await Promise.all(children.map((child) => listFiles(path.posix.join(entry, child))));
  return nested.flat();
}

const files = (await Promise.all(include.map(listFiles))).flat().sort();
const localParts = [];
const centralParts = [];
let offset = 0;

function u16(value) {
  const buffer = Buffer.alloc(2);
  buffer.writeUInt16LE(value);
  return buffer;
}

function u32(value) {
  const buffer = Buffer.alloc(4);
  buffer.writeUInt32LE(value >>> 0);
  return buffer;
}

for (const file of files) {
  const abs = path.join(root, file);
  const data = await readFile(abs);
  const info = await stat(abs);
  const name = Buffer.from(file.replaceAll(path.sep, '/'));
  const crc = crc32(data);
  const { dosTime, dosDate } = dosDateTime(info.mtime);

  const localHeader = Buffer.concat([
    u32(0x04034b50),
    u16(20),
    u16(0x0800),
    u16(0),
    u16(dosTime),
    u16(dosDate),
    u32(crc),
    u32(data.length),
    u32(data.length),
    u16(name.length),
    u16(0),
    name,
  ]);

  localParts.push(localHeader, data);

  const centralHeader = Buffer.concat([
    u32(0x02014b50),
    u16(20),
    u16(20),
    u16(0x0800),
    u16(0),
    u16(dosTime),
    u16(dosDate),
    u32(crc),
    u32(data.length),
    u32(data.length),
    u16(name.length),
    u16(0),
    u16(0),
    u16(0),
    u16(0),
    u32(0),
    u32(offset),
    name,
  ]);

  centralParts.push(centralHeader);
  offset += localHeader.length + data.length;
}

const central = Buffer.concat(centralParts);
const end = Buffer.concat([
  u32(0x06054b50),
  u16(0),
  u16(0),
  u16(files.length),
  u16(files.length),
  u32(central.length),
  u32(offset),
  u16(0),
]);

await mkdir(path.dirname(archive), { recursive: true });
await writeFile(archive, Buffer.concat([...localParts, central, end]));
console.log(path.relative(root, archive));
