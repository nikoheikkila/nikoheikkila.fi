export const colorPalette = [
  '#886a00',
  '#774900',
  '#004c41',
  '#102330',
  '#061d2c',
  '#192025',
  '#101a21',
  '#4d0050',
  '#004949',
]

export const randomColor = () => {
  const randomIndex = Math.floor(Math.random() * colorPalette.length)

  return colorPalette[randomIndex]
}
