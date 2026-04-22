/**
 * HomeIndicator — L3 IM molecule
 * iOS Home 条，Chat/Messages 共享。
 */
export default function HomeIndicator({ className = '' }) {
  return (
    <div className={`cht-home-indicator ${className}`.trim()} aria-hidden="true">
      <div className="cht-home-indicator__pill" />
    </div>
  )
}
