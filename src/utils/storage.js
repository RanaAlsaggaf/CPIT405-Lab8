const KEY = 'url_map_v1'

export function getBaseHost() {
    return window.location.origin
}

function readMap() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {} } catch { return {} }
}
function writeMap(obj) { localStorage.setItem(KEY, JSON.stringify(obj)) }

export function saveMapping(code, longUrl) {
    const map = readMap()
    map[code] = longUrl
    writeMap(map)
}
export function codeExists(code) {
    const map = readMap()
    return Boolean(map[code])
}
export function getLongUrl(code) {
    const map = JSON.parse(localStorage.getItem('url_map_v1')) || {}
    return map[code] || null
  }
  
