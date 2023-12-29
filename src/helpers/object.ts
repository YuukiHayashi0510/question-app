/**
 * オブジェクトのキーを指定し、指定外の値を返す
 * @param {object} data オブジェクト
 * @param {string} ignoreKeys オブジェクトのキー配列
 * @returns {object} オブジェクト
 */
export default function filterByKeys(
  data: object,
  ignoreKeys: string[]
): object {
  const convertedData = {}

  for (const key in data) {
    if (!ignoreKeys.filter((ignoreKey) => ignoreKey === key).length) {
      convertedData[key] = data[key]
    }
  }
  return convertedData
}
