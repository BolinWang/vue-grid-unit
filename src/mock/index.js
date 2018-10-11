import Mock from 'mockjs'
import exampleApi from './example'

// example
const reg_example = /\/example\/list/

Mock.mock(reg_example, 'post', exampleApi.list)

export default Mock
