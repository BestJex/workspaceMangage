/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-21 19:52:07
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-04-01 09:14:39
 */
import request from '@/utils/request'

export function getIndexCount () {
  return request({
    url: '/api/getIndexCount',
    method: 'GET'
  })
}