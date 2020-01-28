/**
 * 依据 id 查找字段
 * @param fields
 * @param id
 * @returns {number | * }
 */
import { IField } from './interface';
import { MapType } from '../_utils/type';

export function getFieldById(fields: IField[], id: string | number) {
  return fields.find(item => item.id === id);
}

/**
 * 将列表转换为指定键的 Map
 * @param list
 * @param key
 */
export function listToMap(list: any[], key: string | number) {
  const result: MapType<any> = {};
  list.forEach(item => {
    const itemKey = item[key];
    if (itemKey) {
      result[itemKey] = item;
    }
  });
  return result;
}
