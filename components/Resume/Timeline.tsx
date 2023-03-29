import { Path, Svg, Text, View } from '@react-pdf/renderer'
import { styles } from './styles'

type TimelineItem = {
  timeframe: string
  company: string
  position: string
  description: string
  link?: string
}

type Props = {
  data: Array<TimelineItem>
}

export const Timeline: React.FC<Props> = ({ data }) => {
  return (
    <View style={{ marginTop: '15px', marginLeft: '5px' }}>
      {data.map(({ timeframe, company, position, description, link }) => (
        <View style={[styles.experienceTrack, { paddingLeft: '20px' }]}>
          <View wrap={false} style={{ paddingTop: '20px' }}>
            <View style={{ position: 'relative' }}>
              <View
                style={[
                  styles.experienceDot,
                  {
                    position: 'absolute',
                    left: '-25px',
                    top: '2px',
                  },
                ]}
              ></View>

              <Text
                style={styles.textDate}
                hyphenationCallback={(word) => [word]}
              >
                {timeframe}
              </Text>
            </View>

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
          </View>

          <Text
            style={[styles.textBody, { marginTop: '10px', maxWidth: '320px' }]}
            hyphenationCallback={(word) => [word]}
          >
            {description}
          </Text>

          {link ? (
            <View
              style={{
                marginTop: '10px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Svg
                width='9'
                height='8'
                viewBox='0 0 9 8'
                style={{ marginTop: '-2px' }}
              >
                <Path
                  d='M2.18363 2.90608C2.32996 2.75975 2.49229 2.63908 2.66495 2.54375C3.62725 2.01344 4.86121 2.29543 5.47986 3.2334L4.73122 3.98171C4.51656 3.49206 3.98357 3.2134 3.45326 3.33206C3.2536 3.37673 3.06394 3.47639 2.90894 3.63139L1.47432 5.06668C1.03866 5.50233 1.03866 6.21097 1.47432 6.64663C1.90997 7.08228 2.61862 7.08228 3.05427 6.64663L3.49659 6.20431C3.89891 6.36397 4.33023 6.42763 4.75622 6.39597L3.77991 7.37227C2.94294 8.20924 1.58598 8.20924 0.749007 7.37227C-0.0879666 6.5353 -0.0879666 5.17834 0.749007 4.34136L2.18363 2.90608ZM4.46222 0.62748L3.48592 1.60378C3.91158 1.57178 4.34323 1.63578 4.74555 1.79511L5.18754 1.35312C5.62319 0.917471 6.33183 0.917471 6.76749 1.35312C7.20314 1.78878 7.20314 2.49742 6.76749 2.93308L5.33253 4.36803C4.89555 4.80502 4.1859 4.80135 3.75258 4.36803C3.65158 4.26703 3.56459 4.14137 3.51025 4.01771L2.76161 4.76602C2.84028 4.88535 2.92194 4.98834 3.02694 5.09334C3.29759 5.364 3.64225 5.56566 4.0389 5.66132C4.55289 5.78499 5.10354 5.71665 5.57652 5.45566C5.74919 5.36033 5.91151 5.23967 6.05784 5.09334L7.49246 3.65839C8.32977 2.82141 8.32977 1.46445 7.4928 0.62748C6.65582 -0.20916 5.2992 -0.20916 4.46222 0.62748Z'
                  fill='#2DB1A2'
                />
              </Svg>

              <Text style={[styles.textLink, { marginLeft: '3px' }]}>
                {link}
              </Text>
            </View>
          ) : undefined}
        </View>
      ))}
    </View>
  )
}
