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
                    'HTML5, CSS3, SASS, PostCSS, JavaScript, TypeScript, PureScript, React, React Native, Next.js',
                  maxWidth: '175px',
                },
                {
                  title: 'Back-end',
                  content: 'Node.js, Scala (FP), Rust, PHP, C#, Unity',
                  maxWidth: '140px',
                },
                {
                  title: 'Tools',
                  content:
                    'Git, Docker, Kubernetes, GitHub Actions, Supabase, AWS, Vercel',
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
                Dedicated Senior Software Engineer with extensive expertise in
                React, GraphQL, and NodeJS. Proven track record of leading
                frontend development, contributing to high-profile projects, and
                consistently delivering exceptional results.
              </Text>

              <Text
                style={[
                  styles.textBody,
                  { marginTop: '15px', maxWidth: '275px' },
                ]}
                hyphenationCallback={(word) => [word]}
              >
                I am enthusiastic about continuous learning, passionate about
                gaming, and expressing creativity through playing the guitar.
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
          <Text style={styles.textCategoryTitle}>Experience</Text>

          <Timeline
            data={[
              {
                timeframe: 'Sep 2022 - Present',
                company: 'Heritage Holdings',
                position: 'Senior Software Engineer',
                description:
                  'Heritage is a family backed investment platform partnering with carefully selected alternative asset managers with a long-term mindset. Here I contributed to the web application built with React and GraphQL, and on the backend using NodeJS. I also had the opportunity to improve the mobile application, as well as other in-house tools used by the company.',
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
                  'At Efficiam, I took on a leadership role in creating the frontend architecture for various fintech applications, both on web and mobile. Using React and React Native, I tackled a broad range of complex issues, including real-time data visualization, authentication, and security. I was also fortunate enough to expand my skills by contributing to the backend using Scala in Functional Programming.',
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
                timeframe: 'Oct 2022 - Present',
                company: 'BCKT',
                position: 'Founder',
                description:
                  'I developed a budgeting application that utilizes an opinionated system to track expenses and incomes in a unique "email-like" interface. The app syncs with the users\' bank accounts, allowing for seamless transaction tracking and management.',
                link: 'https://www.bckt.app',
              },
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
