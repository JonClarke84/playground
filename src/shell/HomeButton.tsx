interface HomeButtonProps {
  onExit: () => void
}

/** Consistent top-left exit affordance shown inside every game (PRODUCT.md §3.2). */
export function HomeButton({ onExit }: HomeButtonProps) {
  return (
    <button className="home-button" onClick={onExit} aria-label="Back to the playground">
      <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
        <path
          d="M12 3.2 3.6 10.4a1 1 0 0 0-.35.76V20a1 1 0 0 0 1 1h5.15a.6.6 0 0 0 .6-.6v-4.15a2 2 0 0 1 4 0V20.4a.6.6 0 0 0 .6.6h5.15a1 1 0 0 0 1-1v-8.84a1 1 0 0 0-.35-.76L12 3.2Z"
          fill="currentColor"
        />
      </svg>
    </button>
  )
}
