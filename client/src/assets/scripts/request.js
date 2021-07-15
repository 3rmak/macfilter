const request = async (url, method="GET", data=null) => {
  try {
      const headers = {}
      const mode = 'cors'
      let body
      if(data){
          headers['Content-Type'] = 'application/json'
          headers['Access-Control-Allow-Origin'] = '*',
          headers['Access-Control-Allow-Methods'] = 'GET, POST',
          headers['Access-Control-Allow-Headers'] = 'Content-Type',
          headers['Access-Control-Max-Age'] = '3600'
          headers['Authorization'] = 'Bearer' + localStorage.getItem('jwt')
          body = JSON.stringify(data)
          console.log("Body",body)
      }

      const response = await fetch(url, {
          method,
          mode,
          headers,
          body
      })
      return await response.json()
  } catch (e){
      console.warn('Errorinio: ', e.message)
  }
}

module.exports = request