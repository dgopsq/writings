import { Font, StyleSheet } from '@react-pdf/renderer'

Font.register({
  family: 'Lato',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHvxk6XweuBCY.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh6UVew-FGC_p9dw.ttf',
      fontWeight: 700,
    },
    {
      src: 'https://fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh50Xew-FGC_p9dw.ttf',
      fontWeight: 900,
    },
  ],
})

export const palette = {
  primary: '#2DB1A2',
  lightGray: '#F3F3F3',
  gray: '#B0B0B0',
  black: '#282828',
  white: '#FFFFFF',
}

// Create styles
export const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
  },
  section: {
    paddingVertical: '25px',
  },
  horizontalDivisor: {
    backgroundColor: palette.lightGray,
    width: '100%',
    height: '1px',
  },
  verticalDivisor: {
    backgroundColor: palette.lightGray,
    width: '1px',
    height: '100%',
  },
  layout: {
    width: '100%',
    paddingLeft: '40px',
    paddingRight: '40px',
  },
  textBody: {
    fontFamily: 'Lato',
    fontWeight: 400,
    color: palette.black,
    fontSize: '10px',
    lineHeight: 1.5,
  },
  textCategoryTitle: {
    fontFamily: 'Lato',
    fontWeight: 900,
    color: palette.primary,
    fontSize: '18px',
  },
  textSkillTitle: {
    fontFamily: 'Lato',
    fontWeight: 700,
    color: palette.primary,
    fontSize: '10px',
    textTransform: 'uppercase',
  },
  textDate: {
    fontFamily: 'Lato',
    fontWeight: 400,
    color: palette.gray,
    fontSize: '9px',
    lineHeight: 1.5,
  },
  textStrong: {
    fontFamily: 'Lato',
    fontWeight: 700,
  },
  textLink: {
    fontFamily: 'Lato',
    fontWeight: 400,
    color: palette.primary,
    fontSize: '10px',
    textDecoration: 'underline',
    lineHeight: 1.5,
  },
  mainTitle: {
    fontSize: '18px',
    fontWeight: 900,
    fontFamily: 'Lato',
    textTransform: 'uppercase',
    color: palette.primary,
  },
  subTitle: {
    fontSize: '12px',
    fontWeight: 400,
    fontFamily: 'Lato',
    color: palette.gray,
  },
  experienceTitle: {
    fontSize: '10px',
    fontWeight: 700,
    fontFamily: 'Lato',
    color: palette.primary,
  },
  experiencePosition: {
    fontSize: '10px',
    fontWeight: 400,
    fontFamily: 'Lato',
    color: palette.primary,
  },
  experienceTimeline: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '150px',
    marginRight: '10px',
  },
  experienceTrack: {
    borderLeft: `1px solid ${palette.primary}`,
  },
  experienceDot: {
    height: '9px',
    width: '9px',
    backgroundColor: palette.white,
    border: `1px solid ${palette.primary}`,
    borderRadius: '100%',
    flexBasis: 'auto',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
})
