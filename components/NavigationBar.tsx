import Link from 'next/link'

function NavigationBar() {
  return (
    <nav className="flex flex-row h-12 bg-slate-700 text-white text-lg text-center items-center m-auto w-fit">
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
