const request = async (url, method="GET", data=null) => {
  try {
      const baseURL = "http://localhost:3000"
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '3600',
        'Authorization': localStorage.getItem('jwt'),
      }
      const mode = 'cors'
      let body
      if(data){
          body = JSON.stringify(data)
      }
      const response = await fetch(`${baseURL}${url}`, {
          method,
          mode,
          headers,
          body
      })
      return response.json()
  } catch (e){
      alert(e.message)
  }
}

module.exports = request
