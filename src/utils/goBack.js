var goBack = function () {
  let obj = JSON.parse(localStorage.getItem('current'));
  if (this.$route.path !== '/'+ obj.router_no_found) {
    this.$router.push(obj.router_no_found);
  } else {
    console.log('当前路由',this.$route.path)
  }
}


var goPage = function () {
  let obj = JSON.parse(localStorage.getItem('current'));
  if (this.$route.path !=='/'+ obj.router_url) {
    this.$router.push(obj.router_url);
  } else {
    console.log('当前路由',this.$route.path)
  }
}


export {
  goBack,
  goPage
};