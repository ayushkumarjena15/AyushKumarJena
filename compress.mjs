import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'fs/promises';
import { join, extname } from 'path';

const dirs = ['public', 'src/assets'];
const exts = ['.jpg', '.jpeg', '.png', '.webp'];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...await walk(full));
    else if (exts.includes(extname(e.name).toLowerCase())) files.push(full);
  }
  return files;
}

async function compress(file) {
  const ext = extname(file).toLowerCase();
  const before = (await stat(file)).size;
  const tmp = file + '.tmp';
  try {
    let p = sharp(file);
    const meta = await p.metadata();
    if (meta.width > 1200) p = p.resize(1200, null, { withoutEnlargement: true });

    if (ext === '.png') {
      await p.png({ compressionLevel: 9, quality: 70, effort: 10 }).toFile(tmp);
    } else if (ext === '.webp') {
      await p.webp({ quality: 65, effort: 6 }).toFile(tmp);
    } else {
      await p.jpeg({ quality: 65, mozjpeg: true }).toFile(tmp);
    }

    const after = (await stat(tmp)).size;
    if (after < before) {
      await rename(tmp, file);
      const tag = file.replace(/\/g, '/').split('/').slice(-2).join('/');
      console.log(`✓ ${tag}  ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB  (-${Math.round((1-after/before)*100)}%)`);
    } else {
      await unlink(tmp);
      const tag = file.replace(/\/g, '/').split('/').slice(-2).join('/');
      console.log(`~ ${tag}  already optimal`);
    }
  } catch(e) {
    console.error(`✗ ${file}: ${e.message}`);
    try { await unlink(tmp); } catch {}
  }
}

const all = [];
for (const d of dirs) all.push(...await walk(d));
console.log(`Found ${all.length} images\n`);
for (const f of all) await compress(f);
console.log('\nDone!');
