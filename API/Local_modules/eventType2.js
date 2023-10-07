var avro = require('avsc');

module.exports = avro.Type.forSchema({
  type: 'record',
  fields: [
    {
      name: 'dateTime',
      type: 'string'
    },
    {
      name: 'actualGenerationOutput',
      type: 'string',
    },
    {
      name: 'productionType',
      type: 'string',
    }
  ]
});