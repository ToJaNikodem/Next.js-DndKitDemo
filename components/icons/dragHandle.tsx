function DragHandleIcon({ color, scale }: { color: string; scale?: string }) {
  return (
    <div
      className={
        'flex flex-row flex-wrap gap-1 w-5 h-7 justify-between mr-4 p-1 ' +
        scale
      }
    >
      <div className={'h-1 w-1 rounded-full ' + color}></div>
      <div className={'h-1 w-1 rounded-full ' + color}></div>
      <div className={'h-1 w-1 rounded-full ' + color}></div>
      <div className={'h-1 w-1 rounded-full ' + color}></div>
      <div className={'h-1 w-1 rounded-full ' + color}></div>
      <div className={'h-1 w-1 rounded-full ' + color}></div>
    </div>
  )
}

export default DragHandleIcon
