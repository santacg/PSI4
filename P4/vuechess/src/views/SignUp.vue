<template>
  <div class="wrapper">
    <form class="sign-up-form">
      <h1>Sign Up</h1>
      <div class="input-box">
        <input type="text" placeholder="Email Address" required>
      </div>
      <div class="input-box">
        <input type="password" placeholder="Password" required>
      </div>
      <div class="input-box">
        <input type="password" placeholder="Confirm Password" required>
      </div>
    </form>
    <button type="submit" class="btn">Sign Up</button>
  </div>
</template>
<script>
</script>
<style scoped>
.wrapper {
  width: 450px;
  background: transparent;
  border: 2px;
  border-color: solid rgba(255, 255, 255, .2);
  backdrop-filter: blur(20px);
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  border-radius: 10px;
  padding: 30px 40px;
}

.wrapper .sign-up-form h1 {
  text-align: center;
  font-weight: bolder;
}

.wrapper .sign-up-form .input-box {
  width: 100%;
  height: 50px;
  margin: 30px 0;
}

.input-box input {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  border: 2px solid rgba(255, 255, 255, .2);
  border-radius: 40px;
  color: white;
  padding: 20px 45px 20px 20px;
}

.wrapper .btn {
  width: 100%;
  height: 45px;
  background: white;
  border: none;
  outline: none;
  border-radius: 40px;
  font-weight: bolder;
}

</style>
