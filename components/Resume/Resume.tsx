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
  white: '#FFFFFF',
}

// Create styles
const styles = StyleSheet.create({
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
    width: '1px',
    backgroundColor: palette.primary,
    marginHorizontal: 'auto',
    flexBasis: '100%',
  },
  experienceDot: {
    height: '10px',
    width: '10px',
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

// Create Document Component
export const Resume = () => (
  <Document>
    <Page size='A4' style={styles.page} wrap>
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

      <View style={styles.horizontalDivisor} />

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

      <View style={styles.horizontalDivisor} />

      <View style={styles.row}>
        <View style={[styles.section]}>
          <View style={styles.layout}>
            <Text style={styles.textCategoryTitle}>Bio</Text>

            <View>
              <Text
                style={[
                  styles.textBody,
                  { marginTop: '15px', maxWidth: '275px' },
                ]}
                hyphenationCallback={(word) => [word]}
              >
                I’m really passionate about everything related to technology and
                design. I spend a lot of my free time learning and exploring the
                latest trends in the programming world.
              </Text>

              <Text
                style={[
                  styles.textBody,
                  { marginTop: '15px', maxWidth: '275px' },
                ]}
                hyphenationCallback={(word) => [word]}
              >
                I’m a books eater, always trying to discover some new exciting
                fantasy universe. I also love to play videogames and sometimes
                the acoustic guitar.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.verticalDivisor} />

        <View style={[styles.section]}>
          <View style={styles.layout}>
            <Text style={styles.textCategoryTitle}>Education</Text>

            {[
              {
                institute: 'University of Camerino',
                timeframe: 'Oct 2014 - Oct 2017',
                degree: 'Bachelor Degree in Computer Science',
              },
              {
                institute: 'I.T.C.G Filippo Corridoni',
                timeframe: 'Pre-university',
                degree: 'Commercial technical institute',
              },
            ].map(({ institute, timeframe, degree }) => (
              <View>
                <Text
                  style={[styles.textDate, { marginTop: '15px' }]}
                  hyphenationCallback={(word) => [word]}
                >
                  {timeframe}
                </Text>

                <Text
                  style={[
                    styles.textBody,
                    styles.textStrong,
                    { marginTop: '2px' },
                  ]}
                  hyphenationCallback={(word) => [word]}
                >
                  {institute}
                </Text>

                <Text
                  style={[styles.textBody, { marginTop: '2px' }]}
                  hyphenationCallback={(word) => [word]}
                >
                  {degree}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.horizontalDivisor} />

      <View style={styles.section}>
        <View style={styles.layout}>
          <Text style={styles.textCategoryTitle}>Experiences</Text>
          {[
            {
              timeframe: 'Jan 2022 - Present',
              company: 'PAGOPA S.P.A',
              position: 'Mobile Software Engineer',
              description:
                'In PagoPA I worked on IO, an open-source mobile application written in React Native with more than 20 million downloads and 6 million monthly active users.',
            },
          ].map(({ timeframe, company, position, description }) => (
            <View style={[styles.row, { marginTop: '15px' }]} break>
              <View style={styles.experienceTimeline}>
                <View style={styles.experienceDot} />
                <View style={styles.experienceTrack} />
              </View>

              <View>
                <Text
                  style={[styles.textDate]}
                  hyphenationCallback={(word) => [word]}
                >
                  {timeframe}
                </Text>

                <Text
                  style={[styles.experienceTitle, { marginTop: '3px' }]}
                  hyphenationCallback={(word) => [word]}
                >
                  {company}
                </Text>

                <Text
                  style={[styles.experiencePosition, { marginTop: '5px' }]}
                  hyphenationCallback={(word) => [word]}
                >
                  {position}
                </Text>

                <Text
                  style={[
                    styles.textBody,
                    { marginTop: '10px', maxWidth: '275px' },
                  ]}
                  hyphenationCallback={(word) => [word]}
                >
                  {description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
)
