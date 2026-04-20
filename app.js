/* global htmlToImage */

const BRAND_BOTTOM_LOGO_URL =
  'https://r.resimlink.com/RAqf21BspoiC.png'

const STORAGE_KEYS = {
  authed: 'df_authed_static',
  form: 'df_form_static_v1',
  brandLogo: 'df_brand_logo_dataurl_v1',
}

const TEMPLATES = [
  // Apple-simplicity: monochrome palettes, different shapes + type styles
  { id: 'hero-glass-sf', name: '01 • Hero Cam • SF', layoutClass: 'layout-hero-glass', accent: '#ffffff', accent2: '#cfcfcf', glow: 'rgba(255,255,255,.10)', fontDisplay: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif', fontBody: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif' },
  { id: 'split-panel-sf', name: '02 • Split Panel • SF', layoutClass: 'layout-split-panel', accent: '#ffffff', accent2: '#cfcfcf', glow: 'rgba(255,255,255,.10)', fontDisplay: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif', fontBody: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif' },
  { id: 'corner-badges-sf', name: '03 • Köşe Rozet • SF', layoutClass: 'layout-corner-badges', accent: '#ffffff', accent2: '#cfcfcf', glow: 'rgba(255,255,255,.10)', fontDisplay: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif', fontBody: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif' },
  { id: 'poster-sf', name: '04 • Poster • SF', layoutClass: 'layout-poster', accent: '#ffffff', accent2: '#cfcfcf', glow: 'rgba(255,255,255,.10)', fontDisplay: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif', fontBody: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif' },

  // Serif editorial feel (different font vibe)
  { id: 'editorial-serif', name: '05 • Editoryal • Serif', layoutClass: 'layout-editorial', accent: '#ffffff', accent2: '#cfcfcf', glow: 'rgba(255,255,255,.10)', fontDisplay: 'ui-serif, Georgia, "Times New Roman", Times, serif', fontBody: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif' },
  { id: 'luxury-frame-serif', name: '06 • Luxury Frame • Serif', layoutClass: 'layout-luxury-frame', accent: '#ffffff', accent2: '#cfcfcf', glow: 'rgba(255,255,255,.10)', fontDisplay: 'ui-serif, Georgia, "Times New Roman", Times, serif', fontBody: 'ui-serif, Georgia, "Times New Roman", Times, serif' },

  // Monospace tech minimal
  { id: 'minimalist-mono', name: '07 • Minimalist • Mono', layoutClass: 'layout-minimalist', accent: '#ffffff', accent2: '#cfcfcf', glow: 'rgba(255,255,255,.10)', fontDisplay: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace', fontBody: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif' },

  // More shape-driven layouts
  { id: 'diagonal-cut-sf', name: '08 • Diyagonal Kesim • SF', layoutClass: 'layout-diagonal-cut', accent: '#ffffff', accent2: '#cfcfcf', glow: 'rgba(255,255,255,.10)', fontDisplay: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif', fontBody: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif' },
  { id: 'clean-panels-sf', name: '09 • Panelli • SF', layoutClass: 'layout-clean-panels', accent: '#ffffff', accent2: '#cfcfcf', glow: 'rgba(255,255,255,.10)', fontDisplay: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif', fontBody: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif' },

  // Extra variants (font+layout mix)
  { id: 'poster-serif', name: '10 • Poster • Serif', layoutClass: 'layout-poster', accent: '#ffffff', accent2: '#cfcfcf', glow: 'rgba(255,255,255,.10)', fontDisplay: 'ui-serif, Georgia, "Times New Roman", Times, serif', fontBody: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif' },
  { id: 'corner-badges-mono', name: '11 • Köşe Rozet • Mono', layoutClass: 'layout-corner-badges', accent: '#ffffff', accent2: '#cfcfcf', glow: 'rgba(255,255,255,.10)', fontDisplay: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace', fontBody: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' },
  { id: 'hero-glass-serif', name: '12 • Hero Cam • Serif', layoutClass: 'layout-hero-glass', accent: '#ffffff', accent2: '#cfcfcf', glow: 'rgba(255,255,255,.10)', fontDisplay: 'ui-serif, Georgia, "Times New Roman", Times, serif', fontBody: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif' },
]

function $(id) {
  return document.getElementById(id)
}

function setHidden(el, hidden) {
  el.classList.toggle('hidden', !!hidden)
}

function setError(el, msg) {
  if (!msg) {
    el.textContent = ''
    setHidden(el, true)
    return
  }
  el.textContent = msg
  setHidden(el, false)
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader()
    r.onerror = () => reject(new Error('Dosya okunamadı.'))
    r.onload = () => resolve(String(r.result || ''))
    r.readAsDataURL(file)
  })
}

function isLandAsset(assetType) {
  return assetType === 'arsa' || assetType === 'hobi'
}

function assetTypeLabel(assetType) {
  if (assetType === 'daire') return 'DAİRE'
  if (assetType === 'arsa') return 'ARSA'
  if (assetType === 'hobi') return 'HOBİ BAHÇESİ'
  if (assetType === 'mustakil') return 'MÜSTAKİL EV'
  return String(assetType || '').toUpperCase()
}

function dealTypeLabel(dealType) {
  if (dealType === 'satilik') return 'SATILIK'
  if (dealType === 'kiralik') return 'KİRALIK'
  return String(dealType || '').toUpperCase()
}

function readFormState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.form)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function readBrandLogo() {
  try {
    const v = localStorage.getItem(STORAGE_KEYS.brandLogo)
    return v ? String(v) : ''
  } catch {
    return ''
  }
}

function saveBrandLogo(dataUrl) {
  try {
    if (!dataUrl) {
      localStorage.removeItem(STORAGE_KEYS.brandLogo)
      return
    }
    localStorage.setItem(STORAGE_KEYS.brandLogo, String(dataUrl))
  } catch {
    // ignore
  }
}

function saveFormState(state) {
  localStorage.setItem(STORAGE_KEYS.form, JSON.stringify(state))
}

function getCurrentState() {
  const assetType = $('assetTypeSelect').value
  return {
    mode: $('modeSelect').value,
    templateId: $('templateSelect').value,
    assetType,
    dealType: $('dealTypeSelect').value,
    titleText: $('titleInput').value,
    descText: $('descInput').value,
    priceText: $('priceInput').value,
    areaText: $('areaInput').value,
    consultantName: $('consultantNameInput').value,
    consultantPhone: $('consultantPhoneInput').value,
  }
}

function applyStateToForm(state) {
  if (!state) return
  if (state.mode) $('modeSelect').value = state.mode
  if (state.templateId) $('templateSelect').value = state.templateId
  if (state.assetType) $('assetTypeSelect').value = state.assetType
  if (state.dealType) $('dealTypeSelect').value = state.dealType
  if (typeof state.titleText === 'string') $('titleInput').value = state.titleText
  if (typeof state.descText === 'string') $('descInput').value = state.descText
  if (typeof state.priceText === 'string') $('priceInput').value = state.priceText
  if (typeof state.areaText === 'string') $('areaInput').value = state.areaText
  if (typeof state.consultantName === 'string') $('consultantNameInput').value = state.consultantName
  if (typeof state.consultantPhone === 'string') $('consultantPhoneInput').value = state.consultantPhone
}

function updateAreaLabelAndPlaceholder() {
  const land = isLandAsset($('assetTypeSelect').value)
  $('areaLabel').textContent = land ? 'Dönüm' : 'Oda Sayısı'
  $('areaInput').placeholder = land ? 'Örn: 2.5' : 'Örn: 3+1'
  // Canvas chip is just text; user can type "2.5" and it will render like "2.5 DÖNÜM"
}

function updateCanvasFromState(state, photoDataUrl) {
  $('chipDeal').textContent = dealTypeLabel(state.dealType)
  $('chipAsset').textContent = assetTypeLabel(state.assetType)

  const land = isLandAsset(state.assetType)
  const area = String(state.areaText || '').trim()
  $('chipArea').textContent = land ? (area ? `${area} DÖNÜM` : 'DÖNÜM') : (area ? area.toUpperCase() : 'ODA')

  $('canvasTitle').textContent = (state.titleText || '').trim() || 'LÜKS GAYRİMENKUL'

  const desc = String(state.descText || '').trim()
  const descEl = $('canvasDesc')
  if (desc) {
    descEl.textContent = desc
    setHidden(descEl, false)
  } else {
    descEl.textContent = ''
    setHidden(descEl, true)
  }

  $('canvasPrice').textContent = (state.priceText || '').trim() || 'Fiyat Teklifi Alın'

  $('canvasAgentName').textContent = (state.consultantName || '').trim() || 'Dialog Fanus Danışmanı'
  $('canvasAgentPhone').textContent = (state.consultantPhone || '').trim() || 'Dialog Fanus Hattı'

  const mode = state.mode === 'story' ? 'st' : 'sq'
  const template = TEMPLATES.find((t) => t.id === state.templateId) || TEMPLATES[0]

  const htmlCanvas = $('htmlCanvas')
  htmlCanvas.className = `htmlCanvas ${mode} ${template.layoutClass}`
  htmlCanvas.style.setProperty('--accent', template.accent)
  htmlCanvas.style.setProperty('--accent2', template.accent2)
  htmlCanvas.style.setProperty('--glow', template.glow)
  if (template.fontBody) htmlCanvas.style.setProperty('--font-body', template.fontBody)
  if (template.fontDisplay) htmlCanvas.style.setProperty('--font-display', template.fontDisplay)

  const savedBrand = readBrandLogo()
  $('bottomLogo').src = savedBrand || BRAND_BOTTOM_LOGO_URL

  const img = $('canvasPhoto')
  const ph = $('canvasPhotoPlaceholder')
  if (photoDataUrl) {
    img.src = photoDataUrl
    setHidden(img, false)
    setHidden(ph, true)
  } else {
    img.removeAttribute('src')
    setHidden(img, true)
    setHidden(ph, false)
  }
}

function validateState(state) {
  if (!(state.titleText || '').trim()) return 'Başlık zorunludur.'
  if (!(state.priceText || '').trim()) return 'Fiyat zorunludur.'
  if (!(state.areaText || '').trim()) return isLandAsset(state.assetType) ? 'Dönüm zorunludur.' : 'Oda sayısı zorunludur.'
  if (!(state.consultantName || '').trim()) return 'Danışman adı zorunludur.'
  if (!(state.consultantPhone || '').trim()) return 'Telefon zorunludur.'
  return ''
}

async function runProgress15s(onDone, onTick) {
  const duration = 15000
  const intervalTime = 100
  const steps = Math.floor(duration / intervalTime)
  let current = 0
  return await new Promise((resolve) => {
    const t = setInterval(async () => {
      current++
      const p = Math.min(98, Math.floor((current / steps) * 98))
      onTick(p)
      if (current >= steps) {
        clearInterval(t)
        await onDone()
        resolve()
      }
    }, intervalTime)
  })
}

function downloadDataUrlPng(dataUrl) {
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = `dialogfanus-${Date.now()}.png`
  document.body.appendChild(a)
  a.click()
  a.remove()
}

function renderTemplatesSelect() {
  const sel = $('templateSelect')
  sel.innerHTML = ''
  for (const t of TEMPLATES) {
    const opt = document.createElement('option')
    opt.value = t.id
    opt.textContent = t.name
    sel.appendChild(opt)
  }
}

function bindAutosave() {
  const ids = [
    'modeSelect',
    'templateSelect',
    'assetTypeSelect',
    'dealTypeSelect',
    'titleInput',
    'descInput',
    'priceInput',
    'areaInput',
    'consultantNameInput',
    'consultantPhoneInput',
  ]
  for (const id of ids) {
    $(id).addEventListener('input', () => saveFormState(getCurrentState()))
    $(id).addEventListener('change', () => saveFormState(getCurrentState()))
  }
}

function main() {
  renderTemplatesSelect()

  const isAuthed = localStorage.getItem(STORAGE_KEYS.authed) === 'true'
  setHidden($('loginCard'), isAuthed)
  setHidden($('appGrid'), !isAuthed)
  setHidden($('logoutBtn'), !isAuthed)

  let photoDataUrl = ''
  let lastResultDataUrl = ''
  let busy = false
  let brandLogoDataUrl = readBrandLogo()

  const saved = readFormState()
  applyStateToForm(saved)
  updateAreaLabelAndPlaceholder()
  updateCanvasFromState(getCurrentState(), photoDataUrl)
  bindAutosave()

  $('assetTypeSelect').addEventListener('change', () => {
    updateAreaLabelAndPlaceholder()
    updateCanvasFromState(getCurrentState(), photoDataUrl)
  })

  $('modeSelect').addEventListener('change', () => updateCanvasFromState(getCurrentState(), photoDataUrl))
  $('templateSelect').addEventListener('change', () => updateCanvasFromState(getCurrentState(), photoDataUrl))
  $('dealTypeSelect').addEventListener('change', () => updateCanvasFromState(getCurrentState(), photoDataUrl))
  $('titleInput').addEventListener('input', () => updateCanvasFromState(getCurrentState(), photoDataUrl))
  $('descInput').addEventListener('input', () => updateCanvasFromState(getCurrentState(), photoDataUrl))
  $('priceInput').addEventListener('input', () => updateCanvasFromState(getCurrentState(), photoDataUrl))
  $('areaInput').addEventListener('input', () => updateCanvasFromState(getCurrentState(), photoDataUrl))
  $('consultantNameInput').addEventListener('input', () => updateCanvasFromState(getCurrentState(), photoDataUrl))
  $('consultantPhoneInput').addEventListener('input', () => updateCanvasFromState(getCurrentState(), photoDataUrl))

  $('photoInput').addEventListener('change', async (e) => {
    try {
      setError($('appError'), '')
      const file = e.target.files && e.target.files[0]
      if (!file) return
      photoDataUrl = await fileToDataUrl(file)

      const thumbs = $('photoThumbs')
      thumbs.innerHTML = ''
      const t = document.createElement('div')
      t.className = 'thumb'
      const img = document.createElement('img')
      img.src = photoDataUrl
      img.alt = ''
      t.appendChild(img)
      thumbs.appendChild(t)
      setHidden($('photoEmpty'), true)

      updateCanvasFromState(getCurrentState(), photoDataUrl)
    } catch (err) {
      setError($('appError'), String(err?.message || err))
    }
  })

  $('brandLogoInput').addEventListener('change', async (e) => {
    try {
      setError($('appError'), '')
      const file = e.target.files && e.target.files[0]
      if (!file) return
      brandLogoDataUrl = await fileToDataUrl(file)
      saveBrandLogo(brandLogoDataUrl)
      updateCanvasFromState(getCurrentState(), photoDataUrl)
    } catch (err) {
      setError($('appError'), String(err?.message || err))
    }
  })

  $('loginForm').addEventListener('submit', (e) => {
    e.preventDefault()
    const pw = String($('passwordInput').value || '')
    if (pw === 'dialogfanus' || pw === 'fanus2024' || pw === 'admin') {
      localStorage.setItem(STORAGE_KEYS.authed, 'true')
      $('passwordInput').value = ''
      setError($('loginError'), '')
      setHidden($('loginCard'), true)
      setHidden($('appGrid'), false)
      setHidden($('logoutBtn'), false)
      return
    }
    setError($('loginError'), 'Şifre yanlış.')
  })

  $('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEYS.authed)
    setHidden($('loginCard'), false)
    setHidden($('appGrid'), true)
    setHidden($('logoutBtn'), true)
    // do not clear form state; user asked localStorage DB usage
  })

  $('generateBtn').addEventListener('click', async () => {
    if (busy) return
    setError($('appError'), '')

    const state = getCurrentState()
    const validationError = validateState(state)
    if (validationError) {
      setError($('appError'), validationError)
      return
    }

    busy = true
    $('generateBtn').disabled = true

    setHidden($('progressModal'), false)
    $('progressBar').style.width = '0%'
    $('progressText').textContent = 'Tasarım detayları işleniyor… %0'

    try {
      // Ensure canvas is fully up-to-date before rendering
      updateCanvasFromState(state, photoDataUrl)

      await runProgress15s(
        async () => {
          const node = $('htmlCanvas')
          if (!node) throw new Error('Tasarım alanı hazır değil.')

          const px = state.mode === 'story' ? 1080 : 1080
          const py = state.mode === 'story' ? 1920 : 1080

          const dataUrl = await htmlToImage.toPng(node, {
            cacheBust: true,
            width: px,
            height: py,
            pixelRatio: 1.6,
            backgroundColor: '#0b0d12',
          })

          lastResultDataUrl = dataUrl
          $('resultImg').src = dataUrl
          setHidden($('resultEmpty'), true)
          setHidden($('resultWrap'), false)

          $('progressBar').style.width = '100%'
          $('progressText').textContent = 'Tamamlandı • %100'
        },
        (p) => {
          $('progressBar').style.width = `${p}%`
          $('progressText').textContent = `Tasarım detayları işleniyor… %${p}`
        }
      )
    } catch (err) {
      setError(
        $('appError'),
        String(err?.message || err) +
          '\nNot: Eğer indirirken boş/bozuk çıktı alırsanız, sayfayı bir hosting üzerinden açın (file:// olmaz). Logolar zaten yerel dosyadan yüklenir.'
      )
    } finally {
      setTimeout(() => {
        setHidden($('progressModal'), true)
        $('progressBar').style.width = '0%'
        $('progressText').textContent = 'Tasarım detayları işleniyor… %0'
      }, 500)

      busy = false
      $('generateBtn').disabled = false
    }
  })

  $('downloadBtn').addEventListener('click', () => {
    if (!lastResultDataUrl) return
    downloadDataUrlPng(lastResultDataUrl)
  })
}

document.addEventListener('DOMContentLoaded', main)

