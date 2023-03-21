import { View, Text } from '@tarojs/components'
import './index.less'

const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
  Array.from({ length }).map((_, columnIndex) => ({
    ...props,
    key: `${prefix}${columnIndex}`,
    dataKey: `${prefix}${columnIndex}`,
    title: `C${columnIndex}`,
    width: 150
  }))

const generateData = (
  columns: ReturnType<typeof generateColumns>,
  length = 200,
  prefix = 'row-'
) =>
  Array.from({ length }).map((_, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        rowData[column.dataKey] = ` R${rowIndex}-Col${columnIndex}`
        return rowData
      },
      {
        id: `${prefix}${rowIndex}`,
        parentId: null
      }
    )
  })

const columns = generateColumns(4)
const data = generateData(columns, 1000)

const TableHd = () => (
  <View className='flex table-layout'>
    {columns.map(({ title, key }) => (
      <Text className='flex-1' key={key}>
        {title}
      </Text>
    ))}
  </View>
)

const TableBd = () => (
  <View className='flex-1 overflow-y'>
    {data.map((item) => (
      <View className='flex table-layout' key={item.id}>
        {columns.map(({ dataKey, key }) => (
          <Text className='flex-1' key={key}>
            {item[dataKey]}
          </Text>
        ))}
      </View>
    ))}
  </View>
)

export default () => {
  return (
    <View className='index flex-col'>
      <TableHd />
      <TableBd />
    </View>
  )
}
