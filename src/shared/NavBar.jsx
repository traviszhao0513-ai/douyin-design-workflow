export default function NavBar({ title, subtitle }) {
  return (
    <header className="nav-bar">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  )
}
