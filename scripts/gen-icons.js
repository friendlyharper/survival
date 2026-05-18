// Generates PWA icons as PNG files using pure Node.js (no external dependencies)
// Uses raw PNG encoding with a simple flame/fire design

const fs = require('fs')
const path = require('path')
const zlib = require('zlib')

function crc32(buf) {
    const table = []
    for (let i = 0; i < 256; i++) {
        let c = i
        for (let j = 0; j < 8; j++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
        table[i] = c
    }
    let crc = 0xffffffff
    for (const byte of buf) crc = (crc >>> 8) ^ table[(crc ^ byte) & 0xff]
    return (crc ^ 0xffffffff) >>> 0
}

function uint32BE(n) {
    const b = Buffer.alloc(4)
    b.writeUInt32BE(n, 0)
    return b
}

function pngChunk(type, data) {
    const typeBytes = Buffer.from(type, 'ascii')
    const lenBytes = uint32BE(data.length)
    const crcInput = Buffer.concat([typeBytes, data])
    const crcBytes = uint32BE(crc32(crcInput))
    return Buffer.concat([lenBytes, typeBytes, data, crcBytes])
}

// Draw a flame icon on an RGBA grid
function drawIcon(size) {
    const pixels = new Uint8Array(size * size * 4)

    // Background: dark (#1a1a1a)
    for (let i = 0; i < size * size; i++) {
        pixels[i * 4 + 0] = 26
        pixels[i * 4 + 1] = 26
        pixels[i * 4 + 2] = 26
        pixels[i * 4 + 3] = 255
    }

    function setPixel(x, y, r, g, b, a = 255) {
        if (x < 0 || x >= size || y < 0 || y >= size) return
        const idx = (y * size + x) * 4
        pixels[idx] = r
        pixels[idx + 1] = g
        pixels[idx + 2] = b
        pixels[idx + 3] = a
    }

    // Draw a flame shape using parametric rendering
    const cx = size / 2
    const baseY = size * 0.85
    const flameH = size * 0.7
    const flameW = size * 0.45

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const nx = (x - cx) / flameW       // normalized -1..1 horizontal
            const ny = (baseY - y) / flameH     // normalized 0..1 vertical (0=base, 1=tip)

            if (ny < 0 || ny > 1) continue

            // Flame profile: wider at bottom, narrowing to tip
            // With a slight lean to make it look like a real flame
            const leaning = ny * 0.15
            const profile = Math.sin(ny * Math.PI) * (1 - ny * 0.5)
            const inOuter = Math.abs(nx - leaning) < profile * 0.9
            const inInner = Math.abs(nx - leaning) < profile * 0.5 && ny < 0.6
            const inCore = Math.abs(nx - leaning * 0.5) < profile * 0.22 && ny < 0.35

            if (inOuter) {
                let r, g, b
                if (inCore) {
                    // White-hot core
                    r = 255; g = 240; b = 200
                } else if (inInner) {
                    // Yellow-orange middle
                    r = 255; g = 165; b = 40
                } else {
                    // Orange-red outer
                    r = 220; g = 70; b = 15
                }
                setPixel(x, y, r, g, b)
            }
        }
    }

    // Inner blue base flicker (bottom center)
    const blueR = Math.floor(size * 0.08)
    const blueX = Math.floor(cx)
    const blueY = Math.floor(baseY - size * 0.03)
    for (let y = blueY - blueR; y <= blueY + blueR; y++) {
        for (let x = blueX - blueR; x <= blueX + blueR; x++) {
            const dx = x - blueX
            const dy = (y - blueY) * 1.5
            if (dx * dx + dy * dy <= blueR * blueR) {
                setPixel(x, y, 100, 150, 255)
            }
        }
    }

    return pixels
}

function buildPNG(size) {
    const pixels = drawIcon(size)

    // PNG signature
    const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

    // IHDR
    const ihdr = Buffer.alloc(13)
    ihdr.writeUInt32BE(size, 0)
    ihdr.writeUInt32BE(size, 4)
    ihdr[8] = 8  // bit depth
    ihdr[9] = 2  // color type RGB (no alpha in header, but we handle below)
    ihdr[9] = 6  // color type RGBA
    ihdr[10] = 0 // compression
    ihdr[11] = 0 // filter
    ihdr[12] = 0 // interlace

    // Build raw scanlines (filter byte 0 + RGBA row)
    const raw = []
    for (let y = 0; y < size; y++) {
        raw.push(0) // filter type None
        for (let x = 0; x < size; x++) {
            const i = (y * size + x) * 4
            raw.push(pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3])
        }
    }

    const compressed = zlib.deflateSync(Buffer.from(raw), { level: 6 })

    return Buffer.concat([
        sig,
        pngChunk('IHDR', ihdr),
        pngChunk('IDAT', compressed),
        pngChunk('IEND', Buffer.alloc(0)),
    ])
}

const outDir = path.join(__dirname, '..', 'public', 'icons')
fs.mkdirSync(outDir, { recursive: true })

const sizes = [192, 512]
for (const size of sizes) {
    const png = buildPNG(size)
    const outPath = path.join(outDir, `icon-${size}.png`)
    fs.writeFileSync(outPath, png)
    console.log(`Written: ${outPath} (${png.length} bytes)`)
}

console.log('PWA icons generated successfully.')
