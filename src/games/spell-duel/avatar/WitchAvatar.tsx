import type { AvatarConfig, Expression, SkinTone } from './avatarTypes'
import { hairColour, outfitColour, skinTone } from './avatarTypes'
import { HAIR_REGISTRY } from './hair'
import { HAT_REGISTRY } from './hats'
import { OUTFIT_REGISTRY } from './outfits'
import { ACCESSORY_REGISTRY } from './accessories'

interface WitchAvatarProps {
  config: AvatarConfig
  expression?: Expression
  className?: string
}

function Face({ skin, expression }: { skin: SkinTone; expression: Expression }) {
  const eyeColour = '#3b2a4f'
  return (
    <g>
      {/* Brows */}
      <path d="M 89 99 Q 98 94 107 98" stroke={eyeColour} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path
        d={expression === 'thinking' ? 'M 133 95 Q 142 91 151 97' : 'M 133 98 Q 142 94 151 99'}
        stroke={eyeColour}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Eyes */}
      <ellipse cx="98" cy="116" rx="6.5" ry="9" fill={eyeColour} />
      <ellipse cx="142" cy="116" rx="6.5" ry="9" fill={eyeColour} />
      <circle cx="95.8" cy="112" r="2.4" fill="#fff" />
      <circle cx="139.8" cy="112" r="2.4" fill="#fff" />
      {/* Lashes */}
      <path d="M 91 109 Q 88 107 86 108" stroke={eyeColour} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M 149 109 Q 152 107 154 108" stroke={eyeColour} strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Cheeks */}
      <ellipse cx="84" cy="134" rx="8" ry="5.5" fill={skin.cheek} opacity="0.5" />
      <ellipse cx="156" cy="134" rx="8" ry="5.5" fill={skin.cheek} opacity="0.5" />
      {/* Nose */}
      <path d="M 116 128 Q 120 131 124 128" stroke={skin.shade} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Mouth */}
      {expression === 'smile' && (
        <path d="M 110 140 Q 120 150 130 140" stroke="#4a2b3f" strokeWidth="4" strokeLinecap="round" fill="none" />
      )}
      {expression === 'grin' && (
        <g>
          <path d="M 106 139 Q 120 158 134 139 Z" fill="#4a2b3f" />
          <path d="M 112 141 Q 120 147 128 141 Q 120 144 112 141 Z" fill="#fff" />
        </g>
      )}
      {expression === 'wow' && <ellipse cx="120" cy="145" rx="7" ry="9" fill="#4a2b3f" />}
      {expression === 'thinking' && (
        <path d="M 112 145 Q 121 141 130 143" stroke="#4a2b3f" strokeWidth="4" strokeLinecap="round" fill="none" />
      )}
    </g>
  )
}

/**
 * The layered paper-doll witch (PRODUCT.md §4.2).
 * Layer order: back accessory → back hair → boots → outfit → head → face →
 * front hair → hat → front accessory.
 */
export function WitchAvatar({ config, expression = 'smile', className }: WitchAvatarProps) {
  const skin = skinTone(config.skin)
  const hair = hairColour(config.hairColour)
  const outfit = outfitColour(config.outfitColour)
  const hairLayers = HAIR_REGISTRY[config.hairStyle]
  const Outfit = OUTFIT_REGISTRY[config.outfit]
  const Hat = HAT_REGISTRY[config.hat]
  const Accessory = ACCESSORY_REGISTRY[config.accessory]

  return (
    <svg className={className} viewBox="0 0 240 320" role="img" aria-label="Your witch">
      {/* Back hair */}
      {hairLayers.Back && <hairLayers.Back colour={hair} />}

      {/* Boots */}
      <g fill="#2f2247">
        <path d="M 97 280 h 20 v 16 a 6 6 0 0 1 -6 6 h -14 a 4 4 0 0 1 -4 -4 v -12 a 6 6 0 0 1 4 -6 Z" />
        <path d="M 123 280 h 20 a 6 6 0 0 1 4 6 v 12 a 4 4 0 0 1 -4 4 h -14 a 6 6 0 0 1 -6 -6 Z" />
      </g>

      {/* Outfit (dress, sleeves, hands) */}
      <Outfit colour={outfit} skin={skin} />

      {/* Neck + head */}
      <rect x="111" y="150" width="18" height="18" rx="6" fill={skin.shade} />
      <ellipse cx="120" cy="114" rx="53" ry="50" fill={skin.base} />

      <Face skin={skin} expression={expression} />

      {/* Front hair */}
      {hairLayers.Front && <hairLayers.Front colour={hair} />}

      {/* Hat */}
      {Hat && <Hat />}

      {/* Front accessory */}
      {Accessory && <Accessory />}
    </svg>
  )
}
