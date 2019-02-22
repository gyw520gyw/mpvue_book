import config from './config'

// http get工具函数 获取数据
export function get (url, data) {
  return request(url, 'GET', data)
}

export function post (url, data) {
  return request(url, 'POST', data)
}

function request (url, method, data, header = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      header,
      url: config.host + url,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else if (res.data.code === -1) {
          showModal('服务端异常', res.data.error)
        } else {
          showModal('失败', res.data.data.msg)
          reject(res.data)
        }
      }
    })
  })
}

export function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}

export function showToast (text) {
  wx.showToast({
    title: text,
    icon: 'none'
  })
}

export function showModal (title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}
