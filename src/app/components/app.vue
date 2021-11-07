<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <a href="/" class="navbar-brand">NAUTICS</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/employees">Employees</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container">
      <div class="position-relative">
        <div class="card mt-5">
          <div class="card-body">
            <form>
              <div class="mt-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label"
                  >Email</label
                >
                <div class="col-sm-6">
                  <input
                    type="text"
                    v-model="user.email"
                    class="form-control"
                    id="staticEmail"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div class="mt-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label"
                  >Password</label
                >
                <div class="col-sm-6">
                  <input
                    type="password"
                    v-model="user.password"
                    class="form-control"
                    id="inputPassword"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <button
                    class="btn btn-primary btn-block"
                    @click.prevent="login()"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}
export default {
  data() {
    return {
      user: new User(),
    };
  },
  methods: {
    async login() {
      console.log(this.user);
      let config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type':'application/json'
        },
      };
      let post = {
        body: JSON.stringify(this.user),
      };

      let response = await axios.post("https://nautics-demo.herokuapp.com/login", post, config );
      console.log(response);

      // const r = await fetch('https://nautics-demo.herokuapp.com/login',{
      //   mode:'no-cors',
      //   method:'POST',
      //   body: JSON.stringify(this.user),
      //   headers:{
      //     'Access-Control-Allow-Origin': '*',
      //     'Content-Type':'application/json'
      //   }
      // });

      // const response = await r.json();
      // console.log('respose: ', response);
      // if(response){
      //   console.log(response)
      // }
    },
  },
};
</script>
