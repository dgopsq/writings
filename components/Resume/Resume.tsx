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
import { styles } from './styles'
import { Timeline } from './Timeline'

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

          <Timeline
            data={[
              {
                timeframe: 'Jan 2022 - Present',
                company: 'PAGOPA S.P.A',
                position: 'Mobile Software Engineer',
                description:
                  'In PagoPA I worked on IO, an open-source mobile application written in React Native with more than 20 million downloads and 6 million monthly active users.',
              },
              {
                timeframe: 'Sep 2018 - Dec 2021',
                company: 'EFFICIAM',
                position: 'Software Engineer',
                description:
                  'In Efficiam I created the Frontend Architecture of various fintech applications both on web and mobile, mostly using React and React Native. I dealt with a various range of problems: from Real Time Data Visualization to Authentication and Security. I had the opportunity to work on the Backend too using Scala in Functional Programming.',
              },
              {
                timeframe: 'Apr 2015 - Aug 2018',
                company: 'FREELANCE',
                position: 'Front-end developer and designer',
                description:
                  'I worked as a freelance front-end developer and designer, usually creating custom Bootstrap themes and React applications for different customers.',
              },
            ]}
          />
        </View>
      </View>
    </Page>
  </Document>
)
