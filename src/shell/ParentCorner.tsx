import { useMemo, useState } from 'react'
import { exportAll, importAll } from '../lib/storage'
import { useSpellDuelStore } from '../games/spell-duel/state/store'
import { parseFactKey } from '../games/spell-duel/logic/facts'
import { masteryScore } from '../games/spell-duel/logic/mastery'

/**
 * Parents' corner (PRODUCT.md §3.3) — progress summary, data export/import,
 * reset. Deliberately plain: this screen is for grown-ups.
 * v1 reads the Spell Duel store directly; a future games API can generalise.
 */

interface TableSummary {
  table: number
  attempts: number
  mastery: number
  hintShare: number
}

export function ParentCorner({ onClose }: { onClose: () => void }) {
  const stats = useSpellDuelStore((s) => s.stats)
  const duelsCompleted = useSpellDuelStore((s) => s.duelsCompleted)
  const hintsSeen = useSpellDuelStore((s) => s.hintsSeen)
  const sparkleDust = useSpellDuelStore((s) => s.sparkleDust)
  const [importText, setImportText] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [confirmingReset, setConfirmingReset] = useState(false)

  const summaries = useMemo<TableSummary[]>(() => {
    const byTable = new Map<number, { attempts: number; masterySum: number; facts: number; hints: number }>()
    for (const [key, stat] of Object.entries(stats)) {
      const fact = parseFactKey(key)
      for (const table of new Set([fact.a, fact.b])) {
        const entry = byTable.get(table) ?? { attempts: 0, masterySum: 0, facts: 0, hints: 0 }
        entry.attempts += stat.attempts
        entry.masterySum += masteryScore(stat)
        entry.facts += 1
        entry.hints += stat.hintUses
        byTable.set(table, entry)
      }
    }
    return [...byTable.entries()]
      .map(([table, e]) => ({
        table,
        attempts: e.attempts,
        mastery: e.facts === 0 ? 0 : e.masterySum / e.facts,
        hintShare: e.attempts === 0 ? 0 : e.hints / e.attempts,
      }))
      .sort((x, y) => x.table - y.table)
  }, [stats])

  const handleExport = async () => {
    const data = exportAll()
    try {
      await navigator.clipboard.writeText(data)
      setMessage('Progress copied to clipboard — paste it somewhere safe.')
    } catch {
      setMessage(data)
    }
  }

  const handleImport = () => {
    const result = importAll(importText.trim())
    if (result.ok) {
      window.location.reload()
    } else {
      setMessage(result.error)
    }
  }

  const handleReset = () => {
    if (!confirmingReset) {
      setConfirmingReset(true)
      return
    }
    const keys: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith('playground:')) keys.push(key)
    }
    keys.forEach((key) => localStorage.removeItem(key))
    window.location.reload()
  }

  return (
    <div className="parent-corner">
      <div className="parent-corner-panel">
        <header className="parent-corner-header">
          <h2>Parents’ corner</h2>
          <button className="parent-corner-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>

        <p className="parent-corner-stats">
          Duels played: <strong>{duelsCompleted}</strong> · Hints used: <strong>{hintsSeen}</strong> ·
          Sparkle dust: <strong>{sparkleDust}</strong>
        </p>

        <h3>Times tables progress</h3>
        {summaries.length === 0 ? (
          <p className="parent-corner-empty">No duels played yet.</p>
        ) : (
          <table className="parent-corner-table">
            <thead>
              <tr>
                <th>Table</th>
                <th>Questions</th>
                <th>Mastery</th>
                <th>Hint use</th>
              </tr>
            </thead>
            <tbody>
              {summaries.map((s) => (
                <tr key={s.table}>
                  <td>{s.table}s</td>
                  <td>{s.attempts}</td>
                  <td>
                    <div className="mastery-bar">
                      <div className="mastery-bar-fill" style={{ width: `${Math.round(s.mastery * 100)}%` }} />
                    </div>
                    {Math.round(s.mastery * 100)}%
                  </td>
                  <td>{Math.round(s.hintShare * 100)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <h3>Backup</h3>
        <div className="parent-corner-actions">
          <button className="parent-corner-button" onClick={handleExport}>
            Export progress
          </button>
          <button
            className="parent-corner-button parent-corner-button--danger"
            onClick={handleReset}
          >
            {confirmingReset ? 'Tap again to erase everything' : 'Reset all progress'}
          </button>
        </div>
        <div className="parent-corner-import">
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder="Paste an exported backup here…"
            rows={2}
          />
          <button className="parent-corner-button" onClick={handleImport} disabled={!importText.trim()}>
            Import
          </button>
        </div>

        {message && <p className="parent-corner-message">{message}</p>}
      </div>
    </div>
  )
}
