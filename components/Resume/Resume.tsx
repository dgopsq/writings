import React from 'react'
import { Page, Text, View, Document, Image } from '@react-pdf/renderer'
import { styles } from './styles'
import { Timeline } from './Timeline'
import { Education } from './Education'
import { Skills } from './Skills'
import { BASE_URL } from '../../utils/configs'
import { LinkIcon, MailIcon, PhoneIcon, PinIcon } from './Icon'
import { MetaInfo } from './MetaInfo'

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
            <View
              style={{
                flex: '1 1 100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View>
                <Image
                  source={`${BASE_URL}/me.jpg`}
                  style={{
                    height: '80px',
                    width: '80px',
                    borderRadius: '100%',
                  }}
                />
              </View>

              <View style={{ paddingLeft: '20px' }}>
                <Text style={styles.mainTitle}>Diego Pasquali</Text>
                <Text style={[styles.subTitle, { marginTop: '5px' }]}>
                  Software Engineer and tech enthusiast
                </Text>
              </View>
            </View>

            <View style={{ flex: '0 0 auto', paddingRight: '50px' }}>
              <MetaInfo
                data={[
                  { Icon: PinIcon, text: 'Italy' },
                  { Icon: LinkIcon, text: 'https://dgopsq.space' },
                  { Icon: MailIcon, text: 'hello@dgopsq.space' },
                  { Icon: PhoneIcon, text: '+39 328 4414 223' },
                ]}
              />
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
            <Skills
              data={[
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
              ]}
            />
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

            <Education
              data={[
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
              ]}
            />
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
                timeframe: 'Sep 2022 - Present',
                company: 'Heritage Holdings',
                position: 'Senior Software Engineer',
                description:
                  'Heritage is a family backed investment platform partnering with carefully selected alternative asset managers with a long-term mindset. Here I worked on the React and GraphQL-based web application, as well as the NodeJS backend, while also contributing to the mobile app and other internal tools.',
              },
              {
                timeframe: 'Jan 2022 - Sep 2022',
                company: 'PagoPA S.P.A',
                position: 'Mobile Software Engineer',
                description:
                  'I contributed to the development of IO, an open-source mobile application built with React Native for the Italian Government. The app has been downloaded more than 20 million times and boasts a monthly active user base of 6 million. During my time on the project, I played an active role in enhancing the developer experience across the entire codebase. In addition, I had the opportunity to develop multiple features that are currently in production.',
              },
              {
                timeframe: 'Sep 2018 - Dec 2021',
                company: 'Efficiam',
                position: 'Software Engineer',
                description:
                  'At Efficiam, I took on a leadership role in creating the frontend architecture for a multitude of fintech applications spanning both web and mobile platforms. Utilizing React and React Native technologies, I tackled a broad range of complex issues, including real-time data visualization, authentication, and security. I was also fortunate enough to expand my skills by contributing to backend development using functional programming with Scala.',
              },
              {
                timeframe: 'Apr 2015 - Aug 2018',
                company: 'Freelance',
                position: 'Front-end developer and designer',
                description:
                  'I freelanced as a front-end developer and designer, creating customized Bootstrap themes and React applications for various clients. My main goal was always to deliver high-quality products with a focus on both aesthetics and functionality.',
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.horizontalDivisor} />

      <View style={styles.section}>
        <View style={styles.layout}>
          <Text style={styles.textCategoryTitle}>Side projects</Text>

          <Timeline
            data={[
              {
                timeframe: 'Mar 2019 - Apr 2021',
                company: 'Towers of Minduir',
                position: 'Co-founder and game developer',
                description:
                  'A 1vs1 multiplayer mobile game inspired by Clash Royale, DOTA and Gwent. I co-founded and worked on it part-time with a team of 8 skilled people. ToM has been built on Unity using a custom deterministic engine. The real-time backend server uses Scala with Http4s and Quill.',
              },
            ]}
          />
        </View>
      </View>
    </Page>
  </Document>
)
