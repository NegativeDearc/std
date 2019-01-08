import _ from 'lodash'

const objectJoin = function (object) {
  let result = _
    .chain(Object.entries(object))
    .map(function (entry) {
      return _.join(entry, '=')
    })
    .join(';')
    .value()
  return result
}

export default objectJoin
