import { Text, View } from '@react-pdf/renderer'
import { styles } from './styles'

type TimelineItem = {
  timeframe: string
  company: string
  position: string
  description: string
}

type Props = {
  data: Array<TimelineItem>
}

export const Timeline: React.FC<Props> = ({ data }) => {
  return (
    <View style={{ marginTop: '15px' }}>
      {data.map(({ timeframe, company, position, description }, index) => (
        <View style={[styles.experienceTrack, { paddingLeft: '20px' }]}>
          <View wrap={false} style={{ paddingTop: '15px' }}>
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
        </View>
      ))}
    </View>
  )
}
