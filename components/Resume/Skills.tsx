import { Text, View } from '@react-pdf/renderer'
import { styles } from './styles'

type SkillsItem = {
  title: string
  content: string
  maxWidth: string
}

type Props = {
  data: Array<SkillsItem>
}

export const Skills: React.FC<Props> = ({ data }) => {
  return (
    <>
      {data.map(({ title, content, maxWidth }, index) => (
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
    </>
  )
}
