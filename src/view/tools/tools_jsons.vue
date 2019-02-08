<template>
  <div>
    <JsonView :json="JsonData"></JsonView>
  </div>
</template>

<script>
  import JsonView from '_c/formate'

  export default {
    name: 'test',
    data() {
      return {
        JsonData: {
          'code': 200,
          'message': 'succeed !',
          'data': [
            {
              'uuid': '76254DDB-A8EA-46CB-B3D7-6EEBD13BB2E6',
              'version': 1,
              'code': '401',
              'message': '请求无权限',
              'createId': 'dev',
              'createDate': '2018-12-03T00:00:00',
              'modifyId': null,
              'modifyDate': null
            },
            {
              'uuid': 'B0415CC2-F0E0-4B0C-A3BA-50ABAEE98BB9',
              'version': 1,
              'code': '500',
              'message': '服务器错误',
              'createId': 'dev',
              'createDate': '2018-12-03T00:00:00',
              'modifyId': null,
              'modifyDate': null
            },
            {
              'uuid': 'B70692E0-CCB7-4C44-B59B-7B75B16FA9FE',
              'version': 1,
              'code': '200',
              'message': '请求成功',
              'createId': 'dev',
              'createDate': '2018-12-03T15:06:54.717',
              'modifyId': null,
              'modifyDate': null
            },
            {
              'uuid': 'C8A37C2D-0842-423B-AEBA-976C106A3E90',
              'version': 1,
              'code': '202',
              'message': '请求失败',
              'createId': 'dev',
              'createDate': '2018-12-03T00:00:00',
              'modifyId': null,
              'modifyDate': null
            }
          ]
        }
      }
    },
    components: { JsonView }
  }
</script>
