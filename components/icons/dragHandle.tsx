function DragHandleIcon({
  color,
  scale,
}: {
  color: string
  scale?: string
}): JSX.Element {
  return (
    <div
      className={
        scale
          ? 'mr-4 flex h-7 w-5 flex-row flex-wrap justify-between gap-1 p-1 ' +
            scale
          : 'mr-4 flex h-7 w-5 flex-row flex-wrap justify-between gap-1 p-1 '
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
