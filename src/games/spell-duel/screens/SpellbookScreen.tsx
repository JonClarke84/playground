import { HomeButton } from '../../../shell/HomeButton'
import { useSpellDuelStore } from '../state/store'
import { factsForTables, product } from '../logic/facts'
import { factKey } from '../logic/facts'
import { isMastered } from '../logic/mastery'
import { chooseSplit } from '../logic/hintSplits'
import type { Fact, Split } from '../logic/types'

/**
 * The spellbook (PRODUCT.md §4.7): every mastered fact becomes a collected
 * spell card showing its crack pattern. Unmastered facts stay as mysteries.
 */

const ALL_TABLES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

function splitLabel(split: Split): string {
  if (split.kind === 'add')
    return `${split.left.a}×${split.left.b} + ${split.right.a}×${split.right.b}`
  if (split.kind === 'sub')
    return `${split.left.a}×${split.left.b} − ${split.right.a}×${split.right.b}`
  return `${split.half.a}×${split.half.b} doubled`
}

function SpellCard({ fact, mastered }: { fact: Fact; mastered: boolean }) {
  if (!mastered) {
    return (
      <div className="spell-card spell-card--mystery">
        <span className="spell-card-mystery-mark">?</span>
      </div>
    )
  }
  return (
    <div className="spell-card">
      <svg viewBox="0 0 60 52" className="spell-card-gem" aria-hidden="true">
        <polygon points="30,2 56,15 51,43 30,50 9,43 4,15" fill="#17b273" />
        <polygon points="30,2 56,15 30,18" fill="#7dedbb" />
        <polygon points="30,2 4,15 30,18" fill="#26c580" />
      </svg>
      <span className="spell-card-fact">
        {fact.a} × {fact.b}
      </span>
      <span className="spell-card-answer">{product(fact)}</span>
      <span className="spell-card-split">{splitLabel(chooseSplit(fact.a, fact.b))}</span>
    </div>
  )
}

export function SpellbookScreen({ onExit }: { onExit: () => void }) {
  const stats = useSpellDuelStore((s) => s.stats)
  const facts = factsForTables(ALL_TABLES)
  const masteredCount = facts.filter((f) => isMastered(stats[factKey(f.a, f.b)])).length

  return (
    <div className="spellbook">
      <HomeButton onExit={onExit} />
      <header className="spellbook-header">
        <h2>Spellbook</h2>
        <p className="spellbook-progress">
          ✦ {masteredCount} of {facts.length} spells collected
        </p>
      </header>
      <div className="spellbook-grid">
        {facts.map((fact) => (
          <SpellCard
            key={factKey(fact.a, fact.b)}
            fact={fact}
            mastered={isMastered(stats[factKey(fact.a, fact.b)])}
          />
        ))}
      </div>
    </div>
  )
}
