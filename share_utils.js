/**
 * 参数快照与粘贴互通工具（共享给首页与商品分析页）
 * 说明：本文件仅包含与序列化/反序列化相关的纯工具函数，不依赖页面 DOM。
 * 使用方式：在需要的页面以 ES Module 方式导入下列函数。
 */

// ========== 容错数字解析 ==========
/**
 * 将各种人类输入的数字（含中文标点/百分号/空格）规范化为 Number
 * @param {any} v - 任意输入
 * @returns {number|null} - 可用数字或 null
 */
export function normalizeNumber(v) {
  if (v == null) return null;
  const s = String(v)
    .trim()
    .replace(/[，,]/g, '')
    .replace(/％|%/g, '')
    .replace(/[：:]/g, ':')
    .replace(/[＋+]/g, '+')
    .replace(/[－-]/g, '-')
    .replace(/[（\(]/g, '(')
    .replace(/[）\)]/g, ')')
    .replace(/。/g, '.');
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

/**
 * 解析百分比为 0~1 小数，容错输入：12 / 12% / 0.12
 * @param {any} v - 任意输入
 * @returns {number|null} - 小数或 null
 */
export function parsePercentTo01(v) {
  if (v == null) return null;
  const s = String(v).trim();
  if (/%|％/.test(s)) {
    const n = normalizeNumber(s);
    return n != null ? n / 100 : null;
  }
  const n = normalizeNumber(s);
  return n != null && n > 1 ? n / 100 : n;
}

// ========== BEV1 串生成/解析 ==========
/**
 * 生成单档 BEV1 串（机器可读的一行文本）
 * 约定：BEV1: 开头 + key=value; 分号分隔
 * @param {{price?:number,cost?:number,rr?:number,basis?:'effective'|'gmv',sku?:string,tier?:number}} payload
 */
export function makeBEV1Line({ price, cost, rr, basis = 'effective', sku, tier }) {
  const kv = [];
  if (price != null) kv.push(`price=${price}`);
  if (cost != null) kv.push(`cost=${cost}`);
  if (rr != null) kv.push(`rr=${(Number(rr) * 100).toFixed(2)}%`);
  if (basis) kv.push(`basis=${basis}`);
  if (sku) kv.push(`sku=${encodeURIComponent(String(sku))}`);
  if (tier != null) kv.push(`tier=${tier}`);
  return `BEV1: ${kv.join('; ')}`;
}

/**
 * 解析 BEV1 串，返回 {price,cost,rr,basis,sku,tier,...}
 * @param {string} str
 * @returns {object|null}
 */
export function parseBEV1Line(str) {
  const i = String(str).indexOf('BEV1:');
  if (i < 0) return null;
  const body = String(str).slice(i + 5).trim();
  const obj = {};
  body.split(';').forEach((pair) => {
    const [kRaw, vRaw] = pair.split('=');
    if (!kRaw || vRaw == null) return;
    const k = kRaw.trim();
    let v = vRaw.trim();
    if (k === 'rr') {
      obj.rr = parsePercentTo01(v);
    } else if (k === 'price' || k === 'cost' || k === 'tier') {
      obj[k] = normalizeNumber(v);
    } else if (k === 'basis') {
      obj.basis = /gmv/i.test(v) ? 'gmv' : 'effective';
    } else if (k === 'sku') {
      try {
        obj.sku = decodeURIComponent(v);
      } catch (_) {
        obj.sku = v;
      }
    } else {
      obj[k] = v;
    }
  });
  return obj;
}

// ========== 人类可读块解析 ==========
/**
 * 当没有 BEV1 串时，尝试解析人类可读的中文块
 * 允许格式：
 *  售价：79.8
 *  进货价：28.5
 *  退货率：12%
 *  口径：有效/GMV
 * @param {string} str
 * @returns {object|null}
 */
export function parseHumanBlock(str) {
  const out = {};
  const lines = String(str).split(/\r?\n/);
  for (const line of lines) {
    const s = line.trim();
    if (/^售价/.test(s)) out.price = normalizeNumber(s.split(/[:：]/)[1]);
    else if (/^进货价/.test(s)) out.cost = normalizeNumber(s.split(/[:：]/)[1]);
    else if (/^退货率/.test(s)) out.rr = parsePercentTo01(s.split(/[:：]/)[1]);
    else if (/^口径/.test(s)) out.basis = /gmv/i.test(s) ? 'gmv' : 'effective';
  }
  return out.price != null || out.cost != null || out.rr != null ? out : null;
}

// ========== 快照 JSON 编解码 ==========
/**
 * 构造快照 JSON（可放到 URL hash）
 * @param {Array} items - 商品数组，详见 README 中约定
 * @param {'effective'|'gmv'} basis
 * @param {Object} globals - 可选全局参数（如平台/佣金率等）
 */
export function makeSnapshotJSON(items, basis, globals = {}) {
  return {
    type: 'breakeven.snapshot.v1',
    basis,
    createdAt: Date.now(),
    items,
    globals,
  };
}

/**
 * 将快照对象编码为 #snap=xxxx 的 hash 片段
 * @param {Object} obj
 */
export function encodeSnapshotToHash(obj) {
  const json = JSON.stringify(obj);
  const b64 = btoa(unescape(encodeURIComponent(json)));
  return '#snap=' + encodeURIComponent(b64);
}

/**
 * 从 URL hash（或传入的hash字符串）解析出快照对象
 * @param {string} hash
 * @returns {Object|null}
 */
export function decodeSnapshotFromHash(hash) {
  const m = String(hash || (typeof location !== 'undefined' ? location.hash : '')).match(/#snap=([^&]+)/);
  if (!m) return null;
  try {
    const json = decodeURIComponent(m[1]);
    return JSON.parse(decodeURIComponent(escape(atob(json))));
  } catch (_) {
    return null;
  }
}


