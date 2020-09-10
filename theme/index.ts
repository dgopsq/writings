import Typography from 'typography'

export const colors = {
  primary: '#0d7e83',
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
  googleFonts: [
    {
      name: 'Open Sans',
      styles: ['400', '700'],
    },
    {
      name: 'Abril Fatface',
      styles: ['400'],
    },
    {
      name: 'Source Code Pro',
      styles: ['400'],
    },
  ],
})

export function getHeaderFontFamily() {
  return typography.options.headerFontFamily.join(', ')
}
