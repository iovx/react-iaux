/**
 * 依据 id 查找字段
 * @param fields
 * @param id
 * @returns {number | * }
 */
export function getFieldById(fields, id) {
  return fields.find(item => item.id === id);
}

/**
 * 将列表转换为指定键的 Map
 * @param list
 * @param key
 */
export function listToMap(list, key) {
  const result = {};
  list.forEach(item => {
    const itemKey = item[key];
    if (itemKey) {
      result[itemKey] = item;
    }
  });
  return result;
}
