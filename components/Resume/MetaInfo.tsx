import { Text, View } from '@react-pdf/renderer'
import { styles } from './styles'

type MetaInfoItem = {
  Icon: React.FC
  text: string
}

type Props = {
  data: Array<MetaInfoItem>
}

export const MetaInfo: React.FC<Props> = ({ data }) => (
  <View>
    {data.map(({ Icon, text }, index) => (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: index === 0 ? '0' : '3px',
        }}
      >
        <View>
          <Icon />
        </View>

        <View style={{ marginTop: '1px', marginLeft: '5px' }}>
          <Text style={styles.textBody}>{text}</Text>
        </View>
      </View>
    ))}
  </View>
)
