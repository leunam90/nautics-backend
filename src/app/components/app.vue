<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <a href="/" class="navbar-brand">NAUTICS</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
      <div class="card mt-5">
          <div class="card-body">
            <div class="mt-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-6">
                <input type="text" class="form-control" id="staticEmail" placeholder="Email" />
                </div>
            </div>
            <div class="mt-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-6">
                <input type="password" class="form-control" id="inputPassword" placeholder="Password"/>
                </div>
            </div>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary">Login</button>
          </div>
      </div>
    </div>
  </div>
</template