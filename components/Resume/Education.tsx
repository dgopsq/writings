import { Text, View } from '@react-pdf/renderer'
import { styles } from './styles'

type EducationItem = {
  institute: string
  timeframe: string
  degree: string
}

type Props = {
  data: Array<EducationItem>
}

export const Education: React.FC<Props> = ({ data }) => {
  return (
    <>
      {data.map(({ institute, timeframe, degree }) => (
        <View>
          <Text
            style={[styles.textDate, { marginTop: '15px' }]}
            hyphenationCallback={(word) => [word]}
          >
            {timeframe}
          </Text>

          <Text
            style={[styles.textBody, styles.textStrong, { marginTop: '2px' }]}
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
    </>
  )
}
