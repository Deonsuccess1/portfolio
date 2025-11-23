const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

(async () => {
  try {
    const root = path.resolve(__dirname, '..');
    const input = path.join(root, 'public', 'logo.svg');

    if (!fs.existsSync(input)) {
      console.error('Input file not found:', input);
      process.exit(1);
    }

    const sizes = [192, 256, 384, 512];

    for (const size of sizes) {
      const out = path.join(root, 'public', `icon-${size}x${size}.png`);
      await sharp(input)
        .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png({ quality: 100 })
        .toFile(out);
      console.log('Wrote', out);
    }

    console.log('All icons generated.');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
