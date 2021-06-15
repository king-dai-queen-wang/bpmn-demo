import request from '@/components/bpm-web-ui/utils/request'

export function getProcessDiagramByApplyId(data) {
  return request({
    url: '/lowCode/processDiagram/getProcessDiagramByApplyId/' + data,
    method: 'post'
  })
}

