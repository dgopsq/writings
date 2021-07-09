import Typography from 'typography'

export const colors = {
  primary: '#0d7e83',
  lightPrimary: '#a7e4e621',
  mainText: '#fff',
  lightGrey: '#f2f2f2',
  silver: '#bbb',
  black: '#444',
}

export const typography = new Typography({
  baseFontSize: '20px',
  baseLineHeight: 1.8,
  headerFontFamily: ['Open Sans', 'sans-serif'],
  bodyFontFamily: ['Georgia', 'serif'],
  includeNormalize: true,
  headerColor: colors.primary,
  bodyColor: colors.black,
})

export function getHeaderFontFamily() {
  return typography.options.headerFontFamily.join(', ')
}
