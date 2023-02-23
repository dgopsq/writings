import React from 'react'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from '@react-pdf/renderer'

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
      src: 'http://fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh50Xew-FGC_p9dw.ttf',
      fontWeight: 900,
    },
  ],
})

const palette = {
  primary: '#2DB1A2',
  lightGray: '#F3F3F3',
  gray: '#B0B0B0',
  black: '#282828',
}

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
  },
  section: {
    paddingVertical: '25px',
    borderBottom: `1px solid ${palette.lightGray}`,
  },
  layout: {
    width: '515px',
    marginLeft: 'auto',
    marginRight: 'auto',
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
})

// Create Document Component
export const Resume = () => (
  <Document>
    <Page size='A4' style={styles.page}>
      <View style={styles.section}>
        <View style={styles.layout}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View>
              <Image
                source='/me.jpg'
                style={{ height: '80px', width: '80px', borderRadius: '100%' }}
              />
            </View>

            <View style={{ paddingLeft: '20px' }}>
              <Text style={styles.mainTitle}>Diego Pasquali</Text>
              <Text style={[styles.subTitle, { marginTop: '5px' }]}>
                Software Engineer and tech enthusiast
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.layout}>
          <Text style={styles.textCategoryTitle}>Skills</Text>

          <View
            style={{ marginTop: '15px', display: 'flex', flexDirection: 'row' }}
          >
            {[
              {
                title: 'Front-end',
                content:
                  'HTML5, CSS3, SASS, PostCSS, JavaScript, TypeScript, PureScript, React, React Native',
                maxWidth: '175px',
              },
              {
                title: 'Back-end',
                content: 'Scala (FP), Node.js, Rust, PHP, C#, Unity',
                maxWidth: '140px',
              },
              {
                title: 'Tools',
                content: 'Git, Docker, Kubernetes, GitHub Actions, Notion',
                maxWidth: '120px',
              },
            ].map(({ title, content, maxWidth }, index) => (
              <View style={{ marginLeft: index > 0 ? '30px' : undefined }}>
                <Text style={styles.textSkillTitle}>{title}</Text>

                <Text
                  style={[styles.textBody, { marginTop: '5px', maxWidth }]}
                  hyphenationCallback={(word) => [word]}
                >
                  {content}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Page>
  </Document>
)
