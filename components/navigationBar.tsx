import Link from 'next/link'

function NavigationBar() {
  return (
    <nav className="m-auto flex h-12 w-fit flex-row items-center bg-slate-700 text-center text-lg text-white">
      <div className="w-64">
        <Link href="/">Home</Link>
      </div>
      <div className="w-64">
        <Link href="/vertical-list">Vertical list</Link>
      </div>
      <div className="w-64">
        <Link href="/multiple-vertical-lists">Multiple vertical lists</Link>
      </div>
      <div className="w-64">
        <Link href="/kanban-board">Kanban board</Link>
      </div>
    </nav>
  )
}

export default NavigationBar
